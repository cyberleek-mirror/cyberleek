# CYBERLEEK — Unofficial Community Mirror (patched fork)

> Independent, unofficial fork of [cyberleek-mirror/cyberleek](https://github.com/cyberleek-mirror/cyberleek). Not affiliated with or endorsed by the original project, its token, Rockstar Games or any other rights holder. No financial advice. Use at your own risk.

**Live website:** https://tonij7853-dotcom.github.io/cyberleek/

**Current status:** The static website and market tracker can load even when Solana RPC requests fail. Public RPC access is not guaranteed. The patched website deployed successfully, but live announcements, polls and on-chain content have not been confirmed working.

## If the website is not working

### 1. Website loads but says "partial or offline — retrying"

The Solana RPC servers may be rate-limited, reject requests, or be unavailable. The site requires Solana **mainnet** endpoints supporting browser CORS requests and the methods `getAccountInfo`, `getProgramAccounts` (including filtered queries) and `getTokenAccountBalance`. A successful slot/health check alone is not sufficient.

Try a personal RPC:

1. Visit the official [Helius dashboard](https://dashboard.helius.dev/) or another reputable Solana RPC provider.
2. Create an account and obtain a mainnet HTTPS RPC endpoint. Check current plan limits and whether the required methods and browser requests are supported; free-tier availability and quotas may change.
3. Open the live site and click **SLOW? USE CUSTOM RPC** near the header.
4. Paste your personal RPC URL into the input and click **Connect**. A typical endpoint format is:

   ```text
   https://mainnet.helius-rpc.com/?api-key=YOUR_API_KEY
   ```

5. Check whether the status and the individual sections update. If the connection fails, inspect the console and confirm the endpoint allows filtered program-account requests.

You do not need to connect a wallet, buy cryptocurrency or make a payment to read public blockchain data.

**API key warning:** Never commit a real API key to this public repository, post it in issues or share it in screenshots. The custom RPC URL is used by JavaScript in the current tab, not saved by the application. It is visible to your browser/devtools and RPC provider. Use a limited, revocable key where possible. To share the site with a private RPC key for all visitors, use a properly secured server-side, read-only proxy with method allowlisting, rate limits and restricted credentials. GitHub Pages alone cannot hide secrets.

### 2. Common error messages

| Error | Meaning | What to do |
| --- | --- | --- |
| 403 Forbidden | Provider rejects access or the method | Try an authorized endpoint that supports the method; check account limits. |
| 429 Too Many Requests | Rate limit reached | Wait before retrying, reduce request volume or use a dedicated endpoint. |
| CORS policy | Provider does not allow the browser origin or request headers | Use an RPC that explicitly supports browser CORS. Do not disable browser security. |
| ERR_CONNECTION_REFUSED / Failed to fetch | Server unreachable or network request failed | Check the endpoint URL, provider status and your network. |
| RPC timeout | Request did not complete in time | Use a reliable RPC; program-account queries may be slow. |
| Market works, but other sections do not | DexScreener works independently of Solana RPC | Follow the custom RPC steps above. |
| 404 / GitHub Pages not found | Deployment may be missing or incomplete | Check repository Settings → Pages and Actions. |

### 3. Browser troubleshooting

Open the website, press F12 → Console and reload with Ctrl+Shift+R. In the Network tab, look for failed RPC POST requests. Report the error status, method and browser version, but redact API keys, sensitive URLs, recovery phrases and personal data. Never paste unknown scripts into the console.

### 4. GitHub Pages deployment

In repository Settings → Pages, choose **Deploy from a branch**, **main**, **/ (root)** and Save. Check [Actions](https://github.com/tonij7853-dotcom/cyberleek/actions) for deployment results. Keep HTTPS enabled. No build command is required.

## Security and privacy notes

A limited static source review on 2026-11-25 inspected the current repository tree, HTML, CSS, bundled JS, market tracker, Arweave manifest and sitemap. It is not a penetration test, full dependency audit, verification of third-party binaries or guarantee of safety.

- Two original Open Web Analytics scripts were removed from the HTML. No hardcoded private RPC API keys, automatic wallet connection or automatic transfer calls were identified in the reviewed application logic. The bundled Solana library itself includes transaction and key-management APIs.
- **Do not use the inherited Monero payment / Session contact feature.** It requests payment to an externally controlled address and generates a recovery phrase from on-chain configuration and a limited random numeric identifier. Its security and promised service have not been verified. The upstream claim of guaranteed authenticity is not established. Do not reuse generated recovery phrases, share existing phrases or send money. Removing this feature is recommended; it remains present in the code at the time of this documentation update.
- The on-chain authority can change displayed configuration, trade destinations, content and payment addresses. A custom RPC is also a trust dependency. External URLs and files are not audited; they may contain scams, malware or unauthorized material. The content-link HTML interpolation deserves further review and should be replaced with safe DOM element construction. Do not download or execute untrusted files.
- Token supply, mint/freeze authority, liquidity and other financial claims displayed by the inherited frontend are not independently verified by this fork. Do not treat them as security guarantees.
- RPC providers and DexScreener receive ordinary network request metadata, including IP addresses. GitHub Pages has its own hosting/privacy practices. External links leave this site.
- The inherited Arweave manifest references upstream content IDs rather than the newly patched files. It is not used by the GitHub Pages deployment; do not assume an Arweave copy includes these fixes. The inherited sitemap also points to the upstream domain.
- The project has no backend and no dependency lockfile/source build for the bundled JavaScript. The original bundled library has not been independently rebuilt or audited.

## What changed in this fork

- Removed failing OnFinality, Tatum and Pocket RPC defaults from the active list.
- Fixed endpoint rotation and made it retry the actual RPC operation, not merely a health check.
- Added bounded request waits, serialized RPC operations and non-overlapping refresh cycles.
- Improved custom HTTPS RPC validation and connection status reporting.
- Removed duplicate analytics scripts.
- Retained the existing site styling and independent DexScreener market tracker.

Public endpoints still may return 403/429 errors. These changes do not guarantee connectivity or change on-chain data.

## Run locally

```bash
git clone https://github.com/tonij7853-dotcom/cyberleek.git
cd cyberleek
python -m http.server 8765
```

Open http://localhost:8765/ in your browser. Do not open the HTML directly with `file://`; the ES module requires an appropriate origin. Local hosting does not solve remote RPC restrictions.

## Project structure

| File | Purpose |
| --- | --- |
| `index.html` | Page layout and local script references |
| `css/styles.css` | Styles |
| `js/price-tracker.js` | DexScreener market tracker |
| `assets/index-B5VI5ckO.js` | Inherited bundled JavaScript with RPC patches |
| `assets/*.png`, `assets/*.ico` | Inherited image assets |
| `manifest.json` | Inherited Arweave path manifest (not required by Pages) |
| `sitemap.xml` | Inherited upstream sitemap |

## Attribution and licensing

Original community mirror: [cyberleek-mirror/cyberleek](https://github.com/cyberleek-mirror/cyberleek). The upstream README, including original licensing and disclaimers, is available in the [pre-documentation revision of this fork](https://github.com/tonij7853-dotcom/cyberleek/blob/36e366be56f232bc517cb6376f4c4313ca8e07f8/README.md).

The upstream maintainer states that the HTML, CSS, market tracker and upstream README they authored are © 2026 the upstream maintainer and MIT-licensed. The original bundled application, mascot, favicon and original project text are third-party materials, not covered by that MIT grant. The patched bundle is not claimed to be original work or to be relicensed here. The upstream README identifies the included Solana web3 library as ISC-licensed (© 2021 Solana Labs). Third-party rights and licenses remain with their respective owners. Public availability does not imply permission to redistribute copyrighted material.

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

## Reporting issues

Use the [fork's issues page](https://github.com/tonij7853-dotcom/cyberleek/issues) for technical problems and legitimate security or rights-holder concerns. Do not post credentials, wallet secrets or private recovery phrases.
