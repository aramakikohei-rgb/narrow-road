import { notFound } from "next/navigation";
import { getPoemBySlug, getAllSlugs } from "@/lib/poems";
import PoemHero from "@/components/poem/PoemHero";
import PoemText from "@/components/poem/PoemText";
import PoemMeta from "@/components/poem/PoemMeta";
import AudioPlayer from "@/components/poem/AudioPlayer";
import BackLink from "@/components/ui/BackLink";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const poem = getPoemBySlug(slug);
  if (!poem) return { title: "Poem not found" };
  return {
    title: `${poem.title.ja} — ${poem.title.en} | 細道`,
    description: poem.body.en.split("\n").join(" "),
  };
}

export default async function PoemDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const poem = getPoemBySlug(slug);

  if (!poem) {
    notFound();
  }

  const primaryImage = poem.media.images.find((img) => img.is_primary);

  return (
    <main className="min-h-screen bg-background animate-fade-in">
      <BackLink />

      {primaryImage && <PoemHero image={primaryImage} />}

      <article className="max-w-2xl mx-auto px-6 py-16">
        <p className="text-xs tracking-widest uppercase text-text-secondary mb-8">
          {poem.location.name.en} · {poem.location.region}
        </p>

        <h1 className="font-[var(--font-noto-serif-jp)] text-3xl font-bold mb-2">
          {poem.title.ja}
        </h1>
        <h2 className="font-[var(--font-cormorant-garamond)] text-xl italic text-text-secondary mb-12">
          {poem.title.en}
        </h2>

        <PoemText bodyJa={poem.body.ja} bodyEn={poem.body.en} />

        <div className="my-16">
          <AudioPlayer
            src={poem.media.audio.file}
            duration={poem.media.audio.duration}
          />
        </div>

        <div className="border-t border-border-subtle my-16" />

        <PoemMeta poem={poem} />
      </article>
    </main>
  );
}
