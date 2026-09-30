const fs = require('fs');
let schema = fs.readFileSync('prisma/schema.prisma', 'utf8');

if (!schema.includes('enum UniversityType')) {
  schema = schema.replace(/enum SchoolType \{\n  PUBLIC\n  PRIVATE\n\}/, "enum SchoolType {\n  PUBLIC\n  PRIVATE\n}\n\nenum UniversityType {\n  STATE\n  FOUNDATION\n}");
  schema = schema.replace(/model University \{\n  id        String   @id @default\(uuid\(\)\)\n  name      String   @unique/, "model University {\n  id        String   @id @default(uuid())\n  name      String   @unique\n  type      UniversityType @default(STATE)");
  fs.writeFileSync('prisma/schema.prisma', schema, 'utf8');
}
