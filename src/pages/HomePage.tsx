import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNews } from "@/contexts/NewsContext";
import { ExternalLink, MessageSquare } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { news, fetchNews } = useNews();
  
  useEffect(() => {
    fetchNews();
  }, []);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  return (
    <div className="flex flex-col gap-12 min-h-screen">
      {/* Герой-секция */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-br from-metalprofile-primary/90 to-metalprofile-primary">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Инновационные решения для фасадов и кровли
              </h1>
              <p className="max-w-[600px] text-gray-200 md:text-xl/relaxed">
                ООО Компания Металл Профиль Поволжье - ведущий производитель и поставщик кровельных и фасадных решений в Поволжском регионе.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button 
                  size="lg" 
                  className="bg-white text-metalprofile-primary hover:bg-gray-100"
                  asChild
                >
                  <Link to="/catalog">Каталог продукции</Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                  asChild
                >
                  <Link to="/contacts">Связаться с нами</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img
                alt="Металл Профиль продукция"
                className="w-full max-w-[400px] h-auto object-cover rounded-lg shadow-xl"
                src="/placeholder.svg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Секция преимуществ */}
      <section className="w-full py-12 bg-metalprofile-accent">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Наши преимущества
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed">
                Более 15 лет опыта в производстве и поставке высококачественных материалов
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Качество</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Продукция высшего качества из сырья от проверенных поставщиков с соблюдением всех технологических норм
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Инновации</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Постоянное обновление технологий и внедрение инновационных решений для улучшения характеристик продукции
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Надежность</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Соблюдение сроков, гарантийные обязательства и техническая поддержка на каждом этапе сотрудничества
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Секция последних новостей */}
      <section className="w-full py-12">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Последние новости
            </h2>
            <Button variant="outline" asChild>
              <Link to="/news">
                Все новости
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.slice(0, 3).map((item) => (
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
                  <Button variant="outline" asChild>
                    <Link to={`/news/${item.id}`}>Подробнее</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA секция */}
      <section className="w-full py-12 bg-metalprofile-primary/10">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Станьте нашим партнером
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed">
                  Присоединяйтесь к нашей партнерской программе и получите доступ к эксклюзивным материалам и возможностям
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button 
                  size="lg" 
                  className="bg-metalprofile-primary text-white"
                  asChild
                >
                  <Link to="/partners">Узнать больше</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                alt="Партнерство"
                className="w-full max-w-[400px] h-auto object-cover rounded-lg shadow-xl"
                src="/placeholder.svg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
