type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, sub, align = "left" }: Props) {
  const a = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`flex flex-col gap-5 ${a}`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[#6D5FF9]">
          <span className="size-1 rounded-full bg-[#6D5FF9]" />
          {eyebrow}
        </span>
      )}
      <h2 className="max-w-3xl text-[34px] font-semibold leading-[1.05] tracking-[-0.02em] text-[#0F1113] md:text-[48px]">
        {title}
      </h2>
      {sub && (
        <p className="max-w-2xl text-[15px] leading-[1.6] tracking-tight text-[#525252]">
          {sub}
        </p>
      )}
    </div>
  );
}
