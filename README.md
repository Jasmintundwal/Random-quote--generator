# Random Quote Generator (QuotePulse)

A clean, minimal, and responsive web application that delivers daily inspiration with elegance and simplicity.

---

## ✨ Features

- **Random Quote on Launch**: Automatically presents a fresh, inspiring quote whenever the app is opened.
- **"New Quote" Button**: Generates a **guaranteed different quote** on every click with smooth fade-in animations and a rotating icon.
- **Clear Text & Author Presentation**: Features clean typography pairing (`Lora` for quotes and `Inter` for interface elements), distinguished with category badges and author attribution.
- **Minimal & Modern UI**: Distraction-free design with subtle shadows, rounded cards, and responsive layout that works on mobile, tablet, and desktop screens.
- **Curated Library of 100+ Quotes**: Spans categories such as Wisdom, Philosophy, Motivation, Science, Creativity, Courage, Mindfulness, and Kindness.
- **Topic Filter**: Easily browse quotes by category (Wisdom, Motivation, Philosophy, etc.) or explore all topics.
- **Copy to Clipboard**: Quick one-click copy with instant visual checkmark and toast notification.
- **Listen (Text-to-Speech)**: Integrated speech synthesis allows you to listen to quotes read out loud.
- **Favorites Drawer**: Save your favorite quotes to local storage, review them anytime, copy them, or delete them.
- **Share to X (Twitter)**: Share your favorite quotes directly to social media with formatted text and hashtags.
- **Dark / Light Mode**: Seamless theme switching with automatic system preference detection and persistent storage.
- **Keyboard Shortcuts**: Built-in keyboard navigation for power users.

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
| --- | --- |
| <kbd>Space</kbd> or <kbd>N</kbd> | Generate a new, different quote |
| <kbd>C</kbd> | Copy current quote to clipboard |
| <kbd>L</kbd> | Listen / Read quote aloud |
| <kbd>F</kbd> | Save or remove from Favorites |
| <kbd>T</kbd> | Toggle Light / Dark mode |
| <kbd>Esc</kbd> | Close Saved Quotes modal |

---

## 🚀 How to Run

No installations, Node.js, or backend servers are required. Simply open `index.html` in any modern web browser:

### Option 1: Double Click
1. Navigate to `c:\Users\Lenovo\Downloads\Random Quote Generator`.
2. Double-click [index.html](file:///c:/Users/Lenovo/Downloads/Random%20Quote%20Generator/index.html).

### Option 2: Command Line
```powershell
start msedge "c:\Users\Lenovo\Downloads\Random Quote Generator\index.html"
# or
start chrome "c:\Users\Lenovo\Downloads\Random Quote Generator\index.html"
```

---

## 📁 Project Structure

```
Random Quote Generator/
│
├── index.html       # Clean HTML5 structure and accessible markup
├── style.css        # Minimalist CSS design system, dark/light theme, animations
├── quotes.js        # Curated collection of 100+ inspiring quotes with categories
├── script.js        # Dynamic selection algorithm, clipboard, speech synthesis, & state
└── README.md        # Documentation and guide
```
