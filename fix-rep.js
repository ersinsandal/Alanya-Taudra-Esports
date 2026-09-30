const fs = require('fs');
let c = fs.readFileSync('src/app/admin/reports/reports-client.tsx', 'utf8');

c = c.replace('export default function ReportsPage() {', 'export default function ReportsClient({ initialReports }: { initialReports: any[] }) {');

c = c.replace(
  'const [reports, setReports] = useState([\\n    { id: \\'REP-1042\\', reporter: \\'ahmet_pro\\', reported: \\'toxic_player99\\', category: \\'Toxic\\', date: \\'29.09.2024\\', priority: \\'Yüksek\\', status: \\'Açık\\' },\\n    { id: \\'REP-1041\\', reporter: \\'veli_cs\\', reported: \\'aimbot_user\\', category: \\'Hile\\', date: \\'29.09.2024\\', priority: \\'Kritik\\', status: \\'İnceleniyor\\' },\\n    { id: \\'REP-1040\\', reporter: \\'ayse_val\\', reported: \\'spammer123\\', category: \\'Spam\\', date: \\'28.09.2024\\', priority: \\'Düşük\\', status: \\'Çözüldü\\' },\\n    { id: \\'REP-1039\\', reporter: \\'mehmet_lol\\', reported: \\'scammer_x\\', category: \\'Dolandırıcılık\\', date: \\'28.09.2024\\', priority: \\'Yüksek\\', status: \\'Açık\\' },\\n    { id: \\'REP-1038\\', reporter: \\'canan_fc\\', reported: \\'griefing_dude\\', category: \\'Toxic\\', date: \\'27.09.2024\\', priority: \\'Orta\\', status: \\'Kapandı\\' },\\n  ]);',
  \const mappedReports = initialReports.map(r => ({
      id: r.id,
      reporter: r.reporter.username,
      reported: r.targetId,
      category: r.reason,
      date: new Date(r.createdAt).toLocaleDateString('tr-TR'),
      priority: r.targetType === 'SYSTEM' ? 'Kritik' : 'Normal',
      status: r.status,
      details: r.details
    }));
  const [reports, setReports] = useState(mappedReports);\
);

// PENDING, IN_REVIEW, RESOLVED, DISMISSED
// The client expects 'Açık', 'Çözüldü', 'Kapandı', etc. We'll map those.
c = c.replace(/r.status === 'Açık'/g, "r.status === 'PENDING'");
c = c.replace(/r.status === 'Çözüldü'/g, "r.status === 'RESOLVED'");
c = c.replace(/=== 'İnceleniyor'/g, "=== 'IN_REVIEW'");
c = c.replace(/=== 'Kapandı'/g, "=== 'DISMISSED'");

// Change the mock 'id' to truncate because it's a UUID
c = c.replace(/r.id/g, "r.id.substring(0,8)");

// There's a setReports update where id is compared
c = c.replace(/r.id.substring\(0,8\) === id/g, "r.id === id"); // Revert that specific one

fs.writeFileSync('src/app/admin/reports/reports-client.tsx', c, 'utf8');
