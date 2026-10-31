const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../assets/images/ruben.jpg');
const outputPath = path.join(__dirname, '../assets/images/ruben-profile.svg');

if (!fs.existsSync(inputPath)) {
  console.error('Image not found:', inputPath);
  process.exit(1);
}

const imgBase64 = fs.readFileSync(inputPath).toString('base64');

// Authentic Color Portrait with Deep Black Fade & Luxury Warm Mustard/Amber Rim Light
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
  <defs>
    <!-- Multi-stop Dark Gradient Fade to pure black at bottom -->
    <linearGradient id="bottomFade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#07080a" stop-opacity="0"/>
      <stop offset="42%" stop-color="#07080a" stop-opacity="0.08"/>
      <stop offset="65%" stop-color="#07080a" stop-opacity="0.55"/>
      <stop offset="85%" stop-color="#07080a" stop-opacity="0.92"/>
      <stop offset="100%" stop-color="#07080a" stop-opacity="1"/>
    </linearGradient>

    <!-- Top & Edge Vignette -->
    <linearGradient id="topVignette" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#07080a" stop-opacity="0.55"/>
      <stop offset="22%" stop-color="#07080a" stop-opacity="0"/>
    </linearGradient>

    <!-- Luxury Warm Mustard / Gold Ambient Rim Light -->
    <radialGradient id="mustardGlow" cx="15%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#E5A93C" stop-opacity="0.22"/>
      <stop offset="60%" stop-color="#E5A93C" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="#E5A93C" stop-opacity="0"/>
    </radialGradient>

    <!-- Clean Natural Color Vibrance Filter -->
    <filter id="naturalVibrance" x="0%" y="0%" width="100%" height="100%">
      <feColorMatrix type="saturate" values="1.08"/>
      <feComponentTransfer>
        <feFuncR type="linear" slope="1.04" intercept="-0.02"/>
        <feFuncG type="linear" slope="1.04" intercept="-0.02"/>
        <feFuncB type="linear" slope="1.04" intercept="-0.02"/>
      </feComponentTransfer>
    </filter>
  </defs>

  <!-- Real Full Color Photo of Rubén -->
  <g filter="url(#naturalVibrance)">
    <image href="data:image/jpeg;base64,${imgBase64}" x="0" y="-30" width="800" height="1060" preserveAspectRatio="xMidYMid slice" />
  </g>

  <!-- Warm Mustard Accent and Smooth Black Transition Overlays -->
  <rect width="800" height="1000" fill="url(#mustardGlow)" style="mix-blend-mode: screen;" />
  <rect width="800" height="1000" fill="url(#topVignette)" />
  <rect width="800" height="1000" fill="url(#bottomFade)" />
</svg>`;

fs.writeFileSync(outputPath, svg);
console.log('Successfully generated Full Color Portrait with Mustard accents:', outputPath);
