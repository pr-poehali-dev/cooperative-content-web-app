import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNews } from "@/contexts/NewsContext";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types";
import { MessageSquare, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function NewsPage() {
  const { news, isLoading } = useNews();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNews, setFilteredNews] = useState(news);
  
  useEffect(() => {
    // Фильтрация новостей при изменении поискового запроса
    if (news.length > 0) {
      const filtered = news.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredNews(filtered);
    }
  }, [news, searchQuery]);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Новости компании</h1>
          <p className="text-gray-500 mt-1">
            Актуальная информация о компании, новинках продукции и мероприятиях
          </p>
        </div>
        
        {user && (user.role === UserRole.ADMIN || user.role === UserRole.PARTNER) && (
          <Button asChild>
            <Link to="/news/create">
              <Plus className="h-4 w-4 mr-2" />
              Добавить новость
            </Link>
          </Button>
        )}
      </div>
      
      <div className="mb-6">
        <div className="relative max-w-lg">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Поиск по новостям..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden animate-pulse">
              <div className="aspect-video bg-muted" />
              <CardHeader className="pb-2">
                <div className="h-4 w-24 bg-muted rounded" />
                <div className="h-6 w-full bg-muted rounded" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-16 w-full bg-muted rounded" />
                <div className="h-10 w-24 bg-muted rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative">
                <img 
                  src={item.imageUrl || "/placeholder.svg"} 
                  alt={item.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                  <span>{formatDate(item.createdAt)}</span>
                  •
                  <span className="flex items-center">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    {item.comments.length}
                  </span>
                </div>
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="line-clamp-2">
                  {item.content}
                </CardDescription>
                
                {item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center rounded-full bg-metalprofile-accent px-2 py-1 text-xs font-medium text-metalprofile-primary"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <Button variant="outline" asChild>
                  <Link to={`/news/${item.id}`}>Подробнее</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium">Новости не найдены</h3>
          <p className="text-gray-500 mt-2">
            Попробуйте изменить поисковый запрос или проверьте позднее
          </p>
        </div>
      )}
    </div>
  );
}
