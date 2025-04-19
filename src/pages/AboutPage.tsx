import { Card, CardContent } from "@/components/ui/card";
import { Building, Clock, Award, Globe, Users, Leaf } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">О компании</h1>
      
      {/* Вводная секция */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-lg mb-4">
              ООО Компания Металл Профиль Поволжье — один из ведущих производителей и поставщиков кровельных и фасадных систем в Поволжском регионе.
            </p>
            <p className="mb-4">
              Наша компания входит в Группу компаний Металл Профиль, которая является лидером по производству кровельных и фасадных материалов в России и странах СНГ.
            </p>
            <p>
              Мы предлагаем широкий ассортимент продукции высшего качества для строительства и ремонта: профнастил, металлочерепицу, сайдинг, водостоки, сэндвич-панели и комплектующие.
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src="/placeholder.svg"
              alt="Здание компании"
              className="rounded-lg shadow-lg max-w-full h-auto"
            />
          </div>
        </div>
      </section>
      
      {/* Наши преимущества */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Наши преимущества</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-none shadow-md">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-metalprofile-primary/10 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-metalprofile-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Качество</h3>
              <p className="text-gray-500">
                Мы используем только высококачественное сырье от проверенных поставщиков и осуществляем строгий контроль на всех этапах производства.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-md">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-metalprofile-primary/10 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-metalprofile-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Оперативность</h3>
              <p className="text-gray-500">
                Мы дорожим временем наших клиентов и стремимся обработать заказы максимально быстро с соблюдением всех сроков.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-md">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-metalprofile-primary/10 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-metalprofile-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Широкий охват</h3>
              <p className="text-gray-500">
                Наша дистрибьюторская сеть охватывает весь Поволжский регион, что гарантирует быструю доставку в любую точку.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* История */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">История компании</h2>
        
        <div className="space-y-6">
          <div className="relative pl-10 md:pl-0">
            <div className="md:grid md:grid-cols-5 md:gap-6">
              <div className="hidden md:block md:col-span-1 text-right pr-6 font-bold">
                2005
              </div>
              <div className="md:col-span-4">
                <div className="relative pb-8">
                  <div className="absolute left-0 md:left-[-30px] top-0 h-full w-[2px] bg-metalprofile-primary/30"></div>
                  <div className="absolute left-[-8px] md:left-[-38px] top-0 h-4 w-4 rounded-full bg-metalprofile-primary"></div>
                  <Card className="border-none shadow-md">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-2">Основание компании</h3>
                      <p className="text-gray-500">
                        ООО Компания Металл Профиль Поволжье основана как региональное представительство Группы компаний Металл Профиль в Поволжском регионе.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative pl-10 md:pl-0">
            <div className="md:grid md:grid-cols-5 md:gap-6">
              <div className="hidden md:block md:col-span-1 text-right pr-6 font-bold">
                2010
              </div>
              <div className="md:col-span-4">
                <div className="relative pb-8">
                  <div className="absolute left-0 md:left-[-30px] top-0 h-full w-[2px] bg-metalprofile-primary/30"></div>
                  <div className="absolute left-[-8px] md:left-[-38px] top-0 h-4 w-4 rounded-full bg-metalprofile-primary"></div>
                  <Card className="border-none shadow-md">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-2">Расширение производства</h3>
                      <p className="text-gray-500">
                        Запуск собственного производственного комплекса в Казани с новейшим оборудованием и технологиями.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative pl-10 md:pl-0">
            <div className="md:grid md:grid-cols-5 md:gap-6">
              <div className="hidden md:block md:col-span-1 text-right pr-6 font-bold">
                2015
              </div>
              <div className="md:col-span-4">
                <div className="relative pb-8">
                  <div className="absolute left-0 md:left-[-30px] top-0 h-full w-[2px] bg-metalprofile-primary/30"></div>
                  <div className="absolute left-[-8px] md:left-[-38px] top-0 h-4 w-4 rounded-full bg-metalprofile-primary"></div>
                  <Card className="border-none shadow-md">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-2">Лидер рынка</h3>
                      <p className="text-gray-500">
                        Компания становится лидером рынка кровельных и фасадных материалов в Поволжском регионе с долей рынка более 30%.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative pl-10 md:pl-0">
            <div className="md:grid md:grid-cols-5 md:gap-6">
              <div className="hidden md:block md:col-span-1 text-right pr-6 font-bold">
                2020
              </div>
              <div className="md:col-span-4">
                <div className="relative">
                  <div className="absolute left-0 md:left-[-30px] top-0 h-[50%] w-[2px] bg-metalprofile-primary/30"></div>
                  <div className="absolute left-[-8px] md:left-[-38px] top-0 h-4 w-4 rounded-full bg-metalprofile-primary"></div>
                  <Card className="border-none shadow-md">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-2">Инновации и развитие</h3>
                      <p className="text-gray-500">
                        Внедрение новых технологий производства и запуск линейки инновационных продуктов с улучшенными характеристиками.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Миссия и ценности */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Миссия и ценности</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-none shadow-md">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Миссия</h3>
              <p className="text-gray-500 mb-4">
                Наша миссия — обеспечивать строительную отрасль Поволжья высококачественными кровельными и фасадными материалами, способствуя созданию надежных, долговечных и эстетически привлекательных зданий.
              </p>
              <p className="text-gray-500">
                Мы стремимся к постоянному совершенствованию нашей продукции и услуг, внедряя инновационные технологии и следуя принципам устойчивого развития.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-md">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Ценности</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="w-6 h-6 mt-1 rounded-full bg-metalprofile-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="h-3 w-3 text-metalprofile-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Клиентоориентированность</h4>
                    <p className="text-gray-500 text-sm">Интересы и потребности клиентов всегда на первом месте</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 mt-1 rounded-full bg-metalprofile-primary/10 flex items-center justify-center flex-shrink-0">
                    <Award className="h-3 w-3 text-metalprofile-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Качество</h4>
                    <p className="text-gray-500 text-sm">Бескомпромиссное качество продукции и услуг</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 mt-1 rounded-full bg-metalprofile-primary/10 flex items-center justify-center flex-shrink-0">
                    <Building className="h-3 w-3 text-metalprofile-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Надежность</h4>
                    <p className="text-gray-500 text-sm">Выполнение обязательств и доверительные отношения с партнерами</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 mt-1 rounded-full bg-metalprofile-primary/10 flex items-center justify-center flex-shrink-0">
                    <Leaf className="h-3 w-3 text-metalprofile-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Экологичность</h4>
                    <p className="text-gray-500 text-sm">Забота об окружающей среде и устойчивое развитие</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Партнеры */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Наши партнеры</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 items-center">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex justify-center p-4 border rounded-lg">
              <img
                src="/placeholder.svg"
                alt={`Партнер ${i+1}`}
                className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
