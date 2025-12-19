"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

const WHATSAPP_LINK = "https://wa.me/5521967043634?text=Olá! Gostaria de solicitar um orçamento.";

const navLinks = [
    { href: "#galeria", label: "Galeria" },
    { href: "#sobre", label: "Sobre" },
    { href: "#diferenciais", label: "Diferenciais" },
    { href: "#contato", label: "Contato" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-40 w-full transition-all duration-300",
      isScrolled ? "bg-background/80 backdrop-blur-sm border-b" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Logo />
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
                 <a key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                 </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Button asChild className="hidden sm:inline-flex">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">Solicitar Orçamento</a>
            </Button>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="md:hidden">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Abrir menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <div className="flex flex-col h-full p-6">
                        <div className="mb-8">
                            <Logo />
                        </div>
                        <nav className="flex flex-col gap-6">
                             {navLinks.map(link => (
                                <a key={link.href} href={link.href} className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                        <Button asChild className="mt-auto">
                            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">Solicitar Orçamento</a>
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
