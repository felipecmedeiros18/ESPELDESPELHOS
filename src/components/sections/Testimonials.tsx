import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const testimonials = [
  {
    name: "Juliana R.",
    location: "Barra da Tijuca, RJ",
    quote: "Transformou completamente meu banheiro. A iluminação é perfeita e o acabamento impecável. Atendimento nota 10!",
    imageId: "testimonial-1",
  },
  {
    name: "Fernando M.",
    location: "Leblon, RJ",
    quote: "Qualidade e sofisticação definem. O espelho orgânico ficou incrível no meu closet. Recomendo muito a ESPELD.",
    imageId: "testimonial-2",
  },
  {
    name: "",
    location: "",
    quote: "Nossos clientes amaram os novos espelhos da recepção. Trouxe um ar de modernidade e elegância para o espaço.",
    imageId: "testimonial-3",
  },
];

export default function Testimonials() {
  return (
    <section id="depoimentos" className="bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Amado por nossos clientes</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Veja o que dizem sobre os espelhos que criamos com tanto carinho.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            const image = PlaceHolderImages.find(img => img.id === testimonial.imageId);
            return (
              <Card key={index} className="flex flex-col overflow-hidden">
                {image && (
                   <CardHeader className="p-0">
                        <div className="aspect-square relative w-full">
                             <Avatar className="h-full w-full rounded-none">
                                <AvatarImage src={image.imageUrl} alt={`Foto de ${testimonial.name}`} data-ai-hint={image.imageHint} className="object-cover object-[50%_30%]" />
                                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                             </Avatar>
                        </div>
                   </CardHeader>
                )}
                <CardContent className="p-6 flex-grow flex flex-col">
                  <p className="text-muted-foreground flex-grow">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4 mt-6 pt-6 border-t">
                    <div>
                      {testimonial.name && <p className="font-semibold text-foreground">{testimonial.name}</p>}
                      {testimonial.location && <p className="text-sm text-muted-foreground">{testimonial.location}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
