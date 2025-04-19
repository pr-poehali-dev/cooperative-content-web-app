import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/ui/user-menu";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types";
import { BookOpen, LayoutDashboard, Menu, MenuSquare, News, Plus, UserPlus, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo-b.svg" alt="Металл Профиль" className="h-8" />
            <span className="hidden font-bold sm:inline-block">
              Металл Профиль <span className="text-metalprofile-secondary">Поволжье</span>
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-metalprofile-primary transition-colors">
              Главная
            </Link>
            <Link to="/news" className="text-sm font-medium hover:text-metalprofile-primary transition-colors">
              Новости
            </Link>
            <Link to="/catalog" className="text-sm font-medium hover:text-metalprofile-primary transition-colors">
              Каталог
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-metalprofile-primary transition-colors">
              О компании
            </Link>
            <Link to="/contacts" className="text-sm font-medium hover:text-metalprofile-primary transition-colors">
              Контакты
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          {user && (user.role === UserRole.ADMIN || user.role === UserRole.PARTNER) && (
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden md:flex"
              onClick={() => navigate("/news/create")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Добавить новость
            </Button>
          )}
          
          <div className="hidden md:block">
            <UserMenu />
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Мобильное меню */}
      {isMenuOpen && (
        <div className="md:hidden border-t p-4 bg-background animate-fade-in">
          <div className="grid grid-cols-1 gap-4">
            <Link 
              to="/"
              className="flex items-center gap-2 p-2 hover:bg-accent rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Главная</span>
            </Link>
            <Link 
              to="/news"
              className="flex items-center gap-2 p-2 hover:bg-accent rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              <News className="h-4 w-4" />
              <span>Новости</span>
            </Link>
            <Link 
              to="/catalog"
              className="flex items-center gap-2 p-2 hover:bg-accent rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              <MenuSquare className="h-4 w-4" />
              <span>Каталог</span>
            </Link>
            <Link 
              to="/about"
              className="flex items-center gap-2 p-2 hover:bg-accent rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              <BookOpen className="h-4 w-4" />
              <span>О компании</span>
            </Link>
            
            {user && (user.role === UserRole.ADMIN || user.role === UserRole.PARTNER) && (
              <Link 
                to="/news/create"
                className="flex items-center gap-2 p-2 hover:bg-accent rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <Plus className="h-4 w-4" />
                <span>Добавить новость</span>
              </Link>
            )}
            
            {!user && (
              <>
                <Link 
                  to="/login"
                  className="flex items-center gap-2 p-2 hover:bg-accent rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Войти</span>
                </Link>
                <Link 
                  to="/register"
                  className="w-full rounded-md bg-metalprofile-primary p-2 text-center text-white hover:bg-metalprofile-primary/90"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Регистрация
                </Link>
              </>
            )}
            
            {user && (
              <div className="mt-2 pt-2 border-t">
                <UserMenu />
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
