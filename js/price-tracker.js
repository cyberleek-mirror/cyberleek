/* =========================================================================
 *  CYBERLEEK — price-tracker.js
 *  Real-time market data for $CYBERLEEK, fetched from the public DexScreener
 *  API. This script is intentionally kept separate from the original bundled
 *  app (assets/index-CE2GuztQ.js) so that bundle stays untouched.
 *
 *  It populates the #card-market element from index.html:
 *    #mkt-price            USD price (big, prominent)
 *    #mkt-price-native     price in SOL (small subtitle)
 *    #mkt-change-24h       24h price change badge (green/red)
 *    #mkt-mcap             market cap (USD)
 *    #mkt-vol-24h          24h volume (USD)
 *    #mkt-liq              pool liquidity (USD)
 *    #mkt-change-{5m,1h,6h,24h-cell}   price change per timeframe
 *    #mkt-buys-24h         24h buy txns count
 *    #mkt-sells-24h        24h sell txns count
 *    #mkt-bs-ratio         buy/sell ratio
 *    #mkt-pair             DEX + pair label (e.g. "Raydium")
 *    #mkt-updated          "updated 12s ago" / "offline"
 *    #mkt-dex-link         link to the DexScreener pair page
 *
 *  Refresh strategy:
 *    - First fetch immediately on DOMContentLoaded.
 *    - Re-fetch every 30s.
 *    - Update the "x seconds ago" label every 1s.
 *    - On error: keep last known values, show "offline" indicator, retry in 30s.
 * ========================================================================= */

