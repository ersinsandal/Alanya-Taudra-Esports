# Alanya Taudra Esports (ATE) Digital Arena

![ATE Digital Arena](https://via.placeholder.com/1200x400/050505/D00000?text=ATE+DIGITAL+ARENA)

> **"THEY PLAYED, WE ATE."**  
> *From Alanya to the Arena — The Unified Digital Infrastructure for Competitive Gaming & Talent Discovery.*

Read this in another language:  
🇹🇷 [Türkçe Dokümantasyon (README.tr.md)](./README.tr.md)

---

## 📌 Executive Summary

ATE Digital Arena is a full-scale competitive e-sports platform developed for **Alanya Taudra Esports**. Built with cutting-edge web technologies, it serves as a central hub for players, teams, university leagues, and administrators. 

The platform seamlessly integrates team management, real-time notifications, privacy-aware social profiles, comprehensive admin dashboards, and dynamic event/scrim scheduling.

## 🚀 Key Features

### 👤 Player & Social Hub
- **Dynamic User Profiles:** Track achievements, match history, and registered game IDs (Valorant, CS2, LoL, etc.).
- **Privacy-Aware Settings:** Users can configure visibility rules for their Discord and phone numbers (e.g., public, teammates only, or private).
- **Automated Progression:** Platform activities automatically grant points and achievements.

### 🎮 Team & Crew Management
- **Game Crews:** Dedicated community branches for major titles (Valorant, CS2, League of Legends, EA FC, etc.).
- **Application System:** Automated application and review pipeline for aspiring Crew Leaders and Team Members.
- **Scrims & Matches:** Schedule practice matches (scrims) and track official tournament standings.

### 🔔 Real-Time Notifications
- **In-App Alerts:** Receive instant notifications when team applications are approved/rejected or when tournaments are about to start.
- **Smart Inbox:** Filter, read, and manage all platform alerts directly from the navbar dropdown.

### 🛡️ Comprehensive Admin Panel
- **Data-Driven Dashboard:** Real-time metrics on user growth, match outcomes, and active applications.
- **Report & Moderation System:** Centralized queue to resolve user disputes, profile name change requests, and toxicity reports.
- **Role-Based Access Control:** Distinct capabilities for Moderators, Admins, and Super Admins.

## 🛠️ Technology Stack

- **Framework:** Next.js 15 (App Router, Server Components, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4, Lucide React Icons
- **Database:** PostgreSQL
- **ORM:** Prisma
- **UI Components:** Radix UI primitives & Custom Design System (Space Grotesk + Inter)

## 📦 Local Installation

1. **Clone the repository:**
   \\\ash
   git clone https://github.com/ersinsandal/Alanya-Taudra-Esports.git
   cd Alanya-Taudra-Esports
   \\\

2. **Install dependencies:**
   \\\ash
   npm install
   \\\

3. **Environment Setup:**
   Create a \.env\ file in the root directory and add your PostgreSQL connection string:
   \\\env
   DATABASE_URL="postgresql://user:password@localhost:5432/atedb"
   \\\

4. **Database Migration & Seeding:**
   \\\ash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   \\\

5. **Run the development server:**
   \\\ash
   npm run dev
   \\\
   Visit \http://localhost:3000\ to view the application.

## 📄 License
All rights reserved by Alanya Taudra Esports.
