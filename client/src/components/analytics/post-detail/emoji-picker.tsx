"use client";

import { useEffect, useRef, useState } from "react";
import { Smile } from "lucide-react";

const EMOJIS = [
  "😀","😂","🥲","😊","😍","😘","😎","🤔","😅","😭","😡","🥺",
  "🙏","👍","👎","👏","🙌","💪","🫶","🤝","✌️","🔥","⭐","✨",
  "💯","🎉","🎊","❤️","🧡","💛","💚","💙","💜","🖤","🤍","💔",
  "💕","💖","✅","❌","❓","❗","👀","🚀","💡","⚡","🎯","📊",
  "📈","🏆","💼","🎁","🌟","🤩","🥳","😴","🤯","😬","😏","🙈",
];

type Props = { onPick: (emoji: string) => void };

export function EmojiPicker({ onPick }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function pick(e: string) {
    onPick(e);
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button" aria-label="Add emoji" aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="rounded-md p-1.5 text-muted-foreground hover:bg-zinc-100 hover:text-foreground"
      >
        <Smile className="size-4" />
      </button>
      {open && (
        <div className="absolute bottom-full left-0 z-30 mb-2 w-[252px] rounded-xl border border-zinc-200 bg-white p-2 shadow-lg">
          <div className="grid grid-cols-8 gap-0.5">
            {EMOJIS.map((e) => (
              <button
                key={e} type="button" onClick={() => pick(e)}
                className="rounded-md p-1 text-lg leading-none hover:bg-zinc-100"
              >
                {e}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
