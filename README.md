# Sci-Hub Teleporter

A browser extension that adds a convenient Sci-Hub button to academic article pages, allowing you to quickly access research papers without paywalls.

## ✨ Features

- **Automatic DOI Detection:** Automatically finds DOIs on academic article pages
- **One-Click Access:** Adds a prominent "Access via Sci-Hub" button directly on the page
- **Direct Sci-Hub Access:** Click the extension icon anytime to go straight to Sci-Hub
- **Wide Compatibility:** Works on popular academic publishers including ScienceDirect, Springer, Wiley, Nature, IEEE, and more
- **Lightweight:** Small footprint with minimal permissions required

## 📋 Installation

### Chrome / Edge / Brave
1. Download or clone this repository to your computer
2. Open your browser and navigate to `chrome://extensions/` (or `edge://extensions/` for Edge)
3. Enable "Developer mode" using the toggle in the top-right corner
4. Click "Load unpacked" and select the folder containing the extension files
5. The extension should now appear in your browser toolbar

### Firefox
1. Download or clone this repository to your computer
2. Open Firefox and go to `about:debugging`
3. Click "This Firefox" in the sidebar
4. Click "Load Temporary Add-on"
5. Navigate to the extension folder and select the manifest.json file

## 🔧 How It Works

### Method 1: Automatic Detection
1. Visit any supported academic article page with a DOI
2. The extension automatically detects the DOI and adds an "Access via Sci-Hub" button
3. Click the button to open the article in Sci-Hub

### Method 2: Manual Access
1. Click the extension icon in your browser toolbar
2. A new tab will open, taking you directly to Sci-Hub
3. Paste any DOI or URL yourself

## 🔬 Supported Academic Publishers

The extension automatically works on websites including:
- ScienceDirect
- Springer
- Wiley
- Nature
- Taylor & Francis
- ACS Publications
- IEEE Xplore
- JSTOR
- PubMed
- Oxford Academic

## 🛠️ Customization

### Updating the Sci-Hub domain
Since Sci-Hub domains change frequently, you may need to update the URL:

1. Open `content.js` and `background.js`
2. Find the line with `const SCIHUB_URL = "https://sci-hub.se/";`
3. Replace with the current Sci-Hub domain
4. Reload the extension in your browser

### Adding more academic publishers
To add support for additional websites:

1. Open `manifest.json`
2. Find the `"matches"` section under `"content_scripts"`
3. Add new domain patterns following the existing format

## 📝 Technical Details

The extension uses:
- Manifest V3 for modern browser compatibility
- Regular expressions for reliable DOI detection
- Content scripts for page modification
- Background service worker for extension icon functionality

## ⚠️ Disclaimer

This extension is provided for educational and research purposes only. It simply helps navigate between websites and does not host or distribute any copyrighted content. Users should comply with all applicable laws and regulations regarding academic content access in their jurisdiction.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Made with ❤️ for researchers and knowledge seekers everywhere.
