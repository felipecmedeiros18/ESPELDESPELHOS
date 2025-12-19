import VisualizeForm from "@/components/VisualizeForm";

export default function Visualize() {
  return (
    <section id="visualize">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Visualize o espelho no seu espaço
          </h2>
          <p className="mx-auto max-w-[900px] text-muted-foreground md:text-xl/relaxed">
            Use nossa ferramenta de Inteligência Artificial para ter uma prévia de como o espelho dos seus sonhos ficará no seu ambiente. Envie uma foto e descreva sua ideia!
          </p>
        </div>
        <VisualizeForm />
      </div>
    </section>
  );
}
