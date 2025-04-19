import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNews } from "@/contexts/NewsContext";
import { useAuth } from "@/contexts/AuthContext";
import { useAdmin } from "@/contexts/AdminContext";
import { UserRole } from "@/types";
import { 
  AlertTriangle, 
  Calendar, 
  ChevronLeft, 
  Edit, 
  MessageSquare, 
  Trash, 
  User 
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { news, getNewsById, addComment, updateNews, approveComment, deleteComment } = useNews();
  const { user } = useAuth();
  const { addAuditLog } = useAdmin();
  const navigate = useNavigate();
  
  const [newsItem, setNewsItem] = useState(getNewsById(id || ""));
  const [commentContent, setCommentContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editTags, setEditTags] = useState("");
  
  useEffect(() => {
    if (news.length > 0 && id) {
      const foundNews = getNewsById(id);
      setNewsItem(foundNews);
      
      if (foundNews) {
        setEditTitle(foundNews.title);
        setEditContent(foundNews.content);
        setEditTags(foundNews.tags.join(", "));
      }
    }
  }, [news, id]);
  
  if (!newsItem) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Новость не найдена</h1>
        <p className="text-gray-500 mb-6">
          Запрашиваемая новость не существует или была удалена
        </p>
        <Button asChild>
          <Link to="/news">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Вернуться к списку новостей
          </Link>
        </Button>
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  const handleSubmitComment = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      navigate("/login");
      return;
    }
    
    if (!commentContent.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      await addComment(newsItem.id, {
        content: commentContent,
        authorId: user.id,
        authorName: `${user.firstName} ${user.lastName}` || user.username,
        authorRole: user.role
      });
      
      // Добавляем запись в аудит-лог
      await addAuditLog({
        action: "ADD_COMMENT",
        userId: user.id,
        username: user.username,
        userRole: user.role,
        ipAddress: "127.0.0.1",
        details: `Добавлен комментарий к новости ID:${newsItem.id}`
      });
      
      setCommentContent("");
    } catch (error) {
      console.error("Ошибка при добавлении комментария:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleApproveComment = async (commentId: string) => {
    try {
      await approveComment(newsItem.id, commentId);
      
      if (user) {
        // Добавляем запись в аудит-лог
        await addAuditLog({
          action: "APPROVE_COMMENT",
          userId: user.id,
          username: user.username,
          userRole: user.role,
          ipAddress: "127.0.0.1",
          details: `Одобрен комментарий ID:${commentId} к новости ID:${newsItem.id}`
        });
      }
    } catch (error) {
      console.error("Ошибка при одобрении комментария:", error);
    }
  };
  
  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(newsItem.id, commentId);
      
      if (user) {
        // Добавляем запись в аудит-лог
        await addAuditLog({
          action: "DELETE_COMMENT",
          userId: user.id,
          username: user.username,
          userRole: user.role,
          ipAddress: "127.0.0.1",
          details: `Удален комментарий ID:${commentId} к новости ID:${newsItem.id}`
        });
      }
    } catch (error) {
      console.error("Ошибка при удалении комментария:", error);
    }
  };
  
  const handleSaveEdit = async () => {
    try {
      const tagsArray = editTags.split(",").map(tag => tag.trim()).filter(Boolean);
      
      await updateNews(newsItem.id, {
        title: editTitle,
        content: editContent,
        tags: tagsArray
      });
      
      if (user) {
        // Добавляем запись в аудит-лог
        await addAuditLog({
          action: "EDIT_NEWS",
          userId: user.id,
          username: user.username,
          userRole: user.role,
          ipAddress: "127.0.0.1",
          details: `Отредактирована новость ID:${newsItem.id}`
        });
      }
      
      setEditMode(false);
    } catch (error) {
      console.error("Ошибка при редактировании новости:", error);
    }
  };
  
  const canEditNews = user && (
    user.role === UserRole.ADMIN || 
    (user.role === UserRole.PARTNER && user.id === newsItem.authorId)
  );
  
  const canModerateComments = user && (
    user.role === UserRole.ADMIN || 
    (user.role === UserRole.PARTNER && user.id === newsItem.authorId)
  );
  
  return (
    <div className="container py-8">
      <div className="mb-6">
        <Button variant="outline" asChild className="mb-4">
          <Link to="/news">
            <ChevronLeft className="h-4 w-4 mr-2" />
            К списку новостей
          </Link>
        </Button>
        
        {editMode ? (
          <div className="space-y-4">
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="text-2xl font-bold"
            />
            
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="min-h-[200px]"
            />
            
            <div>
              <label className="block text-sm font-medium mb-1">Теги (через запятую)</label>
              <Input
                value={editTags}
                onChange={(e) => setEditTags(e.target.value)}
                placeholder="новость, продукт, мероприятие"
              />
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleSaveEdit}>Сохранить</Button>
              <Button variant="outline" onClick={() => setEditMode(false)}>Отмена</Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-start mb-2">
              <h1 className="text-3xl font-bold tracking-tight">{newsItem.title}</h1>
              
              {canEditNews && (
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setEditMode(true)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <div className="flex items-center text-sm text-gray-500 gap-4 mb-6">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(newsItem.createdAt)}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{newsItem.authorName}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>{newsItem.comments.filter(c => c.isApproved).length} комментариев</span>
              </div>
            </div>
            
            {newsItem.imageUrl && (
              <img 
                src={newsItem.imageUrl}
                alt={newsItem.title}
                className="w-full h-auto max-h-[400px] object-cover rounded-lg mb-6"
              />
            )}
            
            <div className="prose max-w-none">
              <p>{newsItem.content}</p>
            </div>
            
            {newsItem.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {newsItem.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center rounded-full bg-metalprofile-accent px-2 py-1 text-xs font-medium text-metalprofile-primary"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      
      <Separator className="my-8" />
      
      <div>
        <h2 className="text-xl font-bold mb-6">Комментарии</h2>
        
        {user ? (
          <form onSubmit={handleSubmitComment} className="mb-8">
            <Textarea
              placeholder="Оставьте свой комментарий..."
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              className="resize-none mb-2"
            />
            
            {user.role === UserRole.CLIENT && (
              <Alert className="mb-2">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Ваш комментарий будет опубликован после проверки модератором
                </AlertDescription>
              </Alert>
            )}
            
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Отправка..." : "Отправить комментарий"}
            </Button>
          </form>
        ) : (
          <div className="bg-accent p-4 rounded-lg mb-8">
            <p className="text-center">
              <Link to="/login" className="text-metalprofile-primary font-medium hover:underline">
                Войдите
              </Link>{" "}
              или{" "}
              <Link to="/register" className="text-metalprofile-primary font-medium hover:underline">
                зарегистрируйтесь
              </Link>{" "}
              чтобы оставить комментарий
            </p>
          </div>
        )}
        
        {/* Комментарии, ожидающие модерации (видны только модераторам) */}
        {canModerateComments && newsItem.comments.some(c => !c.isApproved) && (
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Ожидают одобрения</h3>
            
            <div className="space-y-4">
              {newsItem.comments
                .filter(c => !c.isApproved)
                .map(comment => (
                  <Card key={comment.id} className="p-4 border-dashed border-yellow-500">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg" alt={comment.authorName} />
                          <AvatarFallback>{comment.authorName.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{comment.authorName}</p>
                          <p className="text-xs text-gray-500">{formatDate(comment.createdAt)}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleApproveComment(comment.id)}
                        >
                          Одобрить
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="destructive"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Удалить комментарий?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Это действие нельзя отменить. Комментарий будет безвозвратно удален.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Отмена</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteComment(comment.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Удалить
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                    
                    <p className="text-sm">{comment.content}</p>
                    
                    <div className="mt-2 text-xs text-yellow-600 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      <span>Ожидает одобрения</span>
                    </div>
                  </Card>
                ))
              }
            </div>
          </div>
        )}
        
        {/* Одобренные комментарии */}
        <div className="space-y-4">
          {newsItem.comments.filter(c => c.isApproved).length > 0 ? (
            newsItem.comments
              .filter(c => c.isApproved)
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map(comment => (
                <Card key={comment.id} className="p-4">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" alt={comment.authorName} />
                        <AvatarFallback>{comment.authorName.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{comment.authorName}</p>
                        <p className="text-xs text-gray-500">{formatDate(comment.createdAt)}</p>
                      </div>
                    </div>
                    
                    {canModerateComments && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="ghost"
                          >
                            <Trash className="h-4 w-4 text-gray-500 hover:text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Удалить комментарий?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Это действие нельзя отменить. Комментарий будет безвозвратно удален.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Отмена</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDeleteComment(comment.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Удалить
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                  
                  <p className="text-sm">{comment.content}</p>
                </Card>
              ))
          ) : (
            <p className="text-center text-gray-500 py-4">
              Будьте первым, кто оставит комментарий
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
