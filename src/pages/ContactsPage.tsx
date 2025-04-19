import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building, Clock, Mail, MapPin, Phone } from "lucide-react";
import { useState, FormEvent } from "react";
import { toast } from "@/components/ui/use-toast";

export default function ContactsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Имитация отправки формы
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Сообщение отправлено",
      description: "Мы свяжемся с вами в ближайшее время",
    });
    
    // Очистка формы
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setIsSubmitting(false);
  };
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Контакты</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Свяжитесь с нами</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ваше имя</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Иван Иванов"
                      required
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
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Сообщение</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Введите ваше сообщение"
                    className="min-h-[120px]"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Отправка..." : "Отправить сообщение"}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Как нас найти</h2>
            {/* Карта */}
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <p className="text-lg font-medium">Карта</p>
                <p className="text-sm text-gray-500">
                  В реальном проекте здесь будет интерактивная карта
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Офис в Казани</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-metalprofile-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Адрес:</p>
                  <p className="text-gray-500">420085, г. Казань, ул. Примерная, 123</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-metalprofile-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Телефон:</p>
                  <p className="text-gray-500">
                    <a href="tel:+78432123456" className="hover:text-metalprofile-primary">
                      +7 (843) 212-34-56
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-metalprofile-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Email:</p>
                  <p className="text-gray-500">
                    <a href="mailto:info@metprof-volga.ru" className="hover:text-metalprofile-primary">
                      info@metprof-volga.ru
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-metalprofile-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Режим работы:</p>
                  <p className="text-gray-500">Пн-Пт: 9:00-18:00</p>
                  <p className="text-gray-500">Сб-Вс: выходной</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Производство</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Building className="h-5 w-5 text-metalprofile-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Адрес производства:</p>
                  <p className="text-gray-500">422527, г. Зеленодольск, ул. Заводская, 45</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-metalprofile-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Телефон:</p>
                  <p className="text-gray-500">
                    <a href="tel:+78432123457" className="hover:text-metalprofile-primary">
                      +7 (843) 212-34-57
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-metalprofile-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Режим работы:</p>
                  <p className="text-gray-500">Пн-Пт: 8:00-20:00</p>
                  <p className="text-gray-500">Сб: 9:00-15:00</p>
                  <p className="text-gray-500">Вс: выходной</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Отдел продаж</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-metalprofile-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Телефон:</p>
                  <p className="text-gray-500">
                    <a href="tel:+78432123458" className="hover:text-metalprofile-primary">
                      +7 (843) 212-34-58
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-metalprofile-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Email:</p>
                  <p className="text-gray-500">
                    <a href="mailto:sales@metprof-volga.ru" className="hover:text-metalprofile-primary">
                      sales@metprof-volga.ru
                    </a>
                  </p>
                </div>
              </div>
              
              <Button className="w-full" variant="outline">
                Заказать звонок
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
