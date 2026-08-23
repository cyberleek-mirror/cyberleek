# CYBERLEEK — Unofficial Community Mirror

> **Not affiliated with, endorsed by, or officially connected to the original CYBERLEEK project, its authors, the $CYBERLEEK token, or any associated entity.**
>
> This repository is maintained by an independent curious individual as a community resource. See the [Disclaimer](#-disclaimer--non-affiliation) and [Legal](#-legal-framework) sections for full details.

---

## Table of Contents

1. [TL;DR](#-tldr)
2. [Disclaimer — Non-Affiliation](#-disclaimer--non-affiliation)
3. [What This Is](#-what-this-is)
4. [Live Demo](#-live-demo)
5. [Features](#-features)
6. [Architecture Overview](#-architecture-overview)
7. [File Structure](#-file-structure)
8. [The CYBERLEEK Edict](#-the-cyberleek-edict)
9. [Running Locally](#-running-locally)
10. [Hosting Your Own Mirror](#-hosting-your-own-mirror)
11. [Configuration](#-configuration)
12. [The Market Data Tracker](#-the-market-data-tracker)
13. [How On-Chain Data Is Fetched](#-how-on-chain-data-is-fetched)
14. [Browser Support](#-browser-support)
15. [Privacy](#-privacy)
16. [Legal Framework](#-legal-framework)
17. [DMCA Counter-Notice Template](#-dmca-counter-notice-template)
18. [Trademarks](#-trademarks)
19. [License](#-license)
20. [Credits & Acknowledgements](#-credits--acknowledgements)
21. [Contact](#-contact)

---

## 📌 TL;DR

- **What:** A static, client-side mirror of the CYBERLEEK website with an added real-time market-data tracker (price, market cap, volume, liquidity, transactions).
- **Who:** An independent community member. **Not** the original CYBERLEEK developer(s).
- **Where it's hosted:** https://cyberleek-mirror.github.io/cyberleek/
- **Self-host:** Clone, push to GitHub Pages / Netlify / Vercel / any static host. No build step required.
- **Cost:** Free. No backend, no API keys, no databases. Pure static HTML/CSS/JS.
- **License:** MIT for the code in this repository (HTML/CSS/JS authored here). Third-party libraries retain their own licenses. CYBERLEEK name/brand/mascot/Edict text belong to their respective owners — see [Trademarks](#-trademarks).

---

## 🚫 Disclaimer — Non-Affiliation

**This is a fan-made community mirror. The person maintaining this repository is *not* the original "CYBERLEEK" developer, is *not* the entity behind the $CYBERLEEK token, and has *no* affiliation with any individual or organisation associated with the original project.**

The original CYBERLEEK project is an independent community-driven initiative on the Solana blockchain. Its official website (where one exists) is hosted and maintained by its own authors. This repository is an **independent technical re-hosting and enhancement** of the public-facing frontend, created out of personal curiosity and as a community service to make the project's data more accessible.

Key clarifications:

1. **Not the original author.** The maintainer of this repository is a curious individual who rebuilt and augmented the public-facing frontend. The original CYBERLEEK brand, mascot image, "Edict" text, and underlying on-chain program were authored by others. All credit for those belongs to the original creators.

2. **Not affiliated.** There is no business, contractual, employment, partnership, or other formal relationship between this repository's maintainer and the original CYBERLEEK project, its token, its contributors, or any related entity.

3. **Not endorsed.** The original CYBERLEEK authors have not reviewed, approved, or endorsed this mirror. Any perceived endorsement is unintentional.

4. **Not financial advice.** Nothing on this site or in this repository constitutes financial, investment, trading, or legal advice. The $CYBERLEEK token is a cryptocurrency. Cryptocurrencies are extremely volatile and risky. Always do your own research.

5. **Not a solicitation.** This mirror does not ask you to buy, sell, or hold any asset. The "Trade" links lead to third-party DEXes; using them is your choice and at your own risk.

6. **No warranty.** The site is provided "AS IS", without warranty of any kind, express or implied. See the [License](#-license) section for the full warranty disclaimer.

If you are the original author of CYBERLEEK and would like this mirror taken down, see [Contact](#-contact). We will respond promptly to legitimate requests.

---

## 📦 What This Is

This is a **static, client-side mirror** of the public CYBERLEEK website, with the following characteristics:

- **100% static.** No backend server. No server-side rendering. No database. No analytics backend. The entire site is HTML, CSS, and JavaScript files served as-is by any static host.
- **100% client-side.** All data fetching happens in the visitor's browser. The site talks directly to public Solana RPCs and the public DexScreener API.
- **100% read-only.** The site cannot post transactions, sign messages, connect wallets, or modify on-chain state. The "voting" works by the visitor choosing to send $CYBERLEEK tokens to a specific address — that transaction must be initiated from the visitor's own wallet on their own initiative.
- **No wallet connect.** The site never asks for wallet permissions, never requests signing, never sees private keys, never initiates transactions.
- **Original bundle preserved.** The original bundled JavaScript application (the one shipped by the original CYBERLEEK authors) is included byte-for-byte unchanged. This mirror only adds:
  - A redesigned HTML structure (better semantics, ARIA, accessibility)
  - A redesigned CSS theme (cleaner cyberpunk aesthetic, better mobile responsiveness)
  - A new `js/price-tracker.js` file that adds a real-time market-data card (fetched from the public DexScreener API)
- **Open source.** Everything in this repository except the third-party bundled library is MIT-licensed and freely modifiable.

---

## 🌐 Live Demo

The current version of this mirror is deployed at:

> **https://cyberleek-mirror.github.io/cyberleek/**

That URL is hosted via **GitHub Pages** on the `gh-pages` branch (or main branch, whichever the repo is configured to serve from). The deployment is automatic on push — no CI/CD pipeline required.

---

## ✨ Features

### From the original CYBERLEEK frontend (preserved via the original bundle)

- **Hero section** — Mascot image, brand title, tagline ("community voting · decentralized leeks · no wallet connect"), live connection status indicator.
- **About / The CYBERLEEK Edict** — The full text of the three commandments: no digital preorders, no fake single-player DLC, preserve single-player content on server shutdown.
- **Contract address bar** — The $CYBERLEEK token mint address with a one-click copy button.
- **Token info** — Total supply (1B), security flags (LP burned ✓, mint revoked ✓, freeze revoked ✓), taxes (0% buy / 0% sell).
- **Trade links** — DEX links (Raydium, DexScreener, Birdeye, Defined) pulled live from the on-chain site config.
- **Leeks (content)** — Mirror links to leaked GTA 6 videos / maps. Sources include BEDRIVE.RU, TEMP.SH, UPLOAD.EE, TRANSFILES.RU, GOFILE.IO, and **Arweave** (permanent, censorship-resistant storage).
- **Polls** — Live community polls with on-chain vote tallies. Each choice has its own SPL token account; donations of $CYBERLEEK to a choice's address count as votes.
- **RPC rotation** — The site tries a list of public Solana RPCs in random order, rotating on failure. If all public RPCs are rate-limited, the visitor can paste their own RPC URL.
- **Custom-RPC fallback** — A modal dialog with an input field for a personal RPC endpoint.

### Added by this mirror

- **MARKET card** — Real-time price tracker with the following data, fetched from DexScreener's public API and auto-refreshed every 30 seconds:
  - Live USD price (large display) + native SOL price (subtitle)
  - 24h price-change badge with directional arrow (▲ green / ▼ red)
  - Market cap (compact USD format)
  - 24h trading volume (compact USD format)
  - Pool liquidity (compact USD format)
  - 4-cell price-change grid for 5m / 1h / 6h / 24h
  - 24h transaction counts (buys / sells) and buy/sell ratio
  - "Updated X seconds ago" indicator with pulsing green dot
  - Direct link to the DexScreener pair page
  - Smart features: pauses fetching when tab is hidden, picks the highest-liquidity pair automatically, falls back to FDV if marketCap is missing.

- **Improved UI/UX** — Refined cyberpunk aesthetic with better spacing, typography, motion, accessibility (ARIA roles, focus indicators, reduced-motion support), and full mobile responsiveness.

---

## 🏗 Architecture Overview

```
                    ┌────────────────────────────────────────────────┐
                    │  Visitor's browser (everything runs client-side)│
                    └────────────────────────────────────────────────┘
                                          │
              ┌───────────────────────────┼────────────────────────────┐
              │                           │                            │
              ▼                           ▼                            ▼
   ┌─────────────────────┐    ┌──────────────────────┐    ┌──────────────────────┐
   │  Static host         │    │  Public Solana RPCs  │    │  DexScreener API     │
   │  (GitHub Pages, etc.)│    │  (rotated, fallback) │    │  (price/mcap/volume) │
   │                      │    │                      │    │                      │
   │  - index.html        │    │  Reads on-chain:     │    │  Reads off-chain:    │
   │  - css/styles.css    │    │  - site config PDA   │    │  - pair price        │
   │  - js/price-tracker  │    │  - leeks accounts    │    │  - market cap        │
   │  - assets/index-*.js │    │  - poll accounts     │    │  - 24h volume        │
   │    (original bundle) │    │  - token ATA balances│    │  - liquidity        │
   └─────────────────────┘    └──────────────────────┘    └──────────────────────┘
                                          │
                                          ▼
                              ┌──────────────────────┐
                              │  Solana mainnet       │
                              │                       │
                              │  Program ID:          │
                              │  7rAgHPLDc9NryZmNdeEzyDui6D9PHkvTxMjKhNSa7w3a
                              │                       │
                              │  Mint:                │
                              │  ApZuxdpzMrbEYTGEzeY9afh5pj9d6qPRJCTgQYiipbKg
                              │  (decimals: 9)        │
                              └──────────────────────┘
```

The static host only delivers files. All data fetching and rendering happens in the visitor's browser. There is **no server-side component anywhere in this repository**.

---

## 📁 File Structure

```
cyberleek/
├── README.md                     # This file
├── index.html                    # Semantic HTML structure (redesigned)
│                                 # Preserves all IDs / classes / onclicks
│                                 # expected by the original bundle.
├── css/
│   └── styles.css                # Redesigned theme (token-driven CSS,
│                                 # 17 sections, mobile responsive,
│                                 # prefers-reduced-motion support).
├── js/
│   └── price-tracker.js          # NEW: Real-time market-data tracker.
│                                 # Fetches from DexScreener every 30s.
│                                 # Independent of the original bundle.
└── assets/
    ├── index-CE2GuztQ.js         # ORIGINAL BUNDLE — byte-for-byte
    │                             # unchanged from what CYBERLEEK shipped.
    │                             # Contains @solana/web3.js + the
    │                             # CYBERLEEK business logic (RPC
    │                             # rotation, parsers, renderers,
    │                             # copy handlers, etc.).
    ├── image-CgGkSufa.png        # Mascot image (filename preserved
    │                             # so the original bundle's reference
    │                             # works).
    └── favicon-D5_7o8Fv.ico       # Favicon.
```

### Why is the bundle file named `index-CE2GuztQ.js`?

That's the original hash-suffixed filename Vite produced when the original CYBERLEEK author built their project. Keeping the exact filename means the `<script src="...">` tag in the original HTML still resolves correctly, so the original bundle "just works" without modification.

---

## 📜 The CYBERLEEK Edict

The site's About section reproduces the **CYBERLEEK Edict** — a manifesto about anti-consumerism in the video game industry. The text is hosted on-chain (it's part of the site config PDA on Solana) and is also embedded in this repository's `index.html` for offline / failover scenarios.

The three commandments, in brief:

1. **Thou Shalt Not Sell Digital Preorders** — Digital goods cannot sell out; preorder culture exists to extract revenue before reviews.
2. **Thou Shalt Not Sell Fake Single-Player DLC** — No unlock keys for content already on the disc/in the download.
3. **Thou Shalt Preserve Single-Player Content** — When servers shut down, publishers must patch single-player content to be playable offline, indefinitely.

The full text appears verbatim in the About section of the live site. **We did not author this text and claim no copyright over it.** It is reproduced here as it appears in the publicly-accessible on-chain site config of the original CYBERLEEK project.

---

## 🖥 Running Locally

You'll need a way to serve the files over HTTP. Any static server works. The site **cannot be opened via `file://`** because the original bundle is loaded as an ES module (`<script type="module">`), and ES modules require an HTTP origin (CORS rules).

### Option 1: Python (built-in, no install)

```bash
git clone https://github.com/cyberleek-mirror/cyberleek.git
cd cyberleek
python3 -m http.server 8765
# then open http://localhost:8765/ in your browser
```

### Option 2: Node `serve`

```bash
npx serve .
```

### Option 3: VS Code Live Server extension

Right-click `index.html` → "Open with Live Server".

### Option 4: Caddy / nginx / Apache

Point any web server at the repository root. No special config is required — it's just static files.

---

## 🚀 Hosting Your Own Mirror

You are explicitly invited to fork this repository and host your own mirror. The internet is more resilient when there's no single point of failure.

### GitHub Pages (free, easiest)

1. Fork this repository to your own GitHub account.
2. Go to your fork's **Settings → Pages**.
3. Under **Source**, select the branch (`main` or `gh-pages`) and the `/root` folder.
4. Save. Your mirror will be live at `https://<your-username>.github.io/cyberleek/` within a minute or two.

### Netlify (free, custom domain support)

1. Fork this repository.
2. Go to [netlify.com](https://www.netlify.com/), sign in with GitHub.
3. "Add new site" → "Import an existing project" → pick your fork.
4. Build command: *(none)*. Publish directory: `/`.
5. Deploy. You'll get a `*.netlify.app` URL and the option to add a custom domain.

### Vercel (free)

1. Fork this repository.
2. Go to [vercel.com](https://vercel.com/), sign in with GitHub.
3. "Add New" → "Project" → import your fork.
4. Framework preset: **Other**. Build command: *(none)*. Output directory: `/`.
5. Deploy.

### Cloudflare Pages (free)

1. Fork this repository.
2. Go to [pages.cloudflare.com](https://pages.cloudflare.com/).
3. "Create a project" → "Connect to Git" → pick your fork.
4. Build command: *(none)*. Build output directory: `/`.
5. Save and deploy.

### Any static host

The site has zero build step and zero backend requirements. Any host that can serve static files over HTTPS works:
- AWS S3 + CloudFront
- Google Cloud Storage
- Azure Blob Storage
- IPFS / Filecoin (for censorship-resistant hosting)
- Arweave (the original CYBERLEEK itself uses Arweave for some assets)
- A Raspberry Pi in your closet

### After forking

You don't need to change anything in the code. The repo is host-agnostic — it uses relative paths (`./css/styles.css`, `./js/price-tracker.js`, `./assets/index-CE2GuztQ.js`) so it works at any URL path.

If you want to customise colours, spacing, fonts, etc., edit `css/styles.css`. The CSS variables (colours, spacing, motion, layout) are all at the top of the file in the `:root { ... }` block.

---

## ⚙️ Configuration

There is no `.env` file, no `config.json`, no server-side configuration. All configuration lives in two places:

### 1. Hardcoded constants in `js/price-tracker.js`

At the top of the file:

```javascript
const MINT      = "ApZuxdpzMrbEYTGEzeY9afh5pj9d6qPRJCTgQYiipbKg";
const ENDPOINT  = `https://api.dexscreener.com/latest/dex/tokens/${MINT}`;
const REFRESH_MS = 30_000;   // fetch cadence
const TICK_MS    = 1_000;    // "x seconds ago" update cadence
```

To mirror a different token, change `MINT`. To fetch more or less frequently, change `REFRESH_MS` (don't go below ~10 seconds or you'll hit DexScreener's informal rate limit).

### 2. Hardcoded constants in the original bundle

The original `assets/index-CE2GuztQ.js` bundle contains its own hardcoded constants (mint, program ID, RPC list, discriminators). We have **not modified** this file. If you want to change those values you would need to rebuild the original project from its source — which is outside the scope of this mirror.

### 3. The on-chain site config

The original CYBERLEEK authors control the site configuration (which trade links are shown, which sections are visible, in what order, the About text, the FAQ, the contact links) via an on-chain PDA on Solana derived from the seed `"frontend_config"` under program `7rAgHPLDc9NryZmNdeEzyDui6D9PHkvTxMjKhNSa7w3a`. **No one editing this repository can change that data** — only the on-chain authority can. This is one of the strongest guarantees that the mirror cannot be tampered with to misrepresent the original project.

---

## 📈 The Market Data Tracker

The `js/price-tracker.js` file is the only substantial code authored in this repository. It's a single IIFE-wrapped script, ~270 lines, fully commented.

### Data source

[DexScreener](https://dexscreener.com/) provides a free public API for token data across DEXes. No API key, no authentication, no rate-limit headers (within reasonable usage). The endpoint we use:

```
GET https://api.dexscreener.com/latest/dex/tokens/{mint}
```

It returns a JSON object with a `pairs` array containing every DEX pair involving the token. Each pair has:

| Field | Description |
|---|---|
| `dexId` | The DEX name (e.g. `raydium`, `meteora`) |
| `pairAddress` | The on-chain pair address |
| `baseToken` / `quoteToken` | Token metadata |
| `priceNative` | Price in the quote token (e.g. SOL) |
| `priceUsd` | USD price |
| `txns` | Buy/sell counts per timeframe (m5, h1, h6, h24) |
| `volume` | Volume (USD) per timeframe |
| `priceChange` | Price change (%) per timeframe |
| `liquidity.usd` | Pool liquidity in USD |
| `fdv` | Fully-diluted valuation |
| `marketCap` | Market cap (when available) |
| `url` | Direct link to the DexScreener pair page |

### Pair selection

When multiple DEXes list the same token, the API returns multiple pairs. We pick the **highest-liquidity pair** as the canonical price reference, with 24h volume as a tiebreaker. This gives the most stable, representative price.

### Refresh strategy

- First fetch fires on `DOMContentLoaded`.
- Re-fetch every 30 seconds via `setInterval`.
- A 1-second ticker updates the "updated X seconds ago" label.
- When the tab is hidden (Page Visibility API), fetching pauses — saves bandwidth and avoids hammering the API when nobody's looking. On tab focus, an immediate refresh fires and the timer resumes.

### Error handling

- If the fetch fails (network error, 429, 5xx, etc.), we keep the last known values and show "offline — retrying…" in the footer. The next 30-second tick will retry.
- If the API returns no pairs (token delisted, brand new, etc.), we show "no market data yet".
- All numeric fields gracefully degrade to "—" if parsing fails.

### Privacy

The price tracker makes outbound requests only to `api.dexscreener.com`. No cookies, no auth headers, no identifying information is sent. DexScreener sees your IP address and the mint address you're asking about — that's it.

---

## 🔗 How On-Chain Data Is Fetched

The original bundle does the heavy lifting. We're documenting it here for transparency.

### Solana program

The CYBERLEEK program lives at:

```
Program ID:  7rAgHPLDc9NryZmNdeEzyDui6D9PHkvTxMjKhNSa7w3a
Network:     Solana mainnet
```

This program owns three kinds of accounts, distinguished by an 8-byte discriminator at the start of each account's data:

| Account type | Discriminator (base58) | dataSize | Parsed by |
|---|---|---|---|
| Site config (PDA) | derived from `"frontend_config"` seed | — | `parseSiteConfig()` |
| Content ("leek")  | `G6JNBZ2BSey` | 7156 | `parseContentAccount()` |
| Poll              | `5Qpj1hsHT4k` | 2800 | `parsePollAccount()` |

The site fetches all program accounts matching a given discriminator + size via `getProgramAccounts` with a `memcmp` filter. This is standard Solana RPC behaviour.

### RPC strategy

The site maintains a list of public Solana RPCs:

1. `https://api.mainnet-beta.solana.com` (official)
2. `https://solana.api.onfinality.io/public`
3. `https://public.rpc.solanavibestation.com`
4. `https://solana.api.pocket.network`
5. `https://solana-rpc.publicnode.com`
6. `https://solana-mainnet.gateway.tatum.io`

On startup, the list is **shuffled** (so different visitors spread the load across different RPCs). The site pings each one in order; the first to respond within 5 seconds becomes the active RPC.

On failure (network error, 429 rate limit, 403 forbidden, timeout, deserialization error), the site rotates to the next RPC. If all RPCs fail, a modal dialog appears letting the visitor paste their own RPC URL (e.g. a free one from Helius, QuickNode, or a paid private RPC).

### Voting mechanics

For each poll, each choice has an associated SPL token account (an ATA) derived from:
- the program ID
- the poll's 32-byte ID
- the choice index (0, 1, 2, …)
- the SPL token program
- the $CYBERLEEK mint
- the ATA program

To "vote" for a choice, a visitor sends $CYBERLEEK tokens (from their own wallet, on their own initiative — this site cannot initiate transactions) to that choice's ATA. The site reads the balance of each choice's ATA via `getTokenAccountBalance` and displays it as the vote count.

This is a clever design: votes are notarised by the blockchain itself. No off-chain database, no sybil resistance needed (1 token = 1 vote, weighted by holdings), no way to fake votes without spending real money. Donations go to the project (the authority can withdraw).

### Refresh cadence (on-chain data)

- Site config: every 60 seconds
- Content (leeks): every 60 seconds
- Polls: every 15 seconds (for live countdown updates)

---

## 🌍 Browser Support

Tested in:

- ✅ Chrome / Edge / Brave / Arc (Chromium ≥ 100)
- ✅ Firefox ≥ 100
- ✅ Safari ≥ 15.4 (ES2021 — `||=`, `&&=`, `??=` operators)
- ✅ Mobile Safari (iOS 15+)
- ✅ Chrome Android

Required features:
- ES2021 (logical assignment operators, BigInt, `Promise.race`)
- ES modules (for the original bundle)
- `fetch` API (for the price tracker)
- `navigator.clipboard.writeText` (for copy buttons)
- Page Visibility API (for the price tracker's pause-when-hidden feature)

The site degrades gracefully on older browsers — most features will work, but the market card and copy buttons may fail silently. The bundled Solana web3 library sets the floor for browser support.

---

## 🔒 Privacy

### What the site collects

**Nothing.** There is no analytics backend. No cookies. No localStorage. No sessionStorage. No IP logging. No fingerprinting.

### What the site sends

When you visit, the browser makes outbound requests to:

1. **The static host** (GitHub Pages or wherever you host the mirror) — to fetch the HTML, CSS, JS, image, and favicon files.
2. **One or more public Solana RPCs** — to fetch on-chain account data. These RPCs see your IP address and the JSON-RPC request bodies. They do not see your wallet address (because no wallet is connected).
3. **`api.dexscreener.com`** — to fetch the market data for the price tracker. DexScreener sees your IP and the mint address being queried.

That's it. There is no third party. There is no "phone home". There is no analytics SDK.

### What the site does NOT do

- ❌ Does not connect to your wallet
- ❌ Does not request transaction signing
- ❌ Does not see your private keys
- ❌ Does not initiate any transactions
- ❌ Does not set any cookies
- ❌ Does not store any data in localStorage / sessionStorage / IndexedDB
- ❌ Does not load any third-party analytics, fonts, or tracking pixels
- ❌ Does not execute any code from a CDN (all assets are vendored locally)

---

## ⚖️ Legal Framework

This section sets out the legal basis on which this mirror is offered. It is **not legal advice**. If you are the original CYBERLEEK rights-holder and have concerns, please see [Contact](#-contact) — we will work with you in good faith.

### 1. Nature of this repository

This repository is a **static technical mirror** of publicly-accessible frontend code and a **community-built enhancement** (the market-data tracker). It is offered in good faith as a non-commercial, educational, and interoperability-focused project.

### 2. Public blockchain data

All on-chain data displayed by this site (token balances, poll results, content titles, site config) is **public by definition**. Solana, like all major blockchains, is a public ledger. Reading public on-chain data via public RPC endpoints is the intended use of the network. No permission, licence, or affiliation is required to read public blockchain data.

The $CYBERLEEK token program (`7rAgHPLDc9NryZmNdeEzyDui6D9PHkvTxMjKhNSa7w3a`) and the $CYBERLEEK mint (`ApZuxdpzMrbEYTGEzeY9afh5pj9d6qPRJCTgQYiipbKg`) are deployed on Solana mainnet and readable by anyone.

### 3. Fair use — commentary, criticism, news reporting

The CYBERLEEK Edict text is reproduced verbatim from the publicly-accessible on-chain site config. This reproduction is for the purposes of **commentary, criticism, news reporting, and teaching** about the CYBERLEEK project — purposes explicitly recognised as fair use under 17 U.S.C. § 107 and equivalent provisions in other jurisdictions.

The four fair-use factors:

1. **Purpose and character of the use** — Non-commercial, educational, transformative (the original was a live site; this is a documented mirror with added market-data functionality).
2. **Nature of the copyrighted work** — The Edict is a published manifesto, already publicly accessible on-chain. It is factual / philosophical in nature, not fictional.
3. **Amount and substantiality used** — The text is reproduced in full because it is the central subject of the commentary (the "About" page exists to discuss the Edict). Partial reproduction would defeat the purpose.
4. **Effect upon the potential market** — There is no market for the Edict text itself. The original CYBERLEEK project does not sell access to its About page. This mirror does not compete with any paid product.

### 4. First Amendment (United States)

To the extent this repository is hosted in the United States (e.g. on GitHub's servers), the maintainer's act of publishing it is expression protected by the First Amendment. The README, the UI design choices, the market-data tracker, and the act of mirroring public information are all expressive activity.

### 5. Trademark fair use (nominative fair use)

The name "CYBERLEEK" and the mascot image are likely protected as trademarks (or at least trade dress) of the original project. This repository uses the name "CYBERLEEK" **nominatively** — i.e. to refer to the project itself — which is generally protected as nominative fair use.

The three factors for nominative fair use (from *New Kids on the Block v. News America Publishing*, 971 F.2d 302 (9th Cir. 1992)):

1. **The product or service in question must be one not readily identifiable without use of the trademark.** — There is no other way to refer to the CYBERLEEK project than by the name "CYBERLEEK".
2. **Only so much of the mark or marks may be used as is reasonably necessary to identify the product or service.** — We use the name "CYBERLEEK" only as a name. We do not use the logo as our own brand. The mascot image is included because it is part of the original site's design.
3. **The user must do nothing that would, in conjunction with the mark, suggest sponsorship or endorsement by the trademark holder.** — This README, the disclaimer at the top of every page, and the repo name ("cyberleek-mirror") all clearly disclaim any affiliation.

### 6. Right to access public information

Reading and re-displaying publicly-accessible information (whether from a public blockchain, a public API like DexScreener, or a public website) is generally protected speech. *See, e.g.*, *hiQ Labs, Inc. v. LinkedIn Corp.*, 31 F.4th 1180 (9th Cir. 2022) (scraping public data is not a CFAA violation).

### 7. No copyright in factual data

The market-data values (prices, volumes, market caps, transaction counts) displayed by the price tracker are **factual data**, which is not copyrightable. *See Feist Publications, Inc. v. Rural Telephone Service Co.*, 499 U.S. 340 (1991). DexScreener, as the data aggregator, has no copyright in the raw numbers. The presentation of those numbers in this site is original to this repository's CSS.

### 8. Open source licence

All code authored in this repository (i.e. `index.html`, `css/styles.css`, `js/price-tracker.js`, and this `README.md`) is released under the **MIT License** — see [License](#-license). The MIT License explicitly permits commercial use, modification, distribution, and private use.

### 9. DMCA Safe Harbor

This repository is hosted on GitHub, which operates under the safe harbour provisions of § 512 of the Digital Millennium Copyright Act (DMCA), 17 U.S.C. § 512. GitHub's DMCA takedown process is documented at https://docs.github.com/en/site-policy/content-removal/dmca-takedown-policy. The maintainer will respond to legitimate takedown notices as described in that policy.

### 10. Jurisdiction

The maintainer of this repository is a private individual acting in a personal capacity. To the extent any dispute arises, the maintainer will engage in good faith to resolve it without prejudice.

---

## 📨 DMCA Counter-Notice Template

If a takedown notice is filed against this repository and the maintainer believes in good faith that the takedown was filed in error (e.g. because the material is not infringing due to fair use, public data, or licence), GitHub's process allows the maintainer to file a counter-notice. The standard counter-notice template is reproduced below for transparency.

**This is a template only, not pre-filed legal advice.** It is included so that anyone who forks this repository knows what a counter-notice looks like and what they would be agreeing to if they ever needed to file one.

```text
[Your legal name]
[Your physical address]
[Your telephone number]
[Your email address]

I, [your legal name], hereby state under penalty of perjury
that I have a good faith belief that the material was removed
or disabled as a result of a mistake or misidentification of
the material to be removed or disabled.

I consent to the jurisdiction of the Federal District Court
for the judicial district in which my address is located
(or, if my address is outside of the United States, the
judicial district in which GitHub is located), and I will
accept service of process from the person who provided the
DMCA notification or an agent of such person.

The material that was removed or disabled is the repository
located at:

  https://github.com/cyberleek-mirror/cyberleek

and the specific content identified in the takedown notice.

I state, under penalty of perjury, that I am the owner of
the material in question, or am authorised to act on behalf
of the owner, on the following grounds:

  [Brief factual explanation — e.g. "The material consists
  of publicly-readable on-chain data from the Solana
  blockchain, which is not subject to copyright. The
  reproduced text is offered for commentary/criticism
  purposes under 17 U.S.C. § 107. The code is licensed
  under the MIT licence."]

I swear, under penalty of perjury, that I have a good-faith
belief that the material was removed or disabled as a result
of a mistake or misidentification of the material.

Signed:

  /s/ [Your legal name]
  [Date]
```

**Filing a counter-notice has legal consequences.** If you file a counter-notice, the original complainant has 10–14 business days to file a lawsuit against you. If they do not, GitHub restores the material. **Do not file a counter-notice without understanding the implications.**

This template is provided for transparency only. It is not legal advice. If you are considering filing a counter-notice, consult a lawyer in your jurisdiction.

---

## ™ Trademarks

**CYBERLEEK** is a project name and likely functions as a trademark (whether registered or common-law) of its original creators. All rights in the name, the mascot image, and the "Edict" text belong to their respective owners.

This repository uses the name **CYBERLEEK** only nominatively — i.e. to refer to the project itself, not as a brand for our own product. We do not claim any trademark rights in the name. We do not sell any product under the CYBERLEEK name. We do not represent ourselves as the official CYBERLEEK.

The mascot image (`assets/image-CgGkSufa.png`) is included because it is referenced by the original bundled JavaScript (which we have not modified). We do not claim copyright in the image. If you are the rights-holder and wish the image removed, see [Contact](#-contact).

All other product names, logos, brands, and other trademarks mentioned in this repository or displayed on the live site are the property of their respective owners. Use of these names does not imply affiliation, endorsement, or sponsorship.

Specifically, the following are NOT our trademarks:
- **Solana** — Solana Labs / Solana Foundation
- **Raydium** — Raydium
- **DexScreener** — DexScreener
- **Birdeye** — Birdeye
- **Defined** — Defined.fi
- **Metaplex** — Metaplex Foundation
- **Arweave** — Arweave
- **GTA 6** — Rockstar Games / Take-Two Interactive
- **GitHub Pages** — GitHub, Inc.

The "Edict" text is included verbatim because it appears in the publicly-accessible on-chain site config of the original CYBERLEEK project. The maintainer claims no copyright in the text and attributes it to the original authors.

---

## 📄 License

### Code authored in this repository

The following files are © 2026 the maintainer of this repository, and are licensed under the **MIT License**:

- `index.html`
- `css/styles.css`
- `js/price-tracker.js`
- `README.md`

### MIT License (verbatim)

```
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

### Third-party assets (NOT covered by MIT)

The following files are **not** covered by the MIT license above. They are included in this repository for compatibility with the original bundled JavaScript, which references them by filename. We claim no copyright over them. They remain the property of their respective owners:

- `assets/index-CE2GuztQ.js` — The original bundled JavaScript application shipped by the CYBERLEEK authors. Includes `@solana/web3.js` (ISC License, © 2021 Solana Labs) and the CYBERLEEK business logic. We have not modified it. We redistribute it verbatim as a mirror.
- `assets/image-CgGkSufa.png` — The mascot image used by the original site.
- `assets/favicon-D5_7o8Fv.ico` — The favicon used by the original site.

If you are the rights-holder of any of these assets and wish them removed, see [Contact](#-contact). We will respond promptly.

### The CYBERLEEK Edict text

The full text of the Edict is reproduced in `index.html` and is the work of the original CYBERLEEK authors. It is included for commentary/criticism purposes under fair use. The maintainer of this repository claims no copyright in the Edict text.

### DexScreener data

The market data displayed by `js/price-tracker.js` is sourced from the public DexScreener API at `api.dexscreener.com`. DexScreener's Terms of Service and any applicable data licences govern use of that data. We display it; we do not own it.

---

## 🙏 Credits & Acknowledgements

- **The original CYBERLEEK authors** — For building the project, the Edict, the on-chain program, and the original frontend. This mirror would not exist without their work. All credit for the project concept, the mascot, the Edict text, the on-chain program design, and the original UI belongs to them.
- **Solana Labs** — For `@solana/web3.js`, included in the original bundle under the ISC License.
- **DexScreener** — For the free public API that powers the market-data tracker.
- **GitHub Pages** — For hosting this mirror at zero cost.
- **The broader Solana ecosystem** — For the public RPC providers (Helius, QuickNode, PublicNode, OnFinality, Tatum, Pocket Network, Solana Vibestation) that the original bundle's RPC rotation depends on.

This project is a community contribution. It is not a product. It is not a service. It is one curious individual's technical mirror of a project they find interesting, offered freely to anyone who wants to use it or learn from it.

---

## 📧 Contact

### For repository / hosting matters

Open an issue in this GitHub repository: https://github.com/cyberleek-mirror/cyberleek/issues

### For rights-holder matters (trademark, copyright, takedown requests)

If you are the original CYBERLEEK rights-holder (or authorised representative) and have any concern about this mirror, please open an issue titled **"Rights-holder matter"** (or email the address in the maintainer's GitHub profile). We will respond in good faith within a reasonable timeframe.

We will honour legitimate takedown requests. We will engage with legitimate concerns about:
- The mascot image (`assets/image-CgGkSufa.png`)
- Any copyrighted text you believe is reproduced without justification
- Any specific element you believe crosses the line from fair use into infringement

We will **not** voluntarily take down:
- The MIT-licensed code (it has its own licence terms)
- The market-data tracker (factual data is not copyrightable)
- The CYBERLEEK Edict text (it is on-chain public data and reproduced for commentary)
- The repository as a whole on the basis of trademark alone (nominative fair use applies)

But we are open to conversation. **The point of this mirror is community service, not adversarial posturing.**

---

## ⚠️ Final Notice

**This is not the original CYBERLEEK's repository.**

**This is not the original CYBERLEEK's developer.**

**This is a curious individual's mirror of a public website, with an added market-data tracker, offered freely to the community.**

If you arrived here expecting to find the original CYBERLEEK team, you are in the wrong place. The original project's official presence (if one exists) is separate from this repository.

If you are the original CYBERLEEK team and would like this mirror to be more clearly distinguished, renamed, restyled, or otherwise modified to reduce confusion, please reach out. We will work with you.

If you are a visitor and something on this site looks broken, slow, or wrong, that is this mirror's fault, not the original project's. Open an issue.

If you are a rights-holder considering a takedown notice, please read the [Legal Framework](#-legal-framework) section first. There may be a less adversarial path that achieves your goal without requiring a formal takedown.

---

*Repository: [cyberleek-mirror/cyberleek](https://github.com/cyberleek-mirror/cyberleek)*
*Live: [https://cyberleek-mirror.github.io/cyberleek/](https://cyberleek-mirror.github.io/cyberleek/)*
*License: MIT (code authored here) — see [License](#-license) for full text.*
*No affiliation with the original CYBERLEEK project.*
