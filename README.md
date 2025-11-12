# Confetti Ctrl+C Extension

Press **Ctrl+C** on any webpage to shower the screen with confetti that bursts in from both sides and sprays upward across the viewport. This extension is lightweight, self-contained, and ready for local testing or submission to the Firefox Add-on Developer Hub.

---

## 🗂️ Project Layout

```
Confetti Extension/
├── manifest.json     # Firefox extension manifest (v2)
├── content.js        # Listens for Ctrl+C and triggers confetti bursts
├── confetti.js       # Custom confetti animation library (colors + physics)
├── icon.png          # 48x48 icon used by Firefox
└── confetti-extension.xpi  # Packaged extension ready for upload
```

---

## ⚙️ How It Works

1. **manifest.json** registers a content script for all webpages and injects two JavaScript files:
   - `confetti.js` – Defines the animation behavior, colors, and physics.
   - `content.js` – Watches for the `Ctrl+C` shortcut and launches two confetti bursts.
2. **confetti.js** contains a `COLORS` array and physics constants. Edit the values near the top of the file to change palette, gravity, velocity, or particle sizes.
3. **content.js** fires two confetti bursts (left and right) with customizable particle count, angle, spread, and velocity.

---

## 🎨 Customizing Confetti

### Colors & Physics (`confetti.js`)
At the top of `confetti.js` you will find easy-to-edit constants:
```js
const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', ...];
const PARTICLE_SIZE_MIN = 4;
const PARTICLE_SIZE_MAX = 12;
const GRAVITY = 0.5;
const DECAY = 0.9;
const LIFETIME_TICKS = 200;
```
Change these values to adjust the look and feel. For example:
- Increase `GRAVITY` to make confetti fall faster.
- Raise `PARTICLE_SIZE_MAX` for bigger flakes.
- Edit `COLORS` to use your own palette.

### Burst Settings (`content.js`)
Each confetti burst is triggered with a call like this:
```js
confetti({
  particleCount: 300,
  angle: 60,
  spread: 100,
  startVelocity: 90,
  origin: { x: -0.1, y: 1.1 }
});
```
Tweak these values to control density, direction, launch speed, and starting position.

---

## 🧪 Local Testing (Temporary Install)

1. Open Firefox (or Firefox Developer Edition).
2. Visit `about:debugging#/runtime/this-firefox`.
3. Click **“Load Temporary Add-on…”**.
4. Select `manifest.json` inside the `Confetti Extension` folder.
5. Open any webpage and press **Ctrl+C** to see confetti.

> Temporary installs are removed when Firefox closes. Repeat the steps above whenever you restart the browser.

---

## 📨 Publishing on Firefox Add-on Developer Hub

1. Go to [Firefox Add-on Developer Hub](https://addons.mozilla.org/developers/).
2. Sign in with your Firefox account.
3. Choose **“Submit a New Add-on”**.
4. Upload `confetti-extension.xpi` (generated in this folder).
5. Fill in the listing details (name, description, icon, etc.).
6. Submit for automated review. Mozilla will sign the add-on and provide a download link once approved.

> Tip: Keep `manifest.json`, `content.js`, `confetti.js`, and `icon.png` in sync. If you change anything, rebuild the XPI (zip the four files and rename the archive to `.xpi`).

---

## ❓ Troubleshooting

- **No confetti when pressing Ctrl+C:** Ensure `confetti.js` is injected (check console for `✨ Confetti Library Loaded`). Confirm the shortcut is not being captured by another extension.
- **Different keyboard shortcut:** Edit the listener in `content.js` to watch for a different key combination.
- **Validation warning about data collection:** The manifest already includes the required `
