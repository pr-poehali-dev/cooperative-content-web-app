import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useAdmin } from "@/contexts/AdminContext";
import { UserRole } from "@/types";
import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useAuth();
  const { addAuditLog } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      await login(username, password);
      
      // Успешный вход - добавляем запись в аудит-лог
      const user = { username, role: UserRole.CLIENT }; // Временно, пока не получим настоящие данные
      await addAuditLog({
        action: "LOGIN",
        userId: "user_id", // Временно
        username: user.username,
        userRole: user.role,
        ipAddress: "127.0.0.1", // В реальном приложении получали бы с сервера
        details: "Успешный вход в систему"
      });
      
      navigate("/");
    } catch (error) {
      console.error("Ошибка входа:", error);
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-[80vh] py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Вход в систему</CardTitle>
          <CardDescription className="text-center">
            Введите свои данные для входа
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="username">Имя пользователя</Label>
                <Input
                  id="username"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Пароль</Label>
                  <Link to="/forgot-password" className="text-xs text-metalprofile-primary hover:underline">
                    Забыли пароль?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Вход..." : "Войти"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="text-center text-sm text-gray-500">
            Нет аккаунта?{" "}
            <Link to="/register" className="text-metalprofile-primary hover:underline">
              Зарегистрироваться
            </Link>
          </p>
          
          <div className="mt-4 text-xs text-gray-500">
            <p>Демо аккаунты для тестирования:</p>
            <ul className="mt-1 grid grid-cols-3 gap-2">
              <li>
                <strong>Админ:</strong> admin / admin123
              </li>
              <li>
                <strong>Партнер:</strong> partner / partner123
              </li>
              <li>
                <strong>Клиент:</strong> client / client123
              </li>
            </ul>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
