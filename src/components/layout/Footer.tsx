import { MapPin, MessageCircle, Instagram } from "lucide-react";
import { Logo } from "@/components/Logo";

const WHATSAPP_LINK = "https://wa.me/5521999999999";
const INSTAGRAM_LINK = "https://instagram.com/espeld";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Transformando ambientes com espelhos LED e orgânicos que combinam design, tecnologia e sofisticação.
            </p>
          </div>
          <div className="md:justify-self-center">
            <h3 className="font-semibold text-foreground mb-4">Contato</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <MapPin className="h-4 w-4" />
                  <span>Rio de Janeiro, RJ</span>
                </a>
              </li>
              <li>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp</span>
                </a>
              </li>
              <li>
                <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Instagram className="h-4 w-4" />
                  <span>Instagram</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="md:justify-self-end">
             <h3 className="font-semibold text-foreground mb-4">Navegação</h3>
             <ul className="space-y-3">
                <li><a href="#galeria" className="text-sm text-muted-foreground hover:text-primary transition-colors">Galeria</a></li>
                <li><a href="#sobre" className="text-sm text-muted-foreground hover:text-primary transition-colors">Sobre</a></li>
                <li><a href="#como-funciona" className="text-sm text-muted-foreground hover:text-primary transition-colors">Como Funciona</a></li>
                <li><a href="#contato" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contato</a></li>
             </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} ESPELD. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
