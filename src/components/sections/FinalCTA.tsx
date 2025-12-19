import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const WHATSAPP_LINK = "https://wa.me/5521967043634?text=Olá! Gostaria de solicitar um orçamento.";

export default function FinalCTA() {
  const ctaImage = PlaceHolderImages.find((img) => img.id === 'final-cta-background');

  return (
    <section id="contato" className="relative w-full text-white">
        {ctaImage && (
             <Image
                src={ctaImage.imageUrl}
                alt={ctaImage.description}
                fill
                className="object-cover z-0"
                data-ai-hint={ctaImage.imageHint}
            />
        )}
        <div className="absolute inset-0 bg-black/70 z-10" />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 z-20">
            <div className="py-20 md:py-32 flex flex-col items-center justify-center text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-balance">
                    Seu ambiente merece mais do que um espelho comum.
                </h2>
                <p className="mt-4 max-w-xl text-lg text-gray-300">
                    Dê o toque final de elegância e modernidade que seu projeto precisa.
                </p>
                <Button asChild size="lg" className="mt-8 text-lg px-10 py-7 bg-white text-black hover:bg-gray-200">
                     <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                        🚀 Solicitar orçamento pelo WhatsApp
                     </a>
                </Button>
            </div>
        </div>
    </section>
  );
}
