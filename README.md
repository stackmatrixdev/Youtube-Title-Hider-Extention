# 🤫 YouTube Title Hider

**Keep your focus, hide the spoilers.**

YouTube Title Hider is a lightweight browser extension designed to enhance your viewing experience by hiding video titles on YouTube. Whether you're trying to avoid spoilers or just want a cleaner, more focused interface, this extension has you covered.

---

## ✨ Features

- 🕵️ **Hide Video Titles**: Instantly removes the video title element on any YouTube watch page.
- 🏷️ **Tab Masking**: Replaces the browser tab title with "YouTube Video - Title Hidden" so no one can see what you're watching from your tab bar.
- 🔄 **Easy Toggle**: Turn the feature ON or OFF with a single click on the extension icon.
- 💾 **Persistent Settings**: Remembers your preference (ON/OFF) even after you restart your browser.
- ⚡ **Lightweight & Fast**: Minimal impact on browser performance.

---

## 🛠️ How it Works

1. **Background Service Worker**: Handles the extension icon click and manages the global "enabled" state. It also updates the extension badge (showing **ON** when active).
2. **Content Script**: Injects into YouTube pages. It listens for changes in the extension state and uses a `MutationObserver` to ensure titles stay hidden even when you navigate between videos on YouTube's single-page app.

---

## 🚀 Installation Guide

Want to try it out? Follow these simple steps:

### For Chrome, Edge, and Brave:

1. **Download the Extension**: [Download the ZIP](./YouTubeTitleHider.zip) (or clone this repository).
2. **Extract the Files**: If you downloaded a ZIP, unzip it to a folder on your computer.
3. **Open Extensions Page**:
   - In Chrome: Go to `chrome://extensions/`
   - In Edge: Go to `edge://extensions/`
4. **Enable Developer Mode**: Toggle the **Developer mode** switch in the top-right corner.
5. **Load the Extension**:
   - Click the **Load unpacked** button.
   - Select the folder containing the extension files (the one with `manifest.json`).
6. **Done!** The 🤫 icon should now appear in your extension list.

---

## 🎮 How to Use

1. **Pin the Extension**: For easy access, pin the YouTube Title Hider icon to your browser toolbar.
2. **Navigate to YouTube**: Open any video on [YouTube](https://www.youtube.com).
3. **Toggle On/Off**: Click the extension icon.
   - When the badge says **ON**, the title will be hidden.
   - Click again to reveal the title.
4. **Watch Privacy**: Notice how your browser tab also changes to "YouTube Video - Title Hidden" when enabled!

---

## 📦 Extension Pack

To share this extension with others or upload it to your own extension pack:
1. Zip the entire directory.
2. Rename it to `YouTubeTitleHider.zip`.
3. Distribute or upload!

---

## 🔧 Development

If you'd like to contribute or modify the extension:

- `manifest.json`: Configuration and permissions.
- `contentScript.js`: Logic for hiding elements on the page.
- `background.js`: Handles extension-level events like icon clicks.
- `icons/`: Contains the visual identity of the extension.

---

### 📝 License
This project is open-source and available under the [MIT License](LICENSE).

---

*Happy focused watching!* 🍿
