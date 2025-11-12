# 🎉 Confetti Shortcut Extension

Press **Alt + Z** on Windows/Linux or **Option + Z** on macOS and the screen fills with two bright confetti bursts that travel from the edges toward the center. The project is intentionally tiny so you can learn how Firefox extensions are structured, customize the animation, and publish the add-on yourself.

> New to browser extensions? Read the sections below in order. Each one explains the files in this folder and exactly what you need to change (or leave alone) to make the extension your own.

---

## 🗂 Project Files Explained

```
Confetti Extension/
├── manifest.json             ← Firefox tells the browser how to load the extension
├── content.js                ← Listens for Alt+Z (Windows/Linux) or Option+Z (macOS) and triggers the confetti bursts
├── confetti.js               ← Animation engine (colors, physics, drawing code)
├── icon.png                  ← 48 × 48 icon shown in Firefox menus
└── confetti-extension.xpi    ← Pre-built package you can upload to Mozilla
```

### `manifest.json`
- Declares the extension name, version, and description shown in Firefox.
- Asks for permission to run on every tab (`"<all_urls>"`) so the shortcut works anywhere.
- Injects both JavaScript files (`confetti.js` first, then `content.js`) on every page once loading finishes.
- Supplies metadata for the Firefox Add-on store (the `browser_specific_settings` block).

### `content.js`
- Runs in every tab after the page loads.
- Uses a helper function to listen for **Alt + Z** on Windows/Linux and **Option + Z** on macOS so the shortcut feels native on each platform.
- Calls `fireConfetti()` which launches a burst from the left and a burst from the right.
- Logs helpful status messages in the web console so you know the script is active.

### `confetti.js`
- Creates a `<canvas>` overlay exactly the size of the tab and draws the animation there.
- Defines easy-to-edit constants for colors, particle size, gravity, and lifespan.
- Exposes a global `confetti(options)` function—`content.js` calls it with different settings for each burst.
- Cleans itself up when no particles remain so it does not leave extra elements on the page.

### Other files
- `icon.png` is the icon Firefox shows in add-on listings. Replace it with your own 48 × 48 image if you want a different look.
- `confetti-extension.xpi` is simply a zipped copy of the four files above. You can submit it to Mozilla as-is or rebuild it after making changes (see “Packaging for Release”).

---

## 🚀 Quick Start (Temporary Install)

1. Open Firefox (regular or Developer Edition).
2. Navigate to `about:debugging#/runtime/this-firefox`.
3. Click **Load Temporary Add-on…**.
4. Pick the `manifest.json` file inside this project folder.
5. Switch to any open tab and press **Alt + Z** (Windows/Linux) or **Option + Z** (macOS). Two waves of confetti should appear.

Temporary installs disappear when you close Firefox. Repeat these steps whenever you restart the browser during development.

---

## 🛠 Try It Out and Inspect What Happened

- Open the Firefox Web Console (`Ctrl + Shift + K` / `Cmd + Opt + K` on macOS).
- When the page loads you should see `🎉 Confetti Extension Active!` from `content.js`.
- After pressing **Alt + Z** (Windows/Linux) or **Option + Z** (macOS) you should see `🎊 Confetti shortcut detected - Triggering confetti!` and the animation.
- If you want to stop the animation manually, run `confetti.reset()` from the console.

---

## 🎨 Customize the Experience

### Change the keyboard shortcut (`content.js`)
Look for the listener near the top of the file:
```js
const isMacPlatform = (() => {
  const platform = navigator.platform || navigator.userAgentData?.platform || '';
  return platform.toLowerCase().includes('mac');
})();

function isConfettiShortcut(event) {
  if (event.code !== 'KeyZ') return false;

  const altLike =
    event.altKey ||
    (typeof event.getModifierState === 'function' && event.getModifierState('AltGraph'));

  if (isMacPlatform) {
    return altLike && !event.ctrlKey && !event.metaKey && !event.shiftKey; // Option + Z
  }

  return altLike && !event.ctrlKey && !event.metaKey && !event.shiftKey;   // Alt + Z
}
```
- Adjust the condition for macOS or other platforms if you want different modifier keys.
- Replace `'KeyZ'` with another code (for example, `'KeyC'`) if you want different shortcut letters while keeping layout-independent detection.

### Tweak burst settings (`content.js`)
Each call to `confetti({...})` controls one side of the animation. Adjust these values:
```js
confetti({
  particleCount: 300,
  angle: 60,
  spread: 100,
  startVelocity: 90,
  origin: { x: -0.1, y: 1.1 }
});
```
- `particleCount`: more particles = denser confetti.
- `angle` & `spread`: aim the burst and control how wide it fans out.
- `startVelocity`: how fast the pieces launch.
- `origin`: starting point as a percentage of the page (`x` and `y` go from 0 to 1).

### Update colors and physics (`confetti.js`)
At the top of the file you will find:
```js
const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', /* ... */];
const PARTICLE_SIZE_MIN = 4;
const PARTICLE_SIZE_MAX = 8;
const GRAVITY = 0.4;
const DECAY = 0.94;
const LIFETIME_TICKS = 300;
```
- Change `COLORS` to your brand palette.
- Raise `GRAVITY` to make pieces fall faster; lower it for floaty confetti.
- Increase `PARTICLE_SIZE_MAX` for chunkier shapes.
- Reduce `LIFETIME_TICKS` if you want the confetti to disappear sooner.

---

## 📦 Packaging for Release

1. Remove the old `confetti-extension.xpi` if you plan to rebuild it.
2. Select `manifest.json`, `content.js`, `confetti.js`, and `icon.png`.
3. Zip the four files (macOS Finder: right-click → **Compress 4 Items**).
4. Rename the resulting archive to `confetti-extension.xpi`.

You can now upload the `.xpi` file to the [Firefox Add-on Developer Hub](https://addons.mozilla.org/developers/). Mozilla runs automated checks, signs the extension, and gives you a download link once approved.

---

## ❓ Troubleshooting

- **Nothing happens when you press Alt/Option + Z.** Open the console and confirm you see `🎉 Confetti Extension Active!`. If not, reload the tab or make sure you loaded the temporary add-on. Also ensure another extension is not intercepting Alt/Option on your system.
- **Console shows “Confetti library not loaded.”** Firefox injected `content.js`, but `confetti.js` failed. Reload the tab; if you modified `confetti.js`, check for syntax errors.
- **You want a different shortcut.** Update the keyboard listener in `content.js` (see “Change the keyboard shortcut” above), then reload the temporary add-on.
- **Confetti appears behind the page content.** The animation canvas uses a very high `z-index`, but some sites with 3D transforms can still overlay it. Try reloading the page or lowering site overlays via the browser’s inspector.

---

## 🌱 Next Steps

- Swap in your own colors, icon, or keyboard shortcut to make the add-on personal.
- Add browser actions (buttons, menus) by editing `manifest.json`.
- Explore the [MDN WebExtensions docs](https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions) for ideas like saving settings or limiting the extension to specific domains.

Have fun spreading confetti! If you tinker with the files, remember to reload the temporary add-on so Firefox picks up your changes.
