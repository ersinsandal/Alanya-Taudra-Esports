const fs = require('fs');
let schema = fs.readFileSync('prisma/schema.prisma', 'utf8');

// Fix Game relations
schema = schema.replace(/game        Game           @relation\(fields: \[gameId\], references: \[id\]\)/g, "game        Game           @relation(fields: [gameId], references: [id], onDelete: Cascade)");
schema = schema.replace(/game    Game         @relation\(fields: \[gameId\], references: \[id\]\)/g, "game    Game         @relation(fields: [gameId], references: [id], onDelete: Cascade)");
schema = schema.replace(/game    Game             @relation\(fields: \[gameId\], references: \[id\]\)/g, "game    Game             @relation(fields: [gameId], references: [id], onDelete: Cascade)");
schema = schema.replace(/game            Game              @relation\(fields: \[gameId\], references: \[id\]\)/g, "game            Game              @relation(fields: [gameId], references: [id], onDelete: Cascade)");

// Fix Team relation in Match
schema = schema.replace(/teamA      Team         @relation\("MatchTeamA", fields: \[teamAId\], references: \[id\]\)/g, "teamA      Team         @relation(\"MatchTeamA\", fields: [teamAId], references: [id], onDelete: Cascade)");
schema = schema.replace(/teamB      Team         @relation\("MatchTeamB", fields: \[teamBId\], references: \[id\]\)/g, "teamB      Team         @relation(\"MatchTeamB\", fields: [teamBId], references: [id], onDelete: Cascade)");

fs.writeFileSync('prisma/schema.prisma', schema, 'utf8');
