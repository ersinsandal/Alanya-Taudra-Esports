const fs = require('fs');
let c = fs.readFileSync('src/app/admin/reports/reports-client.tsx', 'utf8');

c = c.replace(/r\.status === 'Açık'/g, "r.status === 'PENDING'");
c = c.replace(/r\.status === 'Çözüldü'/g, "r.status === 'RESOLVED'");
c = c.replace(/=== 'İnceleniyor'/g, "=== 'IN_REVIEW'");
c = c.replace(/=== 'Kapandı'/g, "=== 'DISMISSED'");

// Change {report.id} mapping
c = c.replace(/>{report\.id}</g, ">{report.id.substring(0,8)}<");

fs.writeFileSync('src/app/admin/reports/reports-client.tsx', c, 'utf8');
