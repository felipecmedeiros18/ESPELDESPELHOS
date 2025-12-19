import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card } from "../ui/card";

const highlights = [
  "Espelhos sob medida",
  "Acabamento de alto padrão",
  "Iluminação LED moderna",
  "Projetos residenciais e comerciais",
];

export default function About() {
  const aboutImage = PlaceHolderImages.find((img) => img.id === "about-image");

  return (
    <section id="sobre" className="bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
                Sobre a ESPELDESPELHOS
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                A ESPELDESPELHOS é especializada na criação de espelhos LED e orgânicos que unem tecnologia, design e acabamento impecável. Cada peça é pensada para valorizar o ambiente, trazendo conforto visual e sofisticação.
              </p>
            </div>
            <ul className="grid gap-4">
              {highlights.map((text, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                  <span className="font-medium">{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-center">
            {aboutImage && (
              <Card className="overflow-hidden shadow-2xl">
                 <Image
                    src={aboutImage.imageUrl}
                    alt={aboutImage.description}
                    width={800}
                    height={600}
                    className="object-cover w-full h-auto"
                    data-ai-hint={aboutImage.imageHint}
                />
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
