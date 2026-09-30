// ============================================
// ATE Digital Arena — Core Type Definitions
// ============================================

// User types
export interface ATEUser {
  id: string;
  ateId: string;
  email: string;
  username: string;
  status: UserStatus;
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: Date;
  profile?: UserProfile;
  roles?: UserRoleWithRole[];
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  birthDate?: Date | null;
  country: string;
  city?: string | null;
  isAlanya: boolean;
  studentStatus?: StudentStatus | null;
  schoolId?: string | null;
  universityId?: string | null;
  avatarUrl?: string | null;
  bio?: string | null;
  discordUsername?: string | null;
  purpose: string[];
  showAge: boolean;
  showCity: boolean;
  showSchool: boolean;
  showOnlineStatus: boolean;
  showGameProfiles: boolean;
  allowTeamInvites: boolean;
  profileCompleted: boolean;
  completionPct: number;
  school?: School | null;
  university?: University | null;
}

export interface UserRoleWithRole {
  userId: string;
  roleId: string;
  role: {
    name: string;
    displayName: string;
  };
}

// Enums (mirroring Prisma)
export type UserStatus = 'ACTIVE' | 'SUSPENDED' | 'BANNED' | 'DEACTIVATED' | 'DELETED';
export type StudentStatus = 'HIGH_SCHOOL' | 'UNIVERSITY' | 'GRADUATED' | 'WORKING' | 'OTHER';
export type SchoolType = 'PUBLIC' | 'PRIVATE';
export type TeamRole = 'CAPTAIN' | 'PLAYER' | 'SUBSTITUTE' | 'COACH' | 'MANAGER' | 'ANALYST';
export type InviteStatus = 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'EXPIRED';
export type ApplicationStatus = 'SUBMITTED' | 'UNDER_REVIEW' | 'SHORTLISTED' | 'TRYOUT_INVITED' | 'TRYOUT_COMPLETED' | 'INTERVIEW' | 'ACCEPTED' | 'REJECTED' | 'WAITLIST';
export type TournamentFormat = 'SINGLE_ELIMINATION' | 'DOUBLE_ELIMINATION' | 'ROUND_ROBIN' | 'GROUP_PLAYOFFS';
export type TournamentStatus = 'DRAFT' | 'UPCOMING' | 'REGISTRATION_OPEN' | 'CHECK_IN' | 'LIVE' | 'COMPLETED' | 'CANCELLED';
export type MatchStatus = 'SCHEDULED' | 'LIVE' | 'COMPLETED' | 'CANCELLED' | 'POSTPONED';
export type ScrimStatus = 'OPEN' | 'PENDING' | 'ACCEPTED' | 'COMPLETED' | 'CANCELLED';
export type EventType = 'WATCH_PARTY' | 'LAN' | 'MEET_AND_GREET' | 'TOURNAMENT' | 'WORKSHOP' | 'SCHOOL_EVENT' | 'UNIVERSITY_EVENT' | 'SEMINAR' | 'COMMUNITY_MEETUP' | 'TRYOUT_EVENT';
export type NewsCategory = 'ATE' | 'MATCH' | 'TRANSFER' | 'ACADEMY' | 'TOURNAMENT' | 'COMMUNITY' | 'SCHOOL' | 'CAMPUS' | 'ANNOUNCEMENT';
export type MediaType = 'PHOTO' | 'VIDEO' | 'HIGHLIGHT' | 'INTERVIEW' | 'BEHIND_THE_SCENES';
export type ModerationStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'FLAGGED';
export type SponsorTier = 'MAIN_PARTNER' | 'OFFICIAL_PARTNER' | 'TECHNOLOGY_PARTNER' | 'COMMUNITY_PARTNER' | 'LOCAL_PARTNER';
export type SiteMode = 'DEFAULT' | 'MATCH_DAY' | 'LIVE' | 'VICTORY' | 'NEW_SIGNING';
export type PointSource = 'TOURNAMENT_PARTICIPATION' | 'TOURNAMENT_WIN' | 'MVP_AWARD' | 'EVENT_PARTICIPATION' | 'COMMUNITY_CONTRIBUTION' | 'ACADEMY_MILESTONE' | 'ADMIN_VERIFIED' | 'ACHIEVEMENT_EARNED';
export type NotificationType = 'TEAM_INVITE' | 'TEAM_APPLICATION' | 'ACADEMY_UPDATE' | 'TRYOUT' | 'TOURNAMENT' | 'MATCH' | 'EVENT' | 'BADGE' | 'SCHOOL' | 'SYSTEM' | 'ANNOUNCEMENT';
export type GameCategory = 'PC' | 'MOBILE' | 'CONSOLE' | 'CROSS_PLATFORM';

// School
export interface School {
  id: string;
  name: string;
  slug: string;
  code?: string | null;
  type: SchoolType;
  district: string;
  city: string;
  isActive: boolean;
}

