import { getAllPoems } from "@/lib/poems";
import MapDynamic from "@/components/map/MapDynamic";

export default function HomePage() {
  const poems = getAllPoems();

  return (
    <main className="relative h-screen w-screen overflow-hidden">
      <header className="absolute top-0 left-0 z-[1000] p-8">
        <h1 className="font-[var(--font-noto-serif-jp)] text-2xl font-bold tracking-wider">
          細道
        </h1>
        <p className="font-[var(--font-cormorant-garamond)] text-sm text-text-secondary mt-1 italic">
          Narrow Road
        </p>
      </header>

      <MapDynamic poems={poems} />
    </main>
  );
}
