import { Poem } from "@/types/poem";

interface PoemMetaProps {
  poem: Poem;
}

export default function PoemMeta({ poem }: PoemMetaProps) {
  const { location, metadata, date_created } = poem;

  return (
    <footer className="space-y-6 text-sm text-text-secondary">
      <div>
        <p className="text-xs tracking-widest uppercase mb-2">Location</p>
        <p className="font-[var(--font-noto-serif-jp)] text-foreground">
          {location.name.ja}
        </p>
        <p className="font-[var(--font-cormorant-garamond)] italic">
          {location.name.en}
        </p>
        <p className="mt-1">
          {location.region}, {location.country}
        </p>
        <p className="font-mono text-xs mt-1">
          {location.coordinates.lat.toFixed(4)}N,{" "}
          {location.coordinates.lng.toFixed(4)}E
        </p>
      </div>

      <div className="flex gap-12">
        <div>
          <p className="text-xs tracking-widest uppercase mb-2">Date</p>
          <p>
            {new Date(date_created).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div>
          <p className="text-xs tracking-widest uppercase mb-2">Season</p>
          <p className="capitalize">{metadata.season}</p>
        </div>
      </div>

      <div>
        <p className="text-xs tracking-widest uppercase mb-2">Tags</p>
        <div className="flex gap-2 flex-wrap">
          {metadata.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs border border-border-subtle rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
