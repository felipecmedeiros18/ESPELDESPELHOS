import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <a href="/" aria-label="ESPELD Home" className="flex items-center gap-3">
      <Image src="https://i.imgur.com/l3z6Wu0.png" alt="ESPELD Logo" width={32} height={32} className="h-8 w-8" />
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
