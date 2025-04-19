import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] text-center py-16">
      <h1 className="text-6xl font-bold text-metalprofile-primary mb-2">404</h1>
      <h2 className="text-2xl font-bold mb-4">Страница не найдена</h2>
      <p className="text-gray-500 max-w-md mb-8">
        Извините, запрашиваемая вами страница не существует или была перемещена.
      </p>
      <Button asChild>
        <Link to="/">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Вернуться на главную
        </Link>
      </Button>
    </div>
  );
}
