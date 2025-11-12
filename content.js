// Confetti Extension - Cross-platform shortcut to trigger confetti
console.log('🎉 Confetti Extension Active!');

// Detect whether we are running on macOS (where the Option key maps to Alt)
const isMacPlatform = (() => {
  if (typeof navigator === 'undefined') return false;
  const platform = navigator.platform || navigator.userAgentData?.platform || '';
  return platform.toLowerCase().includes('mac');
})();

// Helper: determine whether the confetti shortcut was pressed
function isConfettiShortcut(event) {
  if (event.code !== 'KeyZ') {
    return false;
  }

  const altLikePressed = event.altKey ||
    (typeof event.getModifierState === 'function' && event.getModifierState('AltGraph'));

  // macOS → Option + Z (no other modifiers)
  if (isMacPlatform) {
    return altLikePressed && !event.ctrlKey && !event.metaKey && !event.shiftKey;
  }

  // Windows/Linux → Alt + Z (no other modifiers)
  return altLikePressed && !event.ctrlKey && !event.metaKey && !event.shiftKey;
}

// Listen for the keyboard shortcut
document.addEventListener('keydown', function(event) {
  if (isConfettiShortcut(event)) {
    event.preventDefault();
    
    console.log('🎊 Confetti shortcut detected - Triggering confetti!');
    
    // Check if confetti library is loaded
    if (typeof confetti === 'undefined') {
      console.error('❌ Confetti library not loaded!');
      return;
    }
    
    // Trigger confetti animation
    fireConfetti();
  }
});

// Enhanced confetti animation for full screen coverage
function fireConfetti() {
  // Left side burst - shoots across entire screen to the right
  confetti({
    particleCount: 300,     // Good density
    angle: 60,              // Angle up and to the right
    spread: 100,            // Wide spread for full coverage
    startVelocity: 90,      // High velocity to reach across screen
    origin: { 
      x: -0.1,              // Start slightly off left edge
      y: 1.1                // Middle-lower area
    }
  });
  
  // Right side burst - shoots across entire screen to the left
  confetti({
    particleCount: 300,     // Good density
    angle: 120,             // Angle up and to the left
    spread: 100,            // Wide spread for full coverage
    startVelocity: 90,      // High velocity to reach across screen
    origin: { 
      x: 1.1,               // Start slightly off right edge
      y: 1.1                // Middle-lower area
    }
  });
}

console.log('✅ Ready! Press Alt+Z on Windows/Linux or Option+Z on macOS to see confetti!');