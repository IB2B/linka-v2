type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, sub, align = "left" }: Props) {
  const a = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`flex flex-col gap-4 ${a}`}>
      {eyebrow && (
        <span className="text-[13px] font-medium tracking-tight text-[#6D5FF9]">
          {eyebrow}
        </span>
      )}
      <h2 className="max-w-3xl text-[34px] font-semibold leading-[1.1] tracking-tight text-[#0F1113] md:text-[44px]">
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
