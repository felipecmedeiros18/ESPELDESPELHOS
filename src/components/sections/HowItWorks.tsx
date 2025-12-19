import { Button } from "@/components/ui/button";

const steps = [
  {
    title: "Você entra em contato",
    description: "Clique em um dos botões de WhatsApp e nos conte sua ideia inicial.",
  },
  {
    title: "Entendemos sua necessidade",
    description: "Nossos especialistas irão te ajudar a definir os detalhes do projeto.",
  },
  {
    title: "Criamos o espelho ideal",
    description: "Desenvolvemos a peça com as medidas e especificações exatas para seu ambiente.",
  },
  {
    title: "Produção e instalação",
    description: "Fabricamos seu espelho com materiais de alta qualidade e cuidamos da instalação.",
  },
];

const WHATSAPP_LINK = "https://wa.me/5521967043634?text=Olá! Gostaria de falar com um especialista.";

export default function HowItWorks() {
  return (
    <section id="como-funciona">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Como Funciona</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Nosso processo é simples, rápido e transparente, pensado para sua comodidade.
            </p>
        </div>

        <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" aria-hidden="true"></div>
            {steps.map((step, index) => (
                <div key={index} className="relative flex items-center mb-12">
                    <div className="hidden md:block w-1/2 pr-8 text-right">
                        {index % 2 === 0 && (
                            <div className="space-y-1">
                                <h3 className="font-bold text-lg text-primary">{step.title}</h3>
                                <p className="text-muted-foreground">{step.description}</p>
                            </div>
                        )}
                    </div>
                    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg mx-auto">
                       {index + 1}
                    </div>
                     <div className="w-1/2 pl-8">
                         <div className="space-y-1 md:hidden">
                            <h3 className="font-bold text-lg text-primary">{step.title}</h3>
                            <p className="text-muted-foreground">{step.description}</p>
                        </div>
                        <div className="hidden md:block">
                             {index % 2 !== 0 && (
                                <div className="space-y-1">
                                    <h3 className="font-bold text-lg text-primary">{step.title}</h3>
                                    <p className="text-muted-foreground">{step.description}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className="text-center mt-8">
            <Button asChild size="lg">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">👉 Falar com um especialista</a>
            </Button>
        </div>
      </div>
    </section>
  );
}
