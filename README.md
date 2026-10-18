<p align="center">
  <img src="public/ate-logo.png" alt="Alanya Taudra Esports Logo" width="220" />
</p>

<h1 align="center">ALANYA TAUDRA ESPORTS (ATE) DIGITAL ARENA</h1>

<p align="center">
  <strong>"THEY PLAYED, WE ATE."</strong><br />
  <em>The Unified Digital Infrastructure for Competitive Gaming, Talent Discovery & Community Excellence — Born in Alanya, Built for the World.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge&logo=postgresql" alt="PostgreSQL" />
</p>

<p align="center">
  📖 <strong>Documentation Language:</strong> 🇺🇸 <strong>English</strong> | 🇹🇷 <a href="./README.tr.md">Türkçe Dokümantasyon</a>
</p>

---

## 📑 Table of Contents
- [🎯 Our Vision & Manifesto](#-our-vision--manifesto)
- [🔥 Why Alanya Taudra Esports?](#-why-alanya-taudra-esports)
- [🏟️ ATE Digital Arena Platform Architecture](#️-ate-digital-arena-platform-architecture)
  - [1. ATE Identity & Athlete Passport (ATE ID)](#1-ate-identity--athlete-passport-ate-id)
  - [2. Game Community Crews & Leadership](#2-game-community-crews--leadership)
  - [3. Official Competitive Teams & Captaincy](#3-official-competitive-teams--captaincy)
  - [4. Tournament & Event Engine](#4-tournament--event-engine)
  - [5. Alanya School League & Collegiate Esports](#5-alanya-school-league--collegiate-esports)
  - [6. Real-Time Audit Engine & System Administration](#6-real-time-audit-engine--system-administration)
- [👑 Roles & Ecosystem Hierarchy](#-roles--ecosystem-hierarchy)
- [🚀 Join the Movement: Step Into the Arena](#-join-the-movement-step-into-the-arena)
- [💻 Technical Architecture & Tech Stack](#-technical-architecture--tech-stack)
- [🛠️ Developer Installation & Quickstart](#️-developer-installation--quickstart)
- [📞 Contact & Community Links](#-contact--community-links)

---

## 🎯 Our Vision & Manifesto

> *"Anyone can play games. Some simply kill time; others forge their reflexes with relentless discipline and write history."*

**Alanya Taudra Esports (ATE)** is a trailblazing esports organization and digital gaming ecosystem founded in the heart of the Mediterranean — Alanya. Driven by the raw energy and competitive hunger of local youth, ATE's mission is to shatter conventional stigmas and elevate regional talent to national and international supremacy.

Millions of gamers spend countless hours behind screens, often dismissed by outdated mindsets as *"wasting time"*. **We are here to fundamentally change that narrative.**

### Our Core Commitments:
1. **Transforming Passion into Athletic Discipline:** We bridge the canyon between aimless casual gaming and professional esports mindsets. We instill tactical thinking, lightning-fast decision-making, in-game communication, mental fortitude, and true sportsmanship.
2. **Ending Toxic Solo Queues:** No more grinding alone in frustrating, toxic solo lobbies. ATE connects ambitious gamers with reliable, respectful, and goal-oriented teammates who play to win together.
3. **Establishing Alanya as an Esports Capital:** Alanya is globally renowned for its sea, sun, and history; our ambition is to make it equally celebrated as a powerhouse of competitive esports, LAN tournaments, modern training facilities, and championship-tier athletes.
4. **Grassroots to Global Talent Pipeline:** Starting directly with local high schools (Alanya School League) and universities (Alanya Alaaddin Keykubat University & Alanya University), we scout undiscovered gems, mentor them through our academy tracks, and elevate them into official competitive rosters.

---

## 🔥 Why Alanya Taudra Esports?

| The Traditional Casual Experience | The ATE Digital Arena Advantage |
| :--- | :--- |
| ❌ Toxic, uncoordinated random teammates |  Verified, motivated peers with shared championship ambitions |
| ❌ Unrecognized hours of grinding | 🏆 Official ATE ID, career match archives, achievement badges |
| ❌ Solo players with zero path to pro | 🔍 Direct scouting by Team Captains, Game Leaders, and Admins |
| ❌ Chaotic, unregulated chat groups | 🛡️ Structured rosters, transparent rulebooks, and 24/7 audit logs |
| ❌ Disconnected from academic life | 🎓 Official Alanya School League endorsed by regional schools |

---

## 🏟️ ATE Digital Arena Platform Architecture

ATE Digital Arena is far beyond a simple club webpage; it is a **comprehensive digital operating system engineered specifically for end-to-end competitive esports operations.**

```
                            ┌────────────────────────────┐
                            │   ATE DIGITAL ARENA CORE   │
                            └─────────────┬──────────────┘
                                          │
       ┌─────────────────┬────────────────┼────────────────┬─────────────────┐
       ▼                 ▼                ▼                ▼                 ▼
 ┌───────────┐    ┌─────────────┐   ┌───────────┐    ┌────────────┐    ┌───────────┐
 │  ATE ID   │    │  COMMUNITY  │   │  OFFICIAL │    │ TOURNAMENT │    │  CAMPUS   │
 │ IDENTITY  │    │  GAME CREWS │   │   TEAMS   │    │  & EVENTS  │    │ & SCHOOLS │
 │  ENGINE   │    │  & LEADERS  │   │ & CAPTAIN │    │   ENGINE   │    │  LEAGUE   │
 └───────────┘    └─────────────┘   └───────────┘    └────────────┘    └───────────┘
```

### 1. ATE Identity & Athlete Passport (ATE ID)
* **Unique Athlete Identifier:** Every member receives an official, serialized ATE ID upon registration (e.g., `ATE-0725-00042`).
* **Built-in Circular Image Cropper (Canvas Engine):** Upload any portrait, widescreen, or square photo; our interactive native cropper enables pan, zoom (1.0x to 3.0x), and auto-centering, exporting crisp 512x512 circular profile avatars.
* **Multi-Game Verified Profiles:** Centralize verified in-game names (IGN) across titles like Valorant, CS2, League of Legends, Mobile Legends, and EA Sports FC.
* **Privacy-First Controls:** Players configure contact and Discord visibility (Public, Teammates Only, or Private) to maintain personal security.

### 2. Game Community Crews & Leadership
* Dedicated community hubs for all competitive titles: Valorant Crew, CS2 Crew, LoL Crew, EA Sports FC Crew, Mobile Legends Crew, and more.
* Steered by appointed **Game Leaders** who coordinate weekly practice sessions, internal scrims, and meta strategy roundtables.

### 3. Official Competitive Teams & Captaincy
* Elite rosters proudly representing Alanya Taudra Esports in regional, national, and international tournaments.
* **The Single-Captain Rule:** System-enforced single captain per team ensures clear leadership, tactical ownership, and accountability. Captains review tryout applications and manage roster lineups.
* **Dynamic Recruitment Pool:** When teams open recruitment, players submit one-click applications with their verified ranks and game history.

### 4. Tournament & Event Engine
* Supports Single Elimination, Double Elimination, and Round-Robin group stages.
* Real-time automated bracket progression, live match scores, prize pool transparency, and official rulebook integration.
* Full support for both online tournaments and offline LAN arenas.

### 5. Alanya School League & Collegiate Esports
* Tailored competitive divisions for high schools across Alanya, alongside university divisions for ALKÜ and Alanya University.
* Dedicated campus representatives drive high school rivalries into structured, positive, and educational esports battles.

### 6. Real-Time Audit Engine & System Administration
* **Live System Audit Logs (`AuditLog`):** Every administrative action (role assignment, user deletion, team updates, setting changes, registrations) is recorded in real time with actor timestamps and client IP addresses.
* **Persistent Platform Controls:** Super Admins toggle **Maintenance Mode**, freeze/resume new user registrations, and update platform configuration directly saved to the PostgreSQL database with instant revalidation.

---

## 👑 Roles & Ecosystem Hierarchy

```mermaid
graph TD
    SA["👑 Founder & Super Admin<br/>(Full Platform Authority, Audit Logs, Core Settings)"]
    ADM["🛡️ Admin & Moderator<br/>(Tournaments, Content, Dispute & Application Reviews)"]
    GL["🎮 Game Leader<br/>(Title-Specific Crew Management & Scrim Organization)"]
    CAP["⚔️ Team Captain<br/>(Roster Lineups & Tactical Team Management)"]
    REP["🎓 Campus & School Representative<br/>(Collegiate & High School Coordination)"]
    PLY["🎯 Verified Athlete / Player<br/>(Active Roster Competitor)"]
    USR["🌟 Community Member<br/>(Participating in Open Scrims & Fan Events)"]

    SA --> ADM
    ADM --> GL
    ADM --> REP
    GL --> CAP
    CAP --> PLY
    PLY --> USR
```

---

## 🚀 Join the Movement: Step Into the Arena

If you refuse to settle for mediocrity and want to compete shoulder-to-shoulder with athletes who share your drive, your journey starts here:

1. **Create Your Account:** Register at [`/register`](https://atedigitalarena.com/register) to claim your unique **ATE ID**.
2. **Tune Your Profile:** Use the built-in circular avatar cropper, declare your favorite titles, and choose your competitive focus.
3. **Join a Crew:** Connect with your title's Game Leader and squad up with vetted teammates in Discord.
4. **Earn Your Jersey:** Dominate in scrims, impress team captains, and claim your spot on an official ATE tournament roster!

> 🏆 **"Remember: Championships are never won alone; they are conquered by those united under a single purpose."**

---

## 💻 Technical Architecture & Tech Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js 15 (App Router)** | React Server Components (RSC), Turbopack compiler, Streaming SSR |
| **Core UI Library** | **React 19** | Concurrent features, modern server and client actions |
| **Styling & Theme** | **Tailwind CSS v4** | Custom ATE signature dark theme with `#D00000` / `#FF1F2D` crimson accents |
| **Iconography** | **Lucide React** | Ultra-lightweight, customizable SVG icon set |
| **Database** | **PostgreSQL** | High-performance relational database storage |
| **ORM & Data Layer** | **Prisma ORM** | Type-safe schema migrations, relations, and query builder |
| **Authentication** | **Custom JWT Sessions** | HTTP-only secure cookie sessions with bcrypt password hashing |
| **Image Processing** | **Native HTML5 Canvas** | High-fidelity 512x512 client-side transformation with zero external baggage |

---

## 🛠️ Developer Installation & Quickstart

Follow these steps to run ATE Digital Arena locally:

### 1. Clone the Repository
```bash
git clone https://github.com/ersinsandal/Alanya-Taudra-Esports.git
cd Alanya-Taudra-Esports/ate-digital-arena
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and specify your PostgreSQL connection string:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/atedb?schema=public"
SESSION_SECRET="your-super-secure-random-string-min-32-chars"
```

### 4. Database Setup & Seeding
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

### 5. Launch Development Server
```bash
npm run dev
```
Open [`http://localhost:3000`](http://localhost:3000) in your browser to explore the arena.

---

## 📞 Contact & Community Links

- 🌐 **Official Website:** [atedigitalarena.com](https://atedigitalarena.com)
- 💬 **Discord Community:** [discord.gg/atedigitalarena](https://discord.gg/atedigitalarena)
- 📸 **Instagram:** [@atearena](https://instagram.com/atearena)
- 🐦 **X (Twitter):** [@atearena](https://twitter.com/atearena)
- ✉️ **Business & Partnerships:** [contact@atedigitalarena.com](mailto:contact@atedigitalarena.com)

---

<p align="center">
  <strong>© 2026 Alanya Taudra Esports (ATE). All Rights Reserved.</strong><br />
  <em>Engineered with heart and competitive fury in Alanya.</em>
</p>
