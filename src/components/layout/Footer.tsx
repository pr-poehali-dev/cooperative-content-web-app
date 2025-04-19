import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t bg-metalprofile-accent py-8 mt-auto">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <img src="/logo-b.svg" alt="Металл Профиль" className="h-8" />
            <span className="font-bold">
              Металл Профиль <span className="text-metalprofile-secondary">Поволжье</span>
            </span>
          </div>
          <p className="text-sm text-gray-600">
            ООО Компания Металл Профиль Поволжье - ведущий производитель 
            кровельных и фасадных систем в Поволжском регионе.
          </p>
          <p className="text-sm text-gray-600">
            © {currentYear} Металл Профиль Поволжье. Все права защищены.
          </p>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">Информация</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="text-gray-600 hover:text-metalprofile-primary transition-colors">
                О компании
              </Link>
            </li>
            <li>
              <Link to="/news" className="text-gray-600 hover:text-metalprofile-primary transition-colors">
                Новости
              </Link>
            </li>
            <li>
              <Link to="/catalog" className="text-gray-600 hover:text-metalprofile-primary transition-colors">
                Каталог продукции
              </Link>
            </li>
            <li>
              <Link to="/partners" className="text-gray-600 hover:text-metalprofile-primary transition-colors">
                Партнёрам
              </Link>
            </li>
            <li>
              <Link to="/contacts" className="text-gray-600 hover:text-metalprofile-primary transition-colors">
                Контакты
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">Контакты</h3>
          <ul className="space-y-2 text-sm">
            <li className="text-gray-600">
              <strong>Адрес:</strong> 420085, г. Казань, ул. Примерная, 123
            </li>
            <li>
              <a href="tel:+78432123456" className="text-gray-600 hover:text-metalprofile-primary transition-colors">
                <strong>Телефон:</strong> +7 (843) 212-34-56
              </a>
            </li>
            <li>
              <a href="mailto:info@metprof-volga.ru" className="text-gray-600 hover:text-metalprofile-primary transition-colors">
                <strong>Email:</strong> info@metprof-volga.ru
              </a>
            </li>
            <li className="text-gray-600">
              <strong>Режим работы:</strong> Пн-Пт: 9:00-18:00
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mt-6 pt-6 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            Сайт разработан в рамках дипломной работы для Казанского Нефтехимического колледжа им. В.П. Лушникова
          </p>
          <div className="flex space-x-4">
            <Link to="/privacy" className="text-xs text-gray-500 hover:text-metalprofile-primary transition-colors">
              Политика конфиденциальности
            </Link>
            <Link to="/terms" className="text-xs text-gray-500 hover:text-metalprofile-primary transition-colors">
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
