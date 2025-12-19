import { Sun, Paintbrush, Scaling, Wrench, MessageSquareHeart } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
  {
    icon: <Sun className="h-8 w-8 text-primary" />,
    title: "Iluminação LED uniforme",
    description: "Tecnologia de ponta para uma luz perfeita e sem sombras.",
  },
  {
    icon: <Paintbrush className="h-8 w-8 text-primary" />,
    title: "Design moderno e exclusivo",
    description: "Criações que se alinham às últimas tendências de decoração.",
  },
  {
    icon: <Scaling className="h-8 w-8 text-primary" />,
    title: "Produção sob medida",
    description: "Seu espelho no formato, tamanho e estilo que você imaginar.",
  },
  {
    icon: <Wrench className="h-8 w-8 text-primary" />,
    title: "Instalação profissional",
    description: "Nossa equipe garante uma instalação segura e impecável.",
  },
  {
    icon: <MessageSquareHeart className="h-8 w-8 text-primary" />,
    title: "Atendimento personalizado",
    description: "Acompanhamos seu projeto do início ao fim com total atenção.",
  },
];

export default function Differentiators() {
  return (
    <section id="diferenciais">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Nossos Diferenciais</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Qualidade em cada detalhe, do design à instalação.
            </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                   {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription className="pt-2">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
