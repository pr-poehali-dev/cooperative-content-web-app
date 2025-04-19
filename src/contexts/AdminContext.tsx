import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { AuditLog, SiteStats, UserRole } from "@/types";

interface AdminContextType {
  auditLogs: AuditLog[];
  siteStats: SiteStats | null;
  isLoading: boolean;
  error: string | null;
  fetchAuditLogs: () => Promise<void>;
  fetchSiteStats: () => Promise<void>;
  addAuditLog: (log: Omit<AuditLog, "id" | "timestamp">) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Имитация данных аудит-логов для демонстрации
const mockAuditLogs: AuditLog[] = [
  {
    id: "1",
    action: "LOGIN",
    userId: "1",
    username: "admin",
    userRole: UserRole.ADMIN,
    timestamp: "2024-04-15T08:30:00Z",
    ipAddress: "192.168.1.1",
    details: "Успешный вход в систему"
  },
  {
    id: "2",
    action: "CREATE_NEWS",
    userId: "1",
    username: "admin",
    userRole: UserRole.ADMIN,
    timestamp: "2024-04-15T09:15:00Z",
    ipAddress: "192.168.1.1",
    details: "Создана новость ID:1 'Новая линейка профнастила МП-20 с повышенной прочностью'"
  },
  {
    id: "3",
    action: "LOGIN",
    userId: "2",
    username: "partner",
    userRole: UserRole.PARTNER,
    timestamp: "2024-04-15T10:00:00Z",
    ipAddress: "192.168.1.2",
    details: "Успешный вход в систему"
  },
  {
    id: "4",
    action: "CREATE_NEWS",
    userId: "2",
    username: "partner",
    userRole: UserRole.PARTNER,
    timestamp: "2024-04-15T10:30:00Z",
    ipAddress: "192.168.1.2",
    details: "Создана новость ID:2 'Открытие нового центра дистрибуции в Казани'"
  },
  {
    id: "5",
    action: "LOGIN",
    userId: "3",
    username: "client",
    userRole: UserRole.CLIENT,
    timestamp: "2024-04-15T11:20:00Z",
    ipAddress: "192.168.1.3",
    details: "Успешный вход в систему"
  },
  {
    id: "6",
    action: "ADD_COMMENT",
    userId: "3",
    username: "client",
    userRole: UserRole.CLIENT,
    timestamp: "2024-04-15T11:30:00Z",
    ipAddress: "192.168.1.3",
    details: "Добавлен комментарий к новости ID:1"
  },
  {
    id: "7",
    action: "APPROVE_COMMENT",
    userId: "1",
    username: "admin",
    userRole: UserRole.ADMIN,
    timestamp: "2024-04-15T12:00:00Z",
    ipAddress: "192.168.1.1",
    details: "Одобрен комментарий ID:101 к новости ID:1"
  }
];

// Имитация статистики сайта для демонстрации
const mockSiteStats: SiteStats = {
  totalVisits: 1247,
  uniqueVisitors: 845,
  pageViews: 3680,
  averageTimeOnSite: "3m 45s",
  topPages: [
    { page: "Главная", views: 1200 },
    { page: "Новости", views: 850 },
    { page: "Контакты", views: 520 },
    { page: "О компании", views: 480 },
    { page: "Каталог", views: 430 }
  ],
  visitsByDay: [
    { date: "2024-04-09", visits: 120 },
    { date: "2024-04-10", visits: 140 },
    { date: "2024-04-11", visits: 135 },
    { date: "2024-04-12", visits: 160 },
    { date: "2024-04-13", visits: 180 },
    { date: "2024-04-14", visits: 190 },
    { date: "2024-04-15", visits: 210 }
  ]
};

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [siteStats, setSiteStats] = useState<SiteStats | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAuditLogs = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Имитация задержки сетевого запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAuditLogs(mockAuditLogs);
    } catch (err) {
      setError("Ошибка при загрузке аудит-логов");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSiteStats = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Имитация задержки сетевого запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSiteStats(mockSiteStats);
    } catch (err) {
      setError("Ошибка при загрузке статистики сайта");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const addAuditLog = async (log: Omit<AuditLog, "id" | "timestamp">) => {
    try {
      const newLog: AuditLog = {
        id: Math.random().toString(36).substring(2, 9),
        ...log,
        timestamp: new Date().toISOString()
      };
      
      setAuditLogs(prevLogs => [newLog, ...prevLogs]);
      
      // Обновление в моковых данных
      mockAuditLogs.unshift(newLog);
    } catch (err) {
      console.error("Ошибка при добавлении аудит-лога:", err);
    }
  };

  useEffect(() => {
    fetchAuditLogs();
    fetchSiteStats();
  }, []);

  const value = {
    auditLogs,
    siteStats,
    isLoading,
    error,
    fetchAuditLogs,
    fetchSiteStats,
    addAuditLog
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
