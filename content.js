// Confetti Extension - Press Ctrl+C to trigger confetti
console.log('🎉 Confetti Extension Active!');

// Listen for Ctrl+C keyboard shortcut
document.addEventListener('keydown', function(event) {
  // Check if Ctrl+C is pressed
  if (event.altKey && (event.key === 'z' || event.key === 'Z')) {
    event.preventDefault();
    
    console.log('🎊 Ctrl+C pressed - Triggering confetti!');
    
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

console.log('✅ Ready! Press Ctrl+C on any page to see confetti!');