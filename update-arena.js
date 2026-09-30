const fs = require('fs');
let config = fs.readFileSync('src/components/arena/arena-config.ts', 'utf8');

config = config.replace(
  /glow: \{ size: 800, opacity: 0\.45, color: '#FF1F2D' \}/,
  "glow: { size: 1000, opacity: 0.85, color: '#FF0015' }"
);

config = config.replace(
  /glow: \{ size: 600, opacity: 0\.35, color: '#FF1F2D' \}/,
  "glow: { size: 800, opacity: 0.70, color: '#FF0015' }"
);

fs.writeFileSync('src/components/arena/arena-config.ts', config, 'utf8');
