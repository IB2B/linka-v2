import Image from "next/image";

type Props = { className?: string; size?: number };

export function BrandLogo({ className, size = 20 }: Props) {
  return (
    <Image
      src="/logo.png"
      alt=""
      width={size}
      height={size}
      className={className}
    />
  );
}
