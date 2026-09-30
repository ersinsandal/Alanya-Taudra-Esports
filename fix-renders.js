const fs = require('fs');
let c = fs.readFileSync('src/app/admin/reports/reports-client.tsx', 'utf8');

c = c.replace(/report\.status === 'AÃ§Ä±k' \? /g, "report.status === 'PENDING' ? ");
c = c.replace(/report\.status === 'Ã‡Ã¶zÃ¼ldÃ¼' \? /g, "report.status === 'RESOLVED' ? ");

const renderReplace = \{report.status === 'PENDING' ? 'Açık' : report.status === 'IN_REVIEW' ? 'İnceleniyor' : report.status === 'RESOLVED' ? 'Çözüldü' : 'Kapandı'}\;
c = c.replace(/>\\s*\\{report\.status\\}\\s*<\\/span>/g, \>\</span>\);

fs.writeFileSync('src/app/admin/reports/reports-client.tsx', c, 'utf8');
