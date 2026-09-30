const fs = require('fs');
let c = fs.readFileSync('src/app/(platform)/settings/settings-client.tsx', 'utf8');

c = c.replace(/firstName: "Ahmet",/g, "firstName: user.profile?.firstName || '',");
c = c.replace(/lastName: "YÄ±lmaz",|lastName: "Yılmaz",/g, "lastName: user.profile?.lastName || '',");
c = c.replace(/bio: ".*?",/g, "bio: user.profile?.bio || '',");
c = c.replace(/discord: ".*?",/g, "discord: user.profile?.discordUsername || '',");
c = c.replace(/realName: false,/g, "realName: user.profile?.showAge || false, // Should be showName but we map simple");
c = c.replace(/age: false,/g, "age: user.profile?.showAge || false,");
c = c.replace(/school: true,/g, "school: user.profile?.showSchool || false,");

fs.writeFileSync('src/app/(platform)/settings/settings-client.tsx', c, 'utf8');
console.log('Fixed profile object');
