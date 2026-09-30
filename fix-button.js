const fs = require('fs');
let c = fs.readFileSync('src/app/(platform)/settings/settings-client.tsx', 'utf8');

const targetStr = 'showToast("İsim değişikliği talebi alındı.")';
const replaceStr = \{
                        fetch('/api/profile/request-change', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ type: 'Name Change', message: 'Kullanıcı isim değişikliği talep ediyor.' })
                        }).then(() => showToast('İsim değişikliği talebi yönetime iletildi.'))
                      }\;

c = c.replace(targetStr, replaceStr);
fs.writeFileSync('src/app/(platform)/settings/settings-client.tsx', c, 'utf8');
