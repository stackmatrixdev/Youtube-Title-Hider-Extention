// Content script that hides YouTube video titles only when the extension is enabled.
// It reads the `enabled` flag from chrome.storage.local and listens for changes.

let enabled = false;
let originalDocumentTitle = document.title;

function hideTitles() {
  // Hide the page title element if present
  const titleElement = document.querySelector(
    "h1.style-scope.ytd-watch-metadata"
  );
  if (titleElement) {
    titleElement.style.display = "none";
  }

  // Replace the document title (browser tab)
  try {
    document.title = "YouTube Video - Title Hidden";
  } catch (e) {
    // ignore
  }
}

function showTitles() {
  const titleElement = document.querySelector(
    "h1.style-scope.ytd-watch-metadata"
  );
  if (titleElement) {
    // restore display (empty string lets CSS determine it)
    titleElement.style.display = "";
  }

  // restore original document title if we have it
  try {
    if (originalDocumentTitle) document.title = originalDocumentTitle;
  } catch (e) {
    // ignore
  }
}

// Observe DOM changes so we can hide titles on SPA navigations.
const observer = new MutationObserver(() => {
  if (!enabled) return;
  if (window.location.pathname.startsWith("/watch")) {
    hideTitles();
  }
});

observer.observe(document.body, { childList: true, subtree: true });

// Initialize enabled state from storage. If storage isn't available (e.g., running
// outside extension environment), default to disabled.
function readEnabledFromStorage() {
  if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
    chrome.storage.local.get(["enabled"], (res) => {
      enabled = !!res.enabled;
      // keep a copy of the current document.title so we can restore it
      originalDocumentTitle = originalDocumentTitle || document.title;
      if (enabled && window.location.pathname.startsWith("/watch")) {
        hideTitles();
      } else if (!enabled) {
        showTitles();
      }
    });
  } else {
    // No chrome.storage available: leave disabled
    enabled = false;
  }
}

// Listen for changes to the enabled flag so we can toggle in real time.
if (
  typeof chrome !== "undefined" &&
  chrome.storage &&
  chrome.storage.onChanged
) {
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "local") return;
    if (changes.enabled) {
      enabled = !!changes.enabled.newValue;
      if (enabled) {
        hideTitles();
      } else {
        showTitles();
      }
    }
  });
}

// Run initial read
readEnabledFromStorage();
