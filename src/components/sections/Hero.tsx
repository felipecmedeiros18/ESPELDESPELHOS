import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { PenTool, Lightbulb, Sparkles } from 'lucide-react';

const WHATSAPP_LINK = "https://wa.me/5521967043634?text=Olá! Gostaria de solicitar um orçamento.";

export default function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');

  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center text-center text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover z-0"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div className="container relative z-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-4 bg-white/10 text-white border-white/20">Atendimento no Rio de Janeiro</Badge>
            <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-balance">
                Espelhos LED que transformam ambientes em experiências
            </h1>
            <p className="mt-4 text-lg text-gray-200 md:text-xl">
                Design, iluminação e elegância sob medida para seu projeto.
            </p>
            <Button asChild size="lg" className="mt-8">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">Solicitar Orçamento Agora</a>
            </Button>
            <div className="mt-12 flex justify-center items-center gap-6 md:gap-10 text-sm">
                <div className="flex items-center gap-2">
                    <PenTool className="h-5 w-5 text-accent" />
                    <span>Design</span>
                </div>
                <div className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-accent" />
                    <span>Iluminação</span>
                </div>
                <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-accent" />
                    <span>Sofisticação</span>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
