export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  patronymic?: string;
  role: UserRole;
  createdAt: string;
  avatar?: string;
}

export enum UserRole {
  ADMIN = "admin",
  PARTNER = "partner",
  CLIENT = "client"
}

export interface News {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  createdAt: string;
  isApproved: boolean;
  newsId: string;
}

export interface AuditLog {
  id: string;
  action: string;
  userId: string;
  username: string;
  userRole: UserRole;
  timestamp: string;
  ipAddress: string;
  details: string;
}

export interface SiteStats {
  totalVisits: number;
  uniqueVisitors: number;
  pageViews: number;
  averageTimeOnSite: string;
  topPages: Array<{page: string, views: number}>;
  visitsByDay: Array<{date: string, visits: number}>;
}
