"use client";

import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const WHATSAPP_LINK = "https://wa.me/5521967043634"; 

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            asChild
            size="icon"
            className={cn(
              'fixed bottom-6 right-6 h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg transition-all duration-300 z-50',
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            )}
            style={{ transitionProperty: 'opacity, transform' }}
            aria-label="Contact us on WhatsApp"
          >
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-7 w-7" />
            </a>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Fale conosco no WhatsApp</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
