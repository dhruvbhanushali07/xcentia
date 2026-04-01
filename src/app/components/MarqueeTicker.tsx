// app/_components/MarqueeTicker.tsx
"use client";

// Infinitely scrolling ticker strip between hero and categories.
// Pure CSS animation — no library needed.

interface Props {
  words: string[];
}

export default function MarqueeTicker({ words }: Props) {
  // Double the words so the loop is seamless
  const doubled = [...words, ...words];

  return (
    <div className="w-full overflow-hidden bg-[#211911] py-4 flex items-center border-y border-[#f8f7f6]/5">
      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          display: flex;
          width: max-content;
          animation: ticker 28s linear infinite;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="ticker-track">
        {doubled.map((word, i) => (
          <span key={i} className="flex items-center gap-0 flex-shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#f8f7f6]/55 px-8 whitespace-nowrap">
              {word}
            </span>
            <span className="text-[#b36619] text-[8px] flex-shrink-0">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}