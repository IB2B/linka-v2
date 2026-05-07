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
        <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#737373]">
          <span className="h-px w-6 bg-[#D4D4D4]" />
          {eyebrow}
        </span>
      )}
      <h2 className="max-w-3xl text-[40px] font-medium leading-[1.05] tracking-[-0.025em] text-[#0F1113] md:text-[56px]">
        {title}
      </h2>
      {sub && (
        <p className="max-w-2xl text-[16px] leading-[1.6] text-[#525252]">
          {sub}
        </p>
      )}
    </div>
  );
}
