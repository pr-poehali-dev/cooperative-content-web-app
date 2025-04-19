import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { News, Comment, UserRole } from "@/types";

interface NewsContextType {
  news: News[];
  isLoading: boolean;
  error: string | null;
  fetchNews: () => Promise<void>;
  getNewsById: (id: string) => News | undefined;
  createNews: (newsData: Omit<News, "id" | "createdAt" | "updatedAt" | "comments">) => Promise<void>;
  updateNews: (id: string, newsData: Partial<News>) => Promise<void>;
  addComment: (newsId: string, comment: Omit<Comment, "id" | "createdAt" | "isApproved" | "newsId">) => Promise<void>;
  approveComment: (newsId: string, commentId: string) => Promise<void>;
  deleteComment: (newsId: string, commentId: string) => Promise<void>;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

// Имитация данных новостей для демонстрации
const mockNews: News[] = [
  {
    id: "1",
    title: "Новая линейка профнастила МП-20 с повышенной прочностью",
    content: "Компания Металл Профиль Поволжье представляет новую линейку профнастила МП-20 с улучшенными характеристиками прочности. Продукт прошел испытания и уже доступен для заказа.",
    imageUrl: "/placeholder.svg",
    authorId: "1",
    authorName: "Администратор Системы",
    authorRole: UserRole.ADMIN,
    createdAt: "2024-04-10T09:00:00Z",
    updatedAt: "2024-04-10T09:00:00Z",
    tags: ["новинки", "профнастил", "МП-20"],
    comments: [
      {
        id: "101",
        content: "Отличные новости! Когда можно будет заказать образцы?",
        authorId: "3",
        authorName: "Мария Клиентова",
        authorRole: UserRole.CLIENT,
        createdAt: "2024-04-10T10:15:00Z",
        isApproved: true,
        newsId: "1"
      }
    ]
  },
  {
    id: "2",
    title: "Открытие нового центра дистрибуции в Казани",
    content: "Рады сообщить об открытии нового центра дистрибуции в Казани. Теперь доставка продукции в регионе стала еще быстрее и удобнее. Центр оснащен современным оборудованием и готов обрабатывать большие объемы заказов.",
    imageUrl: "/placeholder.svg",
    authorId: "2",
    authorName: "Иван Партнеров",
    authorRole: UserRole.PARTNER,
    createdAt: "2024-04-05T14:30:00Z",
    updatedAt: "2024-04-05T14:30:00Z",
    tags: ["логистика", "Казань", "расширение"],
    comments: []
  },
  {
    id: "3",
    title: "Запуск программы обучения для партнеров",
    content: "Компания Металл Профиль Поволжье запускает программу обучения для партнеров. Программа включает в себя серию вебинаров, мастер-классов и очных встреч, направленных на повышение квалификации специалистов по продажам и монтажу.",
    imageUrl: "/placeholder.svg",
    authorId: "1",
    authorName: "Администратор Системы",
    authorRole: UserRole.ADMIN,
    createdAt: "2024-03-28T11:45:00Z",
    updatedAt: "2024-03-28T11:45:00Z",
    tags: ["обучение", "партнеры", "развитие"],
    comments: [
      {
        id: "102",
        content: "Когда будет опубликовано расписание вебинаров?",
        authorId: "2",
        authorName: "Иван Партнеров",
        authorRole: UserRole.PARTNER,
        createdAt: "2024-03-28T13:20:00Z",
        isApproved: true,
        newsId: "3"
      },
      {
        id: "103",
        content: "Будут ли выдаваться сертификаты после обучения?",
        authorId: "3",
        authorName: "Мария Клиентова",
        authorRole: UserRole.CLIENT,
        createdAt: "2024-03-29T10:05:00Z",
        isApproved: false,
        newsId: "3"
      }
    ]
  }
];

export const NewsProvider = ({ children }: { children: ReactNode }) => {
  const [news, setNews] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Имитация задержки сетевого запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setNews(mockNews);
    } catch (err) {
      setError("Ошибка при загрузке новостей");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const getNewsById = (id: string) => {
    return news.find(item => item.id === id);
  };

  const createNews = async (newsData: Omit<News, "id" | "createdAt" | "updatedAt" | "comments">) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Имитация задержки сетевого запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const now = new Date().toISOString();
      const newNews: News = {
        id: Math.random().toString(36).substring(2, 9),
        ...newsData,
        createdAt: now,
        updatedAt: now,
        comments: []
      };
      
      // В реальном приложении здесь был бы запрос к API
      setNews(prevNews => [newNews, ...prevNews]);
      mockNews.unshift(newNews);
    } catch (err) {
      setError("Ошибка при создании новости");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateNews = async (id: string, newsData: Partial<News>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Имитация задержки сетевого запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setNews(prevNews => prevNews.map(item => 
        item.id === id 
          ? { ...item, ...newsData, updatedAt: new Date().toISOString() }
          : item
      ));
      
      // Обновление в моковых данных
      const index = mockNews.findIndex(item => item.id === id);
      if (index !== -1) {
        mockNews[index] = { 
          ...mockNews[index], 
          ...newsData, 
          updatedAt: new Date().toISOString() 
        };
      }
    } catch (err) {
      setError("Ошибка при обновлении новости");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const addComment = async (newsId: string, comment: Omit<Comment, "id" | "createdAt" | "isApproved" | "newsId">) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Имитация задержки сетевого запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newComment: Comment = {
        id: Math.random().toString(36).substring(2, 9),
        ...comment,
        createdAt: new Date().toISOString(),
        isApproved: comment.authorRole !== UserRole.CLIENT, // Автоматическое одобрение для админов и партнеров
        newsId
      };
      
      setNews(prevNews => prevNews.map(item => 
        item.id === newsId 
          ? { ...item, comments: [...item.comments, newComment] }
          : item
      ));
      
      // Обновление в моковых данных
      const index = mockNews.findIndex(item => item.id === newsId);
      if (index !== -1) {
        mockNews[index].comments.push(newComment);
      }
    } catch (err) {
      setError("Ошибка при добавлении комментария");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const approveComment = async (newsId: string, commentId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Имитация задержки сетевого запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setNews(prevNews => prevNews.map(item => 
        item.id === newsId 
          ? { 
              ...item, 
              comments: item.comments.map(comment => 
                comment.id === commentId 
                  ? { ...comment, isApproved: true }
                  : comment
              ) 
            }
          : item
      ));
      
      // Обновление в моковых данных
      const newsIndex = mockNews.findIndex(item => item.id === newsId);
      if (newsIndex !== -1) {
        const commentIndex = mockNews[newsIndex].comments.findIndex(
          comment => comment.id === commentId
        );
        if (commentIndex !== -1) {
          mockNews[newsIndex].comments[commentIndex].isApproved = true;
        }
      }
    } catch (err) {
      setError("Ошибка при одобрении комментария");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteComment = async (newsId: string, commentId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Имитация задержки сетевого запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setNews(prevNews => prevNews.map(item => 
        item.id === newsId 
          ? { 
              ...item, 
              comments: item.comments.filter(comment => comment.id !== commentId) 
            }
          : item
      ));
      
      // Обновление в моковых данных
      const newsIndex = mockNews.findIndex(item => item.id === newsId);
      if (newsIndex !== -1) {
        mockNews[newsIndex].comments = mockNews[newsIndex].comments.filter(
          comment => comment.id !== commentId
        );
      }
    } catch (err) {
      setError("Ошибка при удалении комментария");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    news,
    isLoading,
    error,
    fetchNews,
    getNewsById,
    createNews,
    updateNews,
    addComment,
    approveComment,
    deleteComment
  };

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
};

export const useNews = (): NewsContextType => {
  const context = useContext(NewsContext);
  if (context === undefined) {
    throw new Error("useNews must be used within a NewsProvider");
  }
  return context;
};
