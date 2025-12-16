// Background service worker: toggles the 'enabled' state when the extension icon is clicked.
// Stores state in chrome.storage.local and updates the action badge/title.

// Helper to update badge and tooltip
function updateAction(newState) {
  const text = newState ? "ON" : "";
  try {
    chrome.action.setBadgeText({ text });
    chrome.action.setTitle({
      title: `YouTube Title Hider: ${newState ? "ON" : "OFF"}`,
    });
  } catch (e) {
    // ignore in environments where action APIs are unavailable
  }
}

// Toggle when icon is clicked
chrome.action.onClicked.addListener(() => {
  chrome.storage.local.get({ enabled: false }, (res) => {
    const newState = !res.enabled;
    chrome.storage.local.set({ enabled: newState }, () => {
      updateAction(newState);
    });
  });
});

// Initialize default on install
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get({ enabled: false }, (res) => {
    if (typeof res.enabled === "undefined") {
      chrome.storage.local.set({ enabled: false }, () => updateAction(false));
    } else {
      updateAction(!!res.enabled);
    }
  });
});

// Set badge/title at service worker startup (some browsers reinitialize the worker)
chrome.storage.local.get({ enabled: false }, (res) => {
  updateAction(!!res.enabled);
});
