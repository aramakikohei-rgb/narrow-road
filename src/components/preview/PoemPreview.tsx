"use client";

import Link from "next/link";
import { Poem } from "@/types/poem";

interface PoemPreviewProps {
  poem: Poem;
}

export default function PoemPreview({ poem }: PoemPreviewProps) {
  const firstLineJa = poem.body.ja.split("\n")[0];
  const firstLineEn = poem.body.en.split("\n")[0];

  return (
    <div className="p-5 min-w-[240px] max-w-[300px]">
      <p className="text-xs text-text-secondary tracking-widest uppercase mb-3">
        {poem.location.name.en}
      </p>

      <h3 className="font-[var(--font-noto-serif-jp)] text-base font-bold mb-1">
        {poem.title.ja}
      </h3>
      <h4 className="font-[var(--font-cormorant-garamond)] text-sm italic text-text-secondary mb-3">
        {poem.title.en}
      </h4>

      <p className="font-[var(--font-noto-serif-jp)] text-sm mb-1">
        {firstLineJa}
      </p>
      <p className="font-[var(--font-cormorant-garamond)] text-xs italic text-text-secondary mb-4">
        {firstLineEn}
      </p>

      <div className="border-t border-border-subtle mb-4" />

      <Link
        href={`/poems/${poem.slug}`}
        className="text-xs tracking-widest uppercase text-accent hover:text-marker transition-colors duration-300"
      >
        Read poem →
      </Link>
    </div>
  );
}
