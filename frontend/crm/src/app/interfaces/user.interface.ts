export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends Omit<User, 'password'> {
  fullName: string;
}

export type UserRole = 'admin' | 'user' | 'moderator';

export interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
  emailNotifications: boolean;
}