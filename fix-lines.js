const fs = require('fs');
let c = fs.readFileSync('src/app/(platform)/settings/settings-client.tsx', 'utf8');

c = c.replace(/disabled\\n\s+onChange=/g, "disabled\n                      onChange=");
c = c.replace(/<div className="flex justify-between items-center mb-2">\\n\s+<label/g, "<div className=\"flex justify-between items-center mb-2\">\n                      <label");
c = c.replace(/">Ad<\/label>\\n\s+<button/g, "\">Ad</label>\n                      <button");
c = c.replace(/Talep Et<\/button>\\n\s+<\/div>/g, "Talep Et</button>\n                    </div>");
c = c.replace(/">Soyad<\/label>\\n\s+<\/div>/g, "\">Soyad</label>\n                    </div>");

fs.writeFileSync('src/app/(platform)/settings/settings-client.tsx', c, 'utf8');
