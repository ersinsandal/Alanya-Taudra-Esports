const fs = require('fs');
let renderer = fs.readFileSync('src/components/arena/arena-renderer.ts', 'utf8');

renderer = renderer.replace(
  /this\.ctx\.fillStyle = gradient;\n    this\.ctx\.fillRect\(0, 0, this\.width, this\.height\);/,
  "this.ctx.globalCompositeOperation = 'lighter';\n    this.ctx.fillStyle = gradient;\n    this.ctx.fillRect(0, 0, this.width, this.height);\n    this.ctx.globalCompositeOperation = 'source-over';"
);

fs.writeFileSync('src/components/arena/arena-renderer.ts', renderer, 'utf8');
