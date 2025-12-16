# YouTube Title Hider

A small browser extension that hides the video title on YouTube watch pages and replaces the browser tab title with a generic string when enabled. Click the extension icon to toggle the feature on/off.

## Features

- Hides the YouTube video title element on watch pages.
- Replaces the browser tab title with "YouTube Video - Title Hidden" when enabled.
- Toggle the behavior by clicking the extension icon; state is persisted using browser storage.

## Files in this repository

- `contentScript.js` — Runs on YouTube pages and hides/restores titles depending on the extension state.
- `background.js` — Service worker that toggles the enabled state when the extension icon is clicked and updates the badge/title.
- `manifest.json` — Manifest V3 describing permissions, content scripts and icons.
- `icons/` — Folder with extension icon files (16/48/128 px).

## Quick contract

- Input: User clicks the extension icon (or the `enabled` flag is toggled programmatically).
- Output: Titles are hidden when `enabled === true`; restored when `enabled === false`.
- Error modes: If the extension APIs are unavailable, the content script defaults to disabled and does not hide titles.

## How to install (download ZIP and load locally)

Follow these steps to install the extension locally from a ZIP (recommended for testing locally):

1. Download the repository as a ZIP (for example, `YT-detailshider.zip`) and extract it to a folder on your computer. Alternatively, if you already have the folder on your machine, skip the ZIP step.

2. Open your browser's extensions page:
   - Chrome / Edge: `chrome://extensions` or `edge://extensions`
   - Firefox (developer install): `about:debugging#/runtime/this-firefox` (Firefox uses a different mechanism, see notes below)

3. Enable Developer mode (usually a toggle in the top-right of the page).

4. Click "Load unpacked" (Chrome/Edge) and select the extracted folder (the folder that contains `manifest.json`).

   - If you downloaded a ZIP, extract it first and then select the extracted folder. Do not select the ZIP file directly; browsers expect the unpacked directory.

5. The extension should appear in the list. You can optionally pin the extension to the toolbar.

6. Load a YouTube watch page (URL like `https://www.youtube.com/watch?v=...`) and click the extension icon to toggle title hiding. When enabled you should see the extension badge read `ON` and the video title and tab title should be hidden/changed.

Notes for Firefox users:
- Firefox uses `browser` APIs and different packaging; the provided code uses `chrome.*` calls. To run in Firefox you can either install a small compatibility polyfill or edit the code to use `browser` APIs. Loading a temporary add-on is done from `about:debugging` -> "This Firefox" -> "Load Temporary Add-on" and selecting the `manifest.json` file.

## How to pack the extension for distribution (optional)

If you want to produce a ZIP for sharing (not for the Chrome Web Store), simply zip the folder contents and distribute the ZIP. Recipients should extract and load via "Load unpacked" as described above.

Example command to create a ZIP (run inside the project directory):

```bash
zip -r ../YT-detailshider.zip .
```

If you want to publish to the Chrome Web Store, follow Google's publishing steps (you will need to create a developer account, pay registration fee, and upload a ZIP package formatted per the store requirements).

## Troubleshooting

- Icon not showing everywhere: The manifest includes a top-level `icons` field and action icons. If you still see a placeholder image:
  - Make sure `icons/icon16.png`, `icons/icon48.png`, and `icons/icon128.png` exist in the `icons/` folder.
  - If they are present but look blurry, replace them with properly sized PNGs (16×16, 48×48, 128×128).

- Titles aren’t hiding:
  - Double-check the extension is enabled and that the badge reads `ON` (click the icon to toggle).
  - The content script matches YouTube pages; open a watch page (`/watch?` path) and confirm the page URL starts with `/watch`.
  - YouTube's DOM sometimes changes. If the selector fails, open DevTools (right-click the title and Inspect) to find a current selector and update `contentScript.js` accordingly.

- Document title not restored correctly:
  - The content script stores the initial `document.title` on load and restores that value when disabling. If the title changes dynamically after load, the restored value might be the original one. Reload the page after toggling or consider improving the logic to track dynamic titles.

## Customization ideas

- Add a popup UI (`popup.html`) so users can toggle the feature and change settings (custom replacement title, enable on specific domains, custom selectors).
- Add an options page to let users specify the exact selector for the YouTube title or the replacement tab title.

## Development notes

- Manifest V3 is used with a background service worker `background.js`. The extension uses `chrome.storage.local` to persist the `enabled` flag.
- Content script uses a MutationObserver to handle YouTube's SPA navigation.

## License

Place your license here (MIT, Apache-2.0, etc.) or remove this section if not applicable.

---

If you want, I can also:

- Generate nicer placeholder icons (16/48/128) automatically, or
- Add a small popup UI with a toggle and label (gives clearer UX than clicking the icon alone).

Tell me which of the above you'd like next.
