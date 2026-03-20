import { motion } from "framer-motion";

export function ScanningLoader({ text = "SCANNING" }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4" role="status" aria-label="Loading">
      <div className="relative w-48 h-1 bg-muted overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 w-16 bg-accent"
          animate={{ x: ["-4rem", "16rem"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <p className="font-tactical text-muted-foreground animate-pulse">{text}...</p>
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3" role="alert">
      <div className="text-3xl">⚠</div>
      <p className="font-tactical text-destructive">SIGNAL ERROR</p>
      <p className="text-sm text-muted-foreground max-w-md text-center">{message}</p>
    </div>
  );
}

export function EmptyState({ message = "NO SIGNALS DETECTED IN THIS QUADRANT." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <div className="text-3xl opacity-30">◇</div>
      <p className="font-tactical text-muted-foreground">{message}</p>
    </div>
  );
}
