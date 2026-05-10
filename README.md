# Quick Text Highlighter

A simple, lightweight Obsidian plugin that allows you to highlight text using a custom syntax: `//settings:your text//`. It supports multiple colors, background styles, underlines, and modifiers.

<p align="center">
  <img src="https://github.com/sujit-waghmare/quick-text-highlighter/raw/58336171d1bdad18947a56190057c39b3bbccf4b/assets/images/New%20Project%2015%20%5B4A02A97%5D.gif" width="600" alt="Quick Text Highlighter Demo">
</p>

## Features
- **Custom Highlights**: Fast syntax for inline styling.
- **Multiple Colors**: Red, Green, Blue, Yellow, Purple, Orange.
- **Combined Styles**: Mix and match background colors, text colors, and modifiers.
- **Background vs Text-Only**: Choose whether to color the background or just the text.
- **Custom Borders & Decorations**: Add borders, double underlines, dots, or "tape" effects.

## Usage

Use the syntax `//shortcut,modifiers:Text//` to apply styles.

### Basic Colors (Backgrounds)
- `//r:Red Background//`
- `//g:Green Background//`
- `//b:Blue Background//`
- `//y:Yellow Background//`
- `//p:Purple Background//`
- `//o:Orange Background//`

### Text-Only Colors
Append `-t` to the color shortcut:
- `//r-t:Red Text//`
- `//g-t:Green Text//`
- `//b-t:Blue Text//`

### Modifiers
- `h`: Heavy (Bold + stronger background)
- `w`: White text (Useful for dark backgrounds)
- `brd`: Side borders
- `und`: Underline
- `dot`: Dotted underline
- `2und`: Double underline
- `h-b`: Wavy (Hand-drawn) underline
- `fancy`: Fancy border
- `tape`: Tape effect

### Examples
- `//r,h,w:Urgent Text//` - Red background, heavy bold, white text.
- `//b,brd:Note//` - Blue background with side borders.
- `//o,und:Underlined Orange//` - Orange background with underline.

## Installation

### From Community Plugins (Recommended)
1. Search for `Quick Text Highlighter` in Obsidian's community plugin browser.
2. Click **Install**, then **Enable**.

### Manual Installation
1. Download `main.js`, `manifest.json`, and `styles.css` from the latest release.
2. Create a folder named `quick-text-highlighter` in your vault's `.obsidian/plugins/` directory.
3. Move the downloaded files into that folder.
4. Reload Obsidian and enable the plugin in settings.

## License
MIT License. Created by [Waghmare](https://github.com/sujit-waghmare).

### Credits
Created by [Waghmare](https://github.com/sujit-waghmare).
Folk by [Sowseelyav](https://github.com/ssowseelyav-ops).
