export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-r-transparent" />
        <p className="animate-pulse text-sm font-medium text-muted-foreground uppercase tracking-widest">Loading...</p>
      </div>
    </div>
  );
}
