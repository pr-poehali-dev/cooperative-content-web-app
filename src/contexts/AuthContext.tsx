import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { User, UserRole } from "@/types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Имитация базы данных пользователей для демонстрации
const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@metalprofile.ru",
    username: "admin",
    firstName: "Администратор",
    lastName: "Системы",
    patronymic: "Петрович",
    role: UserRole.ADMIN,
    createdAt: "2024-01-15T10:00:00Z",
    avatar: "/placeholder.svg"
  },
  {
    id: "2",
    email: "partner@metalprofile.ru",
    username: "partner",
    firstName: "Иван",
    lastName: "Партнеров",
    patronymic: "Сергеевич",
    role: UserRole.PARTNER,
    createdAt: "2024-02-20T14:30:00Z",
    avatar: "/placeholder.svg"
  },
  {
    id: "3",
    email: "client@example.com",
    username: "client",
    firstName: "Мария",
    lastName: "Клиентова",
    patronymic: "Ивановна",
    role: UserRole.CLIENT,
    createdAt: "2024-03-10T09:15:00Z"
  }
];

// Пароли для демонстрации (в реальном приложении должны быть хешированы)
const passwords: Record<string, string> = {
  "admin": "admin123",
  "partner": "partner123",
  "client": "client123"
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Проверка сохраненного пользователя при загрузке
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Имитация задержки сетевого запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = mockUsers.find(u => u.username === username);
      
      if (!user || passwords[username] !== password) {
        throw new Error("Неверное имя пользователя или пароль");
      }
      
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, username: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Имитация задержки сетевого запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Проверка существования пользователя с таким же именем или email
      if (mockUsers.some(u => u.username === username)) {
        throw new Error("Пользователь с таким именем уже существует");
      }
      
      if (mockUsers.some(u => u.email === email)) {
        throw new Error("Пользователь с таким email уже существует");
      }
      
      // Создание нового пользователя (клиента)
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        email,
        username,
        firstName: "",
        lastName: "",
        role: UserRole.CLIENT,
        createdAt: new Date().toISOString()
      };
      
      // В реальном приложении здесь был бы запрос к API
      mockUsers.push(newUser);
      passwords[username] = password;
      
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
