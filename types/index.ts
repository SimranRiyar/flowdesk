export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  revenue: number;
  growth: number;
}