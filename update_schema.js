const fs = require('fs');

let schema = fs.readFileSync('prisma/schema.prisma', 'utf8');

// Replace TeamRole
schema = schema.replace(/enum TeamRole \{[\s\S]*?\}/, 'enum TeamRole {\n  CAPTAIN\n  PLAYER\n  SUBSTITUTE\n}');

// Remove ACADEMY and ACADEMY_MILESTONE, TRYOUT
schema = schema.replace(/\n  ACADEMY/, '');
schema = schema.replace(/\n  ACADEMY_MILESTONE/, '');
schema = schema.replace(/\n  ACADEMY_UPDATE\r?\n  TRYOUT/, '');

// Replace User relations
schema = schema.replace(/  academyApplications   AcademyApplication\[\]\r?\n  staffApplications     StaffApplication\[\]\r?\n/, '  crewMemberships       CrewMember[]\n  crewLeaderships       CrewLeader[]\n  crewApplications      CrewApplication[]\n');
schema = schema.replace(/  tryoutEvaluations     TryoutEvaluation\[\] @relation\("Evaluator"\)\r?\n/, '');

// Replace Academy section with Game Crews
const academySectionRegex = /\/\/ ============================================\r?\n\/\/ ACADEMY\r?\n\/\/ ============================================\r?\n[\s\S]*?(?=\r?\n\/\/ ============================================\r?\n\/\/ TOURNAMENTS)/;
const crewSection = `// ============================================
// GAME CREWS
// ============================================

model Crew {
  id          String   @id @default(uuid())
  name        String   @unique
  slug        String   @unique
  gameId      String
  description String?
  logoUrl     String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  game        Game     @relation(fields: [gameId], references: [id])
  members     CrewMember[]
  leaders     CrewLeader[]
}

model CrewMember {
  id       String   @id @default(uuid())
  crewId   String
  userId   String
  joinedAt DateTime @default(now())
  
  crew     Crew     @relation(fields: [crewId], references: [id], onDelete: Cascade)
  user     User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([crewId, userId])
}

model CrewLeader {
  id         String   @id @default(uuid())
  crewId     String
  userId     String
  assignedAt DateTime @default(now())
  
  crew       Crew     @relation(fields: [crewId], references: [id], onDelete: Cascade)
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([crewId, userId])
}

model CrewApplication {
  id          String   @id @default(uuid())
  userId      String
  gameId      String
  motivation  String?
  experience  String?
  status      ApplicationStatus @default(SUBMITTED)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  game        Game     @relation(fields: [gameId], references: [id], onDelete: Cascade)
}`;
schema = schema.replace(academySectionRegex, crewSection);

// Remove StaffApplication
const staffAppRegex = /model StaffApplication \{[\s\S]*?\}/;
schema = schema.replace(staffAppRegex, '');

fs.writeFileSync('prisma/schema.prisma', schema);
console.log('Schema updated successfully');
