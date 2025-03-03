export interface AdminCardProps {
  userName: string;
  avatarUrl?: string;
  adminId: number;
}

export interface AdminList {
  adminId: number;
  userId: number;
  userName: string;
}

export interface Admin {
  adminId: number;
  userId: number;
  userName: string;
  avatarUrl?: string;
}