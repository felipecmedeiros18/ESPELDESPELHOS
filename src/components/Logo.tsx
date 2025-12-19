import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <a href="/" aria-label="ESPELD Home">
      <span
        className={cn(
          "font-headline text-3xl font-bold tracking-tighter text-primary",
          className
        )}
      >
        ESPELD
      </span>
    </a>
  );
}
