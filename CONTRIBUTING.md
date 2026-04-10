# Contributing to ShortBlock

Thank you for your interest in contributing to ShortBlock!

## How to contribute

### Reporting bugs
Please [open an issue](https://github.com/vordenken/ShortBlock/issues/new) and include:
- macOS and Safari version
- What happened vs. what you expected
- Steps to reproduce

### Submitting improvements
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-improvement`)
3. Make your changes
4. Submit a pull request

### Areas where help is welcome
- Improving YouTube Shorts detection selectors (YouTube frequently updates its DOM)
- Better icon design
- Localization support
- Bug fixes

## Development setup

```bash
git clone https://github.com/vordenken/ShortBlock.git
cd ShortBlock
open ShortBlock.xcodeproj
```

Build and run the `ShortBlock` scheme in Xcode (requires macOS 13.5+ and Xcode 16+).

## Code style

- JavaScript: follow the existing code style in `content.js` and `popup.js`
- Swift: standard Swift conventions
