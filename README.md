<p align="center">
  <a href="#">
    <img height="128" width="128" src="https://raw.github.com/vordenken/ShortBlock/main/ShortBlock/Assets.xcassets/AppIcon.appiconset/icon_512x512.png">
  </a>
  <h1 align="center">ShortBlock for Safari</h1>
</p>

<p align="center">
  <img src="https://img.shields.io/github/downloads/vordenken/ShortBlock/total" alt="Downloads">
  <img src="https://img.shields.io/github/license/vordenken/ShortBlock" alt="License">
  <img src="https://img.shields.io/github/actions/workflow/status/vordenken/ShortBlock/build-release.yml" alt="Build">
  <a href="https://makeapullrequest.com"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome"></a>
</p>

A Safari extension that blocks YouTube Shorts — in the sidebar, the home feed, search results, recommendations, and on `/shorts/` pages.

## ✨ Features

- Hides the Shorts entry in the YouTube sidebar navigation
- Removes Shorts shelves from the home feed
- Hides individual Short items in feeds, search results, and recommendations
- Redirects `/shorts/` pages back to the YouTube homepage
- Works on all YouTube domains (`youtube.com`, `m.youtube.com`, `music.youtube.com`)
- Simple one-click on/off toggle in the popup
- Handles YouTube's SPA navigation (single-page app)
- Automatic updates via [Sparkle](https://sparkle-project.org/) (stable + beta channel)

## 🚀 Quick Start

> **⚠️ macOS Gatekeeper:** ShortBlock is not notarized by Apple. macOS will block both the DMG and the app with a security warning — this is expected. Follow the steps below to allow them. Once installed, **updates via Sparkle work without this workaround**.

1. Download the latest `ShortBlock.dmg` from [Releases](https://github.com/vordenken/ShortBlock/releases)
2. Try to open the DMG — macOS will block it with *"cannot be opened because it is from an unidentified developer"*
   - Open **System Settings → Privacy & Security**, scroll down and click **"Open Anyway"**
   - Open the DMG again and drag `ShortBlock.app` to your Applications folder
3. Try to open `ShortBlock.app` — macOS will block it again with the same warning
   - Open **System Settings → Privacy & Security**, scroll down and click **"Open Anyway"**
   - Open the app again — it will guide you to enable the Safari extension
4. Enable **ShortBlock** in Safari → Settings → Extensions

> **Updating:** Open the ShortBlock app occasionally — Sparkle checks for updates automatically (once per day).

## 💻 Requirements

- macOS 13.5 or later
- Safari 16 or later

## 🔨 Building & Releasing

See [BUILD.md](BUILD.md) for instructions on building from source, releasing, and configuring repository secrets.

## 🤝 Contributing

- Code reviews and suggestions welcome
- Bug reports via [Issues](https://github.com/vordenken/ShortBlock/issues)
- Feature improvements via Pull Requests

## ❤️ Support

If you find ShortBlock helpful, consider supporting its development:

<p align="center">
  <a href="https://www.buymeacoffee.com/vordenken">
    <img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee">
  </a>
  <a href="https://ko-fi.com/vordenken">
    <img src="https://ko-fi.com/img/githubbutton_sm.svg" alt="Ko-fi">
  </a>
</p>

## 📝 License & Privacy

- Licensed under GNU GPLv3 — see [LICENSE](LICENSE) file
- No personal data collection — see [Privacy Policy](PRIVACY.md)

## 🙏 Acknowledgments

- Inspired by [AutoPiP](https://github.com/vordenken/AutoPiP)
- Built with Safari Web Extension technology

---
Created by vordenken

> This project was developed with the assistance of AI.
