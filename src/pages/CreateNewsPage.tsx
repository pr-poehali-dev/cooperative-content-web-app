import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNews } from "@/contexts/NewsContext";
import { useAuth } from "@/contexts/AuthContext";
import { useAdmin } from "@/contexts/AdminContext";
import { UserRole } from "@/types";
import { ChevronLeft } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export default function CreateNewsPage() {
  const { user } = useAuth();
  const { createNews } = useNews();
  const { addAuditLog } = useAdmin();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("/placeholder.svg");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  useEffect(() => {
    // Проверка прав доступа
    if (!user || (user.role !== UserRole.ADMIN && user.role !== UserRole.PARTNER)) {
      navigate("/");
    }
  }, [user]);
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!title.trim() || !content.trim()) {
      setError("Пожалуйста, заполните заголовок и содержание новости");
      return;
    }
    
    // Разбиваем строку тегов на массив
    const tagsArray = tags
      .split(",")
      .map(tag => tag.trim())
      .filter(Boolean);
    
    setIsSubmitting(true);
    
    try {
      if (user) {
        await createNews({
          title,
          content,
          imageUrl,
          authorId: user.id,
          authorName: `${user.firstName} ${user.lastName}` || user.username,
          authorRole: user.role,
          tags: tagsArray
        });
        
        // Добавляем запись в аудит-лог
        await addAuditLog({
          action: "CREATE_NEWS",
          userId: user.id,
          username: user.username,
          userRole: user.role,
          ipAddress: "127.0.0.1",
          details: `Создана новость '${title}'`
        });
        
        navigate("/news");
      }
    } catch (err) {
      setError("Ошибка при создании новости. Пожалуйста, попробуйте позже.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container py-8">
      <Button variant="outline" asChild className="mb-4">
        <Link to="/news">
          <ChevronLeft className="h-4 w-4 mr-2" />
          К списку новостей
        </Link>
      </Button>
      
      <h1 className="text-3xl font-bold tracking-tight mb-6">Создание новости</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Создать новую публикацию</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="title">Заголовок</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Введите заголовок новости"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Содержание</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Введите содержание новости"
                className="min-h-[200px]"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="imageUrl">URL изображения (опционально)</Label>
              <Input
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-xs text-gray-500">Оставьте пустым для использования изображения-заполнителя</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tags">Теги (через запятую)</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="новость, продукт, мероприятие"
              />
            </div>
            
            <div className="flex gap-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Создание..." : "Создать новость"}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate("/news")}>
                Отмена
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
