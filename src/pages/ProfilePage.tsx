import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types";
import { Calendar, Mail, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  if (!user) {
    navigate("/login");
    return null;
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  const getRoleName = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return "Администратор";
      case UserRole.PARTNER:
        return "Партнер";
      case UserRole.CLIENT:
        return "Клиент";
      default:
        return "Неизвестная роль";
    }
  };
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Личный кабинет</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl">Профиль</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
              <AvatarFallback className="text-xl">
                {user.firstName && user.lastName
                  ? `${user.firstName[0]}${user.lastName[0]}`
                  : user.username.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <h2 className="text-xl font-bold">
              {user.firstName && user.lastName
                ? `${user.firstName} ${user.lastName}`
                : user.username}
            </h2>
            
            {user.patronymic && (
              <p className="text-gray-500">{user.patronymic}</p>
            )}
            
            <div className="mt-4 flex flex-col gap-2 w-full">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-gray-500" />
                <span>{user.username}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-gray-500" />
                <span>{user.email}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-metalprofile-primary text-[10px] font-bold text-white">
                  {user.role.charAt(0).toUpperCase()}
                </div>
                <span>{getRoleName(user.role)}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>Дата регистрации: {formatDate(user.createdAt)}</span>
              </div>
            </div>
            
            <Button 
              className="mt-6 w-full"
              variant="outline"
              onClick={() => navigate("/profile/settings")}
            >
              <Settings className="h-4 w-4 mr-2" />
              Настройки профиля
            </Button>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl">Активность</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {user.role === UserRole.ADMIN && (
                <div>
                  <h3 className="font-medium mb-3">Административные функции:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      className="justify-start"
                      onClick={() => navigate("/admin")}
                    >
                      Панель администратора
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start"
                      onClick={() => navigate("/admin/users")}
                    >
                      Управление пользователями
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start"
                      onClick={() => navigate("/admin/audit-logs")}
                    >
                      Аудит-логи
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start"
                      onClick={() => navigate("/admin/statistics")}
                    >
                      Статистика сайта
                    </Button>
                  </div>
                </div>
              )}
              
              {(user.role === UserRole.ADMIN || user.role === UserRole.PARTNER) && (
                <div>
                  <h3 className="font-medium mb-3">Управление контентом:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      className="justify-start"
                      onClick={() => navigate("/news/create")}
                    >
                      Создать новость
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start"
                      onClick={() => navigate("/news/my")}
                    >
                      Мои публикации
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start"
                      onClick={() => navigate("/comments/moderation")}
                    >
                      Модерация комментариев
                    </Button>
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="font-medium mb-3">Общие функции:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="justify-start"
                    onClick={() => navigate("/news")}
                  >
                    Просмотр новостей
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start"
                    onClick={() => navigate("/catalog")}
                  >
                    Каталог продукции
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
