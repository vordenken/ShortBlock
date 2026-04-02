<p align="center">
  <a href="#">
    <img height="128" width="128" src="https://raw.github.com/vordenken/ShortBlock/main/ShortBlock/Assets.xcassets/AppIcon.appiconset/icon_512x512.png">
  </a>
  <h1 align="center">ShortBlock for Safari</h1>
</p>

<p align="center">
  <img src="https://img.shields.io/github/downloads/vordenken/ShortBlock/total" alt="Downloads">
  <img src="https://img.shields.io/github/license/vordenken/ShortBlock" alt="License">
  <img src="https://img.shields.io/github/actions/workflow/status/vordenken/ShortBlock/build.yml" alt="Build">
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

1. Download the latest release [here](https://github.com/vordenken/ShortBlock/releases)
2. Unzip and move `ShortBlock.app` to your Applications folder
3. Open the app — it will guide you to enable the Safari extension
4. Enable **ShortBlock** in Safari → Settings → Extensions

> **Note:** Releases from GitHub Actions are unsigned. macOS will ask for confirmation the first time you open the app. Right-click → Open to bypass Gatekeeper.

## 💻 Requirements

- macOS 13.5 or later
- Safari 16 or later

## 🔨 Build from Source

```bash
git clone https://github.com/vordenken/ShortBlock.git
cd ShortBlock
open ShortBlock.xcodeproj
```

Then build and run the `ShortBlock` scheme in Xcode.

## 🔄 Versioning & Releases

The version is managed by a single file: **`semver.txt`** (single source of truth).

| Branch | Trigger | Tag format | Release type | Sparkle channel |
|--------|---------|------------|--------------|-----------------|
| `main` | push with new semver | `v1.2.3` | Stable | default |
| `develop` | push with new semver | `v1.2.3-beta.N` | Pre-release | `beta` |

### How it works

1. Edit `semver.txt` with the new version (e.g. `1.2.0`)
2. Push to `main` (stable) or `develop` (beta)
3. GitHub Actions will:
   - Stamp the version into `project.pbxproj` and `manifest.json`
   - Build & archive the app
   - Update `appcast.xml` with the new Sparkle entry
   - Create a git tag (`vX.Y.Z` or `vX.Y.Z-beta.N`)
   - Publish a GitHub Release with the `.zip` artifact

Existing users receive updates automatically via [Sparkle](https://sparkle-project.org/).

> **Note:** Before the first production release, generate a Sparkle EdDSA key pair
> (`generate_keys` from the Sparkle tools) and replace the `SUPublicEDKey` placeholder
> in `ShortBlock/Info.plist` with your public key.

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
