import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ShoppingCart, ExternalLink } from "lucide-react";
import { useState } from "react";

// Имитация данных продуктов
const mockProducts = [
  {
    id: "1",
    name: "Профнастил МП-20",
    category: "profnastil",
    image: "/placeholder.svg",
    price: 520,
    description: "Универсальный профнастил для крыш и заборов с высотой волны 20 мм",
    specifications: [
      { name: "Толщина", value: "0.5 мм" },
      { name: "Ширина общая", value: "1150 мм" },
      { name: "Ширина полезная", value: "1100 мм" },
      { name: "Длина", value: "от 0.5 до 12 м" }
    ]
  },
  {
    id: "2",
    name: "Профнастил С-21",
    category: "profnastil",
    image: "/placeholder.svg",
    price: 570,
    description: "Стеновой профнастил с трапециевидной формой гофры высотой 21 мм",
    specifications: [
      { name: "Толщина", value: "0.5 мм" },
      { name: "Ширина общая", value: "1000 мм" },
      { name: "Ширина полезная", value: "950 мм" },
      { name: "Длина", value: "от 0.5 до 12 м" }
    ]
  },
  {
    id: "3",
    name: "Металлочерепица Монтеррей",
    category: "metalcherepica",
    image: "/placeholder.svg",
    price: 650,
    description: "Классическая металлочерепица с волнообразным профилем и ступенчатой формой",
    specifications: [
      { name: "Толщина", value: "0.5 мм" },
      { name: "Ширина общая", value: "1180 мм" },
      { name: "Ширина полезная", value: "1100 мм" },
      { name: "Длина", value: "от 0.5 до 8 м" }
    ]
  },
  {
    id: "4",
    name: "Металлочерепица Каскад",
    category: "metalcherepica",
    image: "/placeholder.svg",
    price: 690,
    description: "Металлочерепица с оригинальным дизайном, напоминающая натуральную черепицу",
    specifications: [
      { name: "Толщина", value: "0.5 мм" },
      { name: "Ширина общая", value: "1200 мм" },
      { name: "Ширина полезная", value: "1120 мм" },
      { name: "Длина", value: "от 0.5 до 8 м" }
    ]
  },
  {
    id: "5",
    name: "Сайдинг металлический",
    category: "sajding",
    image: "/placeholder.svg",
    price: 580,
    description: "Стальной сайдинг для отделки фасадов зданий с имитацией доски",
    specifications: [
      { name: "Толщина", value: "0.5 мм" },
      { name: "Ширина общая", value: "260 мм" },
      { name: "Ширина полезная", value: "230 мм" },
      { name: "Длина", value: "от 0.5 до 6 м" }
    ]
  },
  {
    id: "6",
    name: "Евроштакетник",
    category: "sajding",
    image: "/placeholder.svg",
    price: 210,
    description: "Металлический штакетник для заборов с европейским дизайном",
    specifications: [
      { name: "Толщина", value: "0.45 мм" },
      { name: "Ширина", value: "115 мм" },
      { name: "Высота", value: "от 0.5 до 2 м" }
    ]
  }
];

// Категории продуктов
const categories = [
  { id: "all", name: "Все категории" },
  { id: "profnastil", name: "Профнастил" },
  { id: "metalcherepica", name: "Металлочерепица" },
  { id: "sajding", name: "Сайдинг и штакетник" }
];

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("name");
  
  // Фильтрация и сортировка продуктов
  const filteredProducts = mockProducts
    .filter(product => 
      (selectedCategory === "all" || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortOrder === "price-asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Каталог продукции</h1>
      <p className="text-gray-500 mb-6">
        Широкий ассортимент кровельных и фасадных материалов высшего качества
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
        {/* Сайдбар фильтров */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Фильтры</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Поиск</label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Поиск по названию..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Категория</label>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <input
                        type="radio"
                        id={category.id}
                        name="category"
                        className="h-4 w-4 rounded-full border-gray-300 text-metalprofile-primary focus:ring-metalprofile-primary"
                        checked={selectedCategory === category.id}
                        onChange={() => setSelectedCategory(category.id)}
                      />
                      <label htmlFor={category.id} className="ml-2 text-sm font-normal">
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Сортировка</label>
                <Select
                  value={sortOrder}
                  onValueChange={(value) => setSortOrder(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите сортировку" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">По названию (А-Я)</SelectItem>
                    <SelectItem value="price-asc">По цене (возрастание)</SelectItem>
                    <SelectItem value="price-desc">По цене (убывание)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSortOrder("name");
                }}
              >
                Сбросить фильтры
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Консультация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-gray-500">
                Нужна помощь с выбором? Наши специалисты готовы проконсультировать вас.
              </p>
              <Button className="w-full" variant="outline">
                Заказать звонок
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Каталог товаров */}
        <div>
          <Tabs defaultValue="grid" className="mb-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Найдено товаров: {filteredProducts.length}
              </p>
              <TabsList>
                <TabsTrigger value="grid">Плитки</TabsTrigger>
                <TabsTrigger value="list">Список</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="grid" className="mt-4">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProducts.map((product) => (
                    <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-video">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{product.name}</CardTitle>
                          <span className="font-bold text-lg text-metalprofile-primary">
                            {product.price} ₽/м²
                          </span>
                        </div>
                        <CardDescription className="line-clamp-2">
                          {product.description}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="flex gap-2">
                        <Button variant="outline" className="w-full">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          В корзину
                        </Button>
                        <Button variant="outline" size="icon">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium">Товары не найдены</h3>
                  <p className="text-gray-500 mt-2">
                    Попробуйте изменить параметры фильтрации
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="list" className="mt-4">
              {filteredProducts.length > 0 ? (
                <div className="space-y-4">
                  {filteredProducts.map((product) => (
                    <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="object-cover w-full h-full md:h-48"
                          />
                        </div>
                        <div className="md:w-3/4 p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold">{product.name}</h3>
                            <span className="font-bold text-lg text-metalprofile-primary">
                              {product.price} ₽/м²
                            </span>
                          </div>
                          <p className="text-gray-500 mb-4">{product.description}</p>
                          
                          <div className="grid grid-cols-2 gap-2 mb-4">
                            {product.specifications.map((spec, index) => (
                              <div key={index} className="text-sm">
                                <span className="text-gray-500">{spec.name}: </span>
                                <span className="font-medium">{spec.value}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex gap-2">
                            <Button variant="outline">
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              В корзину
                            </Button>
                            <Button>Подробнее</Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  
                  <h3 className="text-xl font-medium">Товары не найдены</h3>
                  <p className="text-gray-500 mt-2">
                    Попробуйте изменить параметры фильтрации
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