(function () {
  "use strict";

  /* ---- Config ------------------------------------------------------- */
  const MINT      = "ApZuxdpzMrbEYTGEzeY9afh5pj9d6qPRJCTgQYiipbKg";
  const ENDPOINT  = `https://api.dexscreener.com/latest/dex/tokens/${MINT}`;
  const REFRESH_MS = 30_000;   // fetch cadence
  const TICK_MS    = 1_000;    // "x seconds ago" update cadence

  /* ---- State -------------------------------------------------------- */
  let lastSuccessfulFetch = null;  // Date object
  let lastData = null;             // last parsed pair data (for retry / debug)
  let fetchTimer = null;
  let tickTimer  = null;

  /* ---- Small DOM helpers ------------------------------------------- */
  const $ = (id) => document.getElementById(id);
  const setText = (id, text) => {
    const el = $(id);
    if (el) el.textContent = text;
  };
  const setHref = (id, href) => {
    const el = $(id);
    if (el) el.href = href;
  };
  const setClass = (id, cls, on) => {
    const el = $(id);
    if (!el) return;
    el.classList.toggle(cls, !!on);
  };

  /* ---- Formatting helpers ------------------------------------------ */

  /**
   * Compact USD formatter:
   *   1_234_567      -> "$1.23M"
   *   18_764_493.85  -> "$18.76M"
   *   1_006_078      -> "$1.01M"
   *   12_345         -> "$12.3K"
   *   123            -> "$123"
   *   0.01006        -> "$0.0101"
   */
  function formatUsdCompact(value) {
    if (value == null || isNaN(value)) return "—";
    const v = Number(value);
    const abs = Math.abs(v);
    if (abs >= 1e9) return `$${(v / 1e9).toFixed(2)}B`;
    if (abs >= 1e6) return `$${(v / 1e6).toFixed(2)}M`;
    if (abs >= 1e3) return `$${(v / 1e3).toFixed(1)}K`;
    if (abs >= 1)   return `$${v.toFixed(2)}`;
    // very small (sub-cent) — show 6 sig figs of precision
    if (abs >= 0.0001) return `$${v.toPrecision(4)}`;
    return `$${v.toExponential(2)}`;
  }

  /**
   * Precise USD formatter for the main price display.
   *   0.01006   -> "0.0100"
   *   0.0001234 -> "0.000123"
   *   1.50      -> "1.500"
   */
  function formatPricePrecise(value) {
    if (value == null || isNaN(value)) return "—";
    const v = Number(value);
    const abs = Math.abs(v);
    if (abs >= 1)   return v.toFixed(4);
    if (abs >= 0.01) return v.toFixed(5);
    if (abs >= 0.0001) return v.toFixed(6);
    // extremely small — use exponential
    return v.toExponential(3);
  }

  /** Format a raw integer count with thousands separators. */
  function formatCount(n) {
    if (n == null || isNaN(n)) return "—";
    return Number(n).toLocaleString();
  }

  /**
   * Format a percent change. Returns the bare number (no sign for negatives
   * because the arrow + colour carries the sign; "+" for positives).
   */
  function formatPct(pct) {
    if (pct == null || isNaN(pct)) return "—";
    const v = Number(pct);
    const sign = v > 0 ? "+" : "";
    return `${sign}${v.toFixed(2)}%`;
  }

  /* ---- Pick the best pair from the DexScreener response ------------
   * DexScreener returns ALL pairs across all DEXes for this token.
   * We pick the one with the highest liquidity — that's the most
   * "official" market and gives us the most accurate price reference.
   * If two pairs have very similar liquidity we prefer the one with
   * the larger 24h volume.
   */
  function pickPrimaryPair(pairs) {
    if (!pairs || !pairs.length) return null;
    const sorted = [...pairs].sort((a, b) => {
      const la = (a.liquidity && a.liquidity.usd) || 0;
      const lb = (b.liquidity && b.liquidity.usd) || 0;
      if (la !== lb) return lb - la;
      const va = (a.volume && a.volume.h24) || 0;
      const vb = (b.volume && b.volume.h24) || 0;
      return vb - va;
    });
    return sorted[0];
  }

  /* ---- Apply a pair's data to the DOM ------------------------------ */
  function renderPair(pair) {
    if (!pair) return;

    const priceUsd   = pair.priceUsd != null ? Number(pair.priceUsd) : null;
    const priceNative= pair.priceNative != null ? Number(pair.priceNative) : null;
    const marketCap  = pair.marketCap != null ? Number(pair.marketCap) : (pair.fdv != null ? Number(pair.fdv) : null);
    const liquidity  = pair.liquidity && pair.liquidity.usd != null ? Number(pair.liquidity.usd) : null;
    const vol        = pair.volume || {};
    const chg        = pair.priceChange || {};
    const txns       = pair.txns || {};
    const txns24     = txns.h24 || { buys: 0, sells: 0 };
    const totalTxns  = (txns24.buys || 0) + (txns24.sells || 0);
    const buys       = txns24.buys || 0;
    const sells      = txns24.sells || 0;
    const bsRatio    = sells > 0 ? (buys / sells).toFixed(2) : (buys > 0 ? "∞" : "—");

    // DEX label for the card header (e.g. "Raydium / SOL")
    const dexLabel = pair.dexId
      ? pair.dexId.charAt(0).toUpperCase() + pair.dexId.slice(1)
      : "—";
    const quoteSym = (pair.quoteToken && pair.quoteToken.symbol) || "";
    setText("mkt-pair", quoteSym ? `${dexLabel} / ${quoteSym}` : dexLabel);

    // Big price
    setText("mkt-price", formatPricePrecise(priceUsd));
    setText("mkt-price-native",
      priceNative != null && quoteSym ? `(${priceNative.toFixed(6)} ${quoteSym})` : "");

    // Primary stats
    setText("mkt-mcap",    formatUsdCompact(marketCap));
    setText("mkt-vol-24h", formatUsdCompact(vol.h24));
    setText("mkt-liq",     formatUsdCompact(liquidity));

    // Price change across timeframes
    renderChangeBadge("mkt-change-24h",     chg.h24);   // big hero badge
    renderChangeCell("mkt-change-5m",       "cell-change-5m",       chg.m5);
    renderChangeCell("mkt-change-1h",       "cell-change-1h",       chg.h1);
    renderChangeCell("mkt-change-6h",       "cell-change-6h",       chg.h6);
    renderChangeCell("mkt-change-24h-cell", "cell-change-24h-cell", chg.h24);

    // 24h transactions
    setText("mkt-buys-24h",  formatCount(buys));
    setText("mkt-sells-24h", formatCount(sells));
    setText("mkt-bs-ratio",  bsRatio);
    setClass("mkt-buys-24h",  "is-positive", buys >= sells);
    setClass("mkt-sells-24h", "is-positive", sells > buys);

    // Link to the actual DexScreener pair page
    if (pair.url) setHref("mkt-dex-link", pair.url);
  }

  /** Update the big 24h change badge with arrow + colour. */
  function renderChangeBadge(id, pct) {
    const el = $(id);
    if (!el) return;
    const pctEl = el.querySelector(".market-change__pct");
    const arrowEl = el.querySelector(".market-change__arrow");
    if (pct == null || isNaN(pct)) {
      if (pctEl) pctEl.textContent = "—";
      if (arrowEl) arrowEl.textContent = "•";
      el.classList.remove("is-up", "is-down");
      return;
    }
    const v = Number(pct);
    if (pctEl) pctEl.textContent = formatPct(v);
    if (arrowEl) arrowEl.textContent = v >= 0 ? "▲" : "▼";
    el.classList.toggle("is-up",   v >= 0);
    el.classList.toggle("is-down", v < 0);
  }

  /** Update a small change cell with arrow + colour. */
  function renderChangeCell(valueId, cellId, pct) {
    const valueEl = $(valueId);
    const cellEl  = $(cellId);
    if (!valueEl || !cellEl) return;
    if (pct == null || isNaN(pct)) {
      valueEl.textContent = "—";
      cellEl.classList.remove("is-up", "is-down");
      return;
    }
    const v = Number(pct);
    const sign = v >= 0 ? "▲" : "▼";
    valueEl.textContent = `${sign} ${formatPct(v)}`;
    cellEl.classList.toggle("is-up",   v >= 0);
    cellEl.classList.toggle("is-down", v < 0);
  }

  /* ---- Update the "updated X seconds ago" label -------------------- */
  function updateLastUpdatedLabel() {
    const el = $("mkt-updated");
    if (!el) return;
    if (!lastSuccessfulFetch) {
      el.textContent = "loading…";
      return;
    }
    const secs = Math.floor((Date.now() - lastSuccessfulFetch.getTime()) / 1000);
    if (secs < 5)       el.textContent = "updated just now";
    else if (secs < 60) el.textContent = `updated ${secs}s ago`;
    else                el.textContent = `updated ${Math.floor(secs / 60)}m ago`;
  }

  /** Show offline state (used when fetch fails). */
  function showOffline(reason) {
    const el = $("mkt-updated");
    if (el) el.textContent = reason || "offline — retrying…";
  }

  /* ---- Fetch + render ---------------------------------------------- */
  async function fetchAndRender() {
    try {
      const res = await fetch(ENDPOINT, {
        method: "GET",
        headers: { "Accept": "application/json" },
        // Don't cache — we always want fresh market data.
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const pair = pickPrimaryPair(json && json.pairs);
      if (!pair) {
        showOffline("no market data yet");
        return;
      }
      lastData = pair;
      lastSuccessfulFetch = new Date();
      renderPair(pair);
      updateLastUpdatedLabel();
    } catch (err) {
      console.warn("[price-tracker] fetch failed:", err.message || err);
      showOffline(lastSuccessfulFetch ? "offline — retrying…" : "fetch failed");
    }
  }

  /* ---- Boot -------------------------------------------------------- */
  function boot() {
    // Only start if the market card actually exists on this page.
    if (!$("card-market")) return;

    // Initial fetch.
    fetchAndRender();

    // Schedule periodic refreshes.
    fetchTimer = setInterval(fetchAndRender, REFRESH_MS);

    // Schedule the "x seconds ago" label ticker.
    tickTimer = setInterval(updateLastUpdatedLabel, TICK_MS);

    // Pause refreshing when the tab is hidden, resume when visible.
    // Saves bandwidth and avoids hitting the API while nobody is looking.
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        if (fetchTimer) { clearInterval(fetchTimer); fetchTimer = null; }
        if (tickTimer)  { clearInterval(tickTimer);  tickTimer  = null; }
      } else if (!fetchTimer) {
        fetchAndRender(); // immediate refresh on resume
        fetchTimer = setInterval(fetchAndRender, REFRESH_MS);
        tickTimer  = setInterval(updateLastUpdatedLabel, TICK_MS);
      }
    });
  }

  // Expose for debugging.
  window.CYBERLEEK_PRICE = { fetchAndRender, boot, get state() { return lastData; } };

  // Run on DOMContentLoaded (or immediately if DOM is already ready).
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
