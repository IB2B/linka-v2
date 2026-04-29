export function EmptyRow({ message }: { message: string }) {
  return (
    <p className="py-6 text-center text-sm text-muted-foreground">
      {message}
    </p>
  );
}
