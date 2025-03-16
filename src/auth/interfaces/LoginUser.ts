export interface LoginUser {
  token: string;
  user: {
    userId: number;
    username: string;
    email: string;
    isStreamer: boolean;
    streamerId?: number | null;
    adminId?: number | null;
  };
}
