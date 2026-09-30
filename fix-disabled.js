const fs = require('fs');
let c = fs.readFileSync('src/app/(platform)/settings/settings-client.tsx', 'utf8');

c = c.replace(
  'onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}',
  'disabled\\n                      onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}'
);

c = c.replace(
  'onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}',
  'disabled\\n                      onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}'
);

// Add "Değişiklik Talep Et" button text above or next to the labels
c = c.replace(
  '<label className="block text-sm font-medium text-secondary-text mb-2">Ad</label>',
  '<div className="flex justify-between items-center mb-2">\\n                      <label className="block text-sm font-medium text-secondary-text">Ad</label>\\n                      <button type="button" onClick={() => showToast("İsim değişikliği talebi alındı.")} className="text-xs text-primary-red hover:underline">Değişiklik Talep Et</button>\\n                    </div>'
);

c = c.replace(
  '<label className="block text-sm font-medium text-secondary-text mb-2">Soyad</label>',
  '<div className="flex justify-between items-center mb-2">\\n                      <label className="block text-sm font-medium text-secondary-text">Soyad</label>\\n                    </div>'
);


fs.writeFileSync('src/app/(platform)/settings/settings-client.tsx', c, 'utf8');
