type Props = { title: string; children: React.ReactNode };

export function UserDetailSection({ title, children }: Props) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-xs font-semibold tracking-tight uppercase text-muted-foreground">
        {title}
      </h3>
      {children}
    </section>
  );
}
