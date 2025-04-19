import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";

export default function ProfileSettingsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [patronymic, setPatronymic] = useState(user?.patronymic || "");
  const [email, setEmail] = useState(user?.email || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  if (!user) {
    navigate("/login");
    return null;
  }
  
  const handleSaveProfile = async () => {
    setIsSubmitting(true);
    
    // Имитация сохранения профиля
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Профиль обновлен",
      description: "Ваши данные были успешно сохранены.",
    });
    
    setIsSubmitting(false);
  };
  
  const handleChangePassword = async () => {
    toast({
      title: "Функция в разработке",
      description: "Смена пароля временно недоступна.",
    });
  };
  
  return (
    <div className="container py-8">
      <Button variant="outline" asChild className="mb-4">
        <Link to="/profile">
          <ChevronLeft className="h-4 w-4 mr-2" />
          К профилю
        </Link>
      </Button>
      
      <h1 className="text-3xl font-bold tracking-tight mb-6">Настройки профиля</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Основная информация</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Имя</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Иван"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Фамилия</Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Иванов"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="patronymic">Отчество</Label>
                <Input
                  id="patronymic"
                  value={patronymic}
                  onChange={(e) => setPatronymic(e.target.value)}
                  placeholder="Иванович"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Имя пользователя</Label>
                <Input
                  value={user.username}
                  disabled
                  className="bg-gray-50"
                />
                <p className="text-xs text-gray-500">Имя пользователя нельзя изменить</p>
              </div>
              
              <Button onClick={handleSaveProfile} disabled={isSubmitting}>
                {isSubmitting ? "Сохранение..." : "Сохранить изменения"}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Аватар профиля</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
                <AvatarFallback className="text-xl">
                  {user.firstName && user.lastName
                    ? `${user.firstName[0]}${user.lastName[0]}`
                    : user.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="w-full space-y-2">
                <Button variant="outline" className="w-full">
                  Загрузить фото
                </Button>
                <Button variant="ghost" className="w-full text-destructive">
                  Удалить фото
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Безопасность</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleChangePassword}
              >
                Сменить пароль
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
              >
                Настройки приватности
              </Button>
              
              <Button 
                variant="destructive" 
                className="w-full"
              >
                Удалить аккаунт
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
