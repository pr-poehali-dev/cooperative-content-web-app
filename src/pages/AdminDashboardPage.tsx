import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useAdmin } from "@/contexts/AdminContext";
import { UserRole } from "@/types";
import { AlertTriangle, CheckCircle2, ChevronLeft, Users, BarChart, FileText, Clock, Activity } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar, PieChart, Pie, Cell } from "recharts";

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const { auditLogs, siteStats, fetchAuditLogs, fetchSiteStats, isLoading } = useAdmin();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Проверка прав доступа
    if (!user || user.role !== UserRole.ADMIN) {
      navigate("/");
      return;
    }
    
    fetchAuditLogs();
    fetchSiteStats();
  }, [user]);
  
  if (!user || user.role !== UserRole.ADMIN) {
    return null;
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Цвета для графиков
  const colors = ['#0056A4', '#E31E24', '#36B37E', '#FF5630', '#6554C0', '#FFAB00'];
  
  return (
    <div className="container py-8">
      <Button variant="outline" asChild className="mb-4">
        <div onClick={() => navigate("/profile")}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          К профилю
        </div>
      </Button>
      
      <h1 className="text-3xl font-bold tracking-tight mb-2">Панель администратора</h1>
      <p className="text-gray-500 mb-6">
        Аналитика, статистика и управление содержимым сайта
      </p>
      
      <Tabs defaultValue="dashboard">
        <TabsList className="mb-6">
          <TabsTrigger value="dashboard">
            <Activity className="h-4 w-4 mr-2" />
            Обзор
          </TabsTrigger>
          <TabsTrigger value="statistics">
            <BarChart className="h-4 w-4 mr-2" />
            Статистика
          </TabsTrigger>
          <TabsTrigger value="audit">
            <FileText className="h-4 w-4 mr-2" />
            Аудит-логи
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-6">
          {/* Общие показатели */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Всего посещений</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoading ? (
                    <div className="h-8 w-24 bg-muted rounded animate-pulse" />
                  ) : (
                    siteStats?.totalVisits || 0
                  )}
                </div>
                <p className="text-xs text-gray-500">За все время</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Уникальных посетителей</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoading ? (
                    <div className="h-8 w-24 bg-muted rounded animate-pulse" />
                  ) : (
                    siteStats?.uniqueVisitors || 0
                  )}
                </div>
                <p className="text-xs text-gray-500">За все время</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Просмотры страниц</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoading ? (
                    <div className="h-8 w-24 bg-muted rounded animate-pulse" />
                  ) : (
                    siteStats?.pageViews || 0
                  )}
                </div>
                <p className="text-xs text-gray-500">За все время</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Среднее время на сайте</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoading ? (
                    <div className="h-8 w-24 bg-muted rounded animate-pulse" />
                  ) : (
                    siteStats?.averageTimeOnSite || "0:00"
                  )}
                </div>
                <p className="text-xs text-gray-500">В минутах и секундах</p>
              </CardContent>
            </Card>
          </div>
          
          {/* График посещений и популярные страницы */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Посещения по дням</CardTitle>
                <CardDescription>Динамика посещений за последнюю неделю</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-[300px] w-full bg-muted rounded animate-pulse" />
                ) : siteStats?.visitsByDay && (
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={siteStats.visitsByDay}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0056A4" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#0056A4" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="date" 
                          tickFormatter={(value) => {
                            const date = new Date(value);
                            return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
                          }}
                        />
                        <YAxis />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="visits" 
                          stroke="#0056A4" 
                          fillOpacity={1} 
                          fill="url(#colorVisits)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Популярные страницы</CardTitle>
                <CardDescription>Топ посещаемых страниц</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex justify-between items-center">
                        <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                        <div className="h-4 w-12 bg-muted rounded animate-pulse" />
                      </div>
                    ))}
                  </div>
                ) : siteStats?.topPages && (
                  <div className="space-y-4">
                    {siteStats.topPages.map((page, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm">{page.page}</span>
                        <span className="text-sm font-medium">{page.views}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Последние действия в системе */}
          <Card>
            <CardHeader>
              <CardTitle>Последние действия</CardTitle>
              <CardDescription>Последние 5 записей аудит-лога</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex gap-4 items-center">
                      <div className="h-10 w-10 bg-muted rounded-full animate-pulse" />
                      <div className="space-y-2 flex-1">
                        <div className="h-4 w-full bg-muted rounded animate-pulse" />
                        <div className="h-3 w-24 bg-muted rounded animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {auditLogs.slice(0, 5).map((log) => (
                    <div key={log.id} className="flex gap-4 items-start">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white ${
                        log.action === "LOGIN" ? "bg-green-500" : 
                        log.action === "CREATE_NEWS" ? "bg-blue-500" : 
                        log.action === "EDIT_NEWS" ? "bg-orange-500" : 
                        log.action === "DELETE_COMMENT" ? "bg-red-500" : 
                        "bg-gray-500"
                      }`}>
                        {log.action === "LOGIN" ? <CheckCircle2 className="h-5 w-5" /> : 
                         log.action === "DELETE_COMMENT" ? <AlertTriangle className="h-5 w-5" /> : 
                         <Users className="h-5 w-5" />}
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">{log.username}</span> ({log.userRole}) - {log.details}
                        </p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDate(log.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <Button variant="link" className="mt-4 p-0" onClick={() => navigate("/admin/audit-logs")}>
                Просмотреть все
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="statistics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Посещения по дням</CardTitle>
                <CardDescription>Динамика за последнюю неделю</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-[300px] w-full bg-muted rounded animate-pulse" />
                ) : siteStats?.visitsByDay && (
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={siteStats.visitsByDay}
                        margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="date" 
                          angle={-45}
                          textAnchor="end"
                          tickFormatter={(value) => {
                            const date = new Date(value);
                            return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
                          }}
                        />
                        <YAxis />
                        <Tooltip 
                          formatter={(value, name) => [`${value} посещений`, 'Посещения']}
                          labelFormatter={(value) => {
                            const date = new Date(value);
                            return date.toLocaleDateString('ru-RU', { 
                              weekday: 'long', 
                              day: 'numeric', 
                              month: 'long' 
                            });
                          }}
                        />
                        <Bar dataKey="visits" fill="#0056A4" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Популярные страницы</CardTitle>
                <CardDescription>Распределение трафика по страницам</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-[300px] w-full bg-muted rounded animate-pulse" />
                ) : siteStats?.topPages && (
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={siteStats.topPages}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="views"
                          nameKey="page"
                        >
                          {siteStats.topPages.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value, name, props) => [`${value} просмотров`, props.payload.page]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Подробная статистика</CardTitle>
              <CardDescription>Детальная информация о посещениях</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Общие показатели</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-gray-500">Всего посещений:</span>
                      <span className="font-medium">{siteStats?.totalVisits || 0}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Уникальных посетителей:</span>
                      <span className="font-medium">{siteStats?.uniqueVisitors || 0}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Просмотры страниц:</span>
                      <span className="font-medium">{siteStats?.pageViews || 0}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Среднее время на сайте:</span>
                      <span className="font-medium">{siteStats?.averageTimeOnSite || "0:00"}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Показатель отказов:</span>
                      <span className="font-medium">32%</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Источники трафика</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-gray-500">Прямые переходы:</span>
                      <span className="font-medium">45%</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Органический поиск:</span>
                      <span className="font-medium">32%</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Социальные сети:</span>
                      <span className="font-medium">18%</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Реферальный трафик:</span>
                      <span className="font-medium">5%</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Популярные страницы</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 font-medium">Страница</th>
                        <th className="text-right py-2 font-medium">Просмотры</th>
                        <th className="text-right py-2 font-medium">Среднее время</th>
                        <th className="text-right py-2 font-medium">Показатель отказов</th>
                      </tr>
                    </thead>
                    <tbody>
                      {siteStats?.topPages.map((page, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-2">{page.page}</td>
                          <td className="text-right py-2">{page.views}</td>
                          <td className="text-right py-2">{Math.floor(Math.random() * 3) + 1}m {Math.floor(Math.random() * 60)}s</td>
                          <td className="text-right py-2">{Math.floor(Math.random() * 40) + 10}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Аудит-логи</CardTitle>
              <CardDescription>Список действий пользователей в системе</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 font-medium">Дата и время</th>
                      <th className="text-left py-2 font-medium">Пользователь</th>
                      <th className="text-left py-2 font-medium">Действие</th>
                      <th className="text-left py-2 font-medium">IP-адрес</th>
                      <th className="text-left py-2 font-medium">Детали</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      [...Array(5)].map((_, i) => (
                        <tr key={i} className="border-b">
                          <td className="py-2">
                            <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                          </td>
                          <td className="py-2">
                            <div className="h-4 w-20 bg-muted rounded animate-pulse" />
                          </td>
                          <td className="py-2">
                            <div className="h-4 w-16 bg-muted rounded animate-pulse" />
                          </td>
                          <td className="py-2">
                            <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                          </td>
                          <td className="py-2">
                            <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                          </td>
                        </tr>
                      ))
                    ) : (
                      auditLogs.map((log) => (
                        <tr key={log.id} className="border-b">
                          <td className="py-2">{formatDate(log.timestamp)}</td>
                          <td className="py-2">
                            <div className="flex items-center gap-1">
                              <span className="font-medium">{log.username}</span>
                              <span className="text-xs text-gray-500">({log.userRole})</span>
                            </div>
                          </td>
                          <td className="py-2">
                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                              log.action === "LOGIN" ? "bg-green-100 text-green-700" : 
                              log.action === "CREATE_NEWS" ? "bg-blue-100 text-blue-700" : 
                              log.action === "EDIT_NEWS" ? "bg-orange-100 text-orange-700" : 
                              log.action === "DELETE_COMMENT" ? "bg-red-100 text-red-700" : 
                              "bg-gray-100 text-gray-700"
                            }`}>
                              {log.action}
                            </span>
                          </td>
                          <td className="py-2">{log.ipAddress}</td>
                          <td className="py-2 max-w-xs truncate">{log.details}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-500">Показано {auditLogs.length} из {auditLogs.length} записей</p>
                <Button disabled>
                  Загрузить еще
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
