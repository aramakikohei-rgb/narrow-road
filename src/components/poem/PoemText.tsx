interface PoemTextProps {
  bodyJa: string;
  bodyEn: string;
}

export default function PoemText({ bodyJa, bodyEn }: PoemTextProps) {
  return (
    <div className="space-y-8">
      <div className="poem-body font-[var(--font-noto-serif-jp)] text-xl leading-relaxed">
        {bodyJa}
      </div>

      <div className="poem-body font-[var(--font-cormorant-garamond)] text-lg italic text-text-secondary leading-relaxed">
        {bodyEn}
      </div>
    </div>
  );
}