// University
export interface University {
  id: string;
  name: string;
  slug: string;
  shortName?: string | null;
  city: string;
  isActive: boolean;
}

// Game
export interface Game {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
  category: GameCategory;
  rankStructure?: RankStructure | null;
  roleOptions?: string[] | null;
  isActive: boolean;
}

export interface RankStructure {
  tiers: string[];
  divisions: string[];
}

// Game Profile
export interface GameProfile {
  id: string;
  userId: string;
  gameId: string;
  inGameName?: string | null;
  currentRank?: string | null;
  peakRank?: string | null;
  mainRole?: string | null;
  secondaryRole?: string | null;
  mainCharacters?: string[] | null;
  lookingForTeam: boolean;
  competitionExperience?: string | null;
  verified: boolean;
  game?: Game;
}

// Team
export interface Team {
  id: string;
  name: string;
  tag: string;
  slug: string;
  gameId: string;
  description?: string | null;
  logoUrl?: string | null;
  isOfficial: boolean;
  isSchoolTeam: boolean;
  isUniversityTeam: boolean;
  isOpen: boolean;
  verified: boolean;
  city?: string | null;
  game?: Game;
  members?: TeamMemberWithUser[];
  _count?: {
    members: number;
  };
}

export interface TeamMemberWithUser {
  id: string;
  role: TeamRole;
  joinedAt: Date;
  user: {
    id: string;
    username: string;
    ateId: string;
    profile?: {
      firstName: string;
      lastName: string;
      avatarUrl?: string | null;
    } | null;
  };
}

// Tournament
export interface Tournament {
  id: string;
  name: string;
  slug: string;
  format: TournamentFormat;
  status: TournamentStatus;
  description?: string | null;
  coverImage?: string | null;
  prizePool?: string | null;
  maxTeams?: number | null;
  startDate: Date;
  endDate?: Date | null;
  game?: Game;
  _count?: {
    teams: number;
  };
}

// Match
export interface Match {
  id: string;
  bestOf: number;
  status: MatchStatus;
  scheduledAt?: Date | null;
  streamUrl?: string | null;
  teamA?: Team;
  teamB?: Team;
  maps?: MatchMap[];
  result?: MatchResult | null;
  tournament?: Tournament | null;
}

export interface MatchMap {
  id: string;
  mapName: string;
  scoreA: number;
  scoreB: number;
  order: number;
}

export interface MatchResult {
  winnerTeamId: string;
  scoreA: number;
  scoreB: number;
}

// Event
export interface ATEEvent {
  id: string;
  title: string;
  slug: string;
  type: EventType;
  description?: string | null;
  date: Date;
  time?: string | null;
  venue?: string | null;
  capacity?: number | null;
  coverImage?: string | null;
  _count?: {
    registrations: number;
  };
}

// News
export interface NewsPost {
  id: string;
  title: string;
  slug: string;
  coverImage?: string | null;
  excerpt?: string | null;
  body: string;
  category: NewsCategory;
  publishDate?: Date | null;
  author?: {
    username: string;
    profile?: {
      firstName: string;
      lastName: string;
      avatarUrl?: string | null;
    } | null;
  };
}

// Achievement
export interface Achievement {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
  description?: string | null;
  category?: string | null;
}

// Sponsor
export interface Sponsor {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string | null;
  tier: SponsorTier;
  website?: string | null;
}

// Notification
export interface ATENotification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string | null;
  link?: string | null;
  isRead: boolean;
  createdAt: Date;
}

// API Response types
export interface ActionResult<T = undefined> {
  success: boolean;
  error?: string;
  data?: T;
}

// Pagination
export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Search
export interface SearchResult {
  type: 'player' | 'team' | 'school' | 'tournament' | 'news' | 'event';
  id: string;
  title: string;
  subtitle?: string;
  imageUrl?: string | null;
  url: string;
}

// Site Settings
export interface SiteSettings {
  logoUrl: string;
  siteName: string;
  siteDescription: string;
  socialLinks: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
    twitch?: string;
    tiktok?: string;
    discord?: string;
  };
  registrationOpen: boolean;
  academyApplicationsOpen: boolean;
  schoolRepApplicationsOpen: boolean;
  maintenanceMode: boolean;
  contactEmail: string;
  contactPhone: string;
}

// Leaderboard
export interface LeaderboardEntry {
  rank: number;
  userId?: string;
  teamId?: string;
  schoolId?: string;
  name: string;
  avatarUrl?: string | null;
  score: number;
  game?: string;
}

// Dashboard Stats
export interface DashboardStats {
  totalMembers: number;
  newMembersThisMonth: number;
  activeMembers: number;
  alanyaMembers: number;
  totalPlayers: number;
  totalTeams: number;
  schoolsRepresented: number;
  academyApplications: number;
  pendingTryouts: number;
  tournamentRegistrations: number;
  eventRegistrations: number;
}
