import fs from "fs";
import path from "path";
import { Poem } from "@/types/poem";

// CMS flat format type
interface CMSPoem {
  id: string;
  slug: string;
  title_ja: string;
  title_en: string;
  body_ja: string;
  body_en: string;
  date_created: string;
  location: {
    name_ja: string;
    name_en: string;
    lat: number;
    lng: number;
    country: string;
    region: string;
  };
  audio: {
    file: string;
    duration: number;
    type: string;
  };
  images: Array<{
    file: string;
    alt_ja: string;
    alt_en: string;
    caption_ja: string;
    caption_en: string;
    is_primary: boolean;
  }>;
  tags: string[];
  season: "spring" | "summer" | "autumn" | "winter";
  status: "published" | "draft";
}

// Transform CMS format to app format
function transformCMSPoem(cms: CMSPoem): Poem {
  return {
    id: cms.id,
    slug: cms.slug,
    title: {
      ja: cms.title_ja,
      en: cms.title_en,
    },
    body: {
      ja: cms.body_ja,
      en: cms.body_en,
    },
    date_created: cms.date_created,
    location: {
      name: {
        ja: cms.location.name_ja,
        en: cms.location.name_en,
      },
      coordinates: {
        lat: cms.location.lat,
        lng: cms.location.lng,
      },
      country: cms.location.country,
      region: cms.location.region,
    },
    media: {
      audio: cms.audio,
      images: cms.images.map((img) => ({
        file: img.file,
        alt: {
          ja: img.alt_ja,
          en: img.alt_en,
        },
        caption: {
          ja: img.caption_ja,
          en: img.caption_en,
        },
        is_primary: img.is_primary,
      })),
    },
    metadata: {
      tags: cms.tags,
      season: cms.season,
      status: cms.status,
    },
  };
}

// Read all poems from individual JSON files
function loadPoems(): Poem[] {
  const poemsDir = path.join(process.cwd(), "src/data/poems");

  if (!fs.existsSync(poemsDir)) {
    return [];
  }

  const files = fs.readdirSync(poemsDir).filter((f) => f.endsWith(".json"));

  return files.map((file) => {
    const filePath = path.join(poemsDir, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const cmsPoem: CMSPoem = JSON.parse(content);
    return transformCMSPoem(cmsPoem);
  });
}

// Cache poems at module level for performance
let poemsCache: Poem[] | null = null;

function getPoems(): Poem[] {
  if (poemsCache === null) {
    poemsCache = loadPoems();
  }
  return poemsCache;
}

export function getAllPoems(): Poem[] {
  return getPoems().filter((p) => p.metadata.status === "published");
}

export function getPoemBySlug(slug: string): Poem | undefined {
  return getPoems().find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return getPoems()
    .filter((p) => p.metadata.status === "published")
    .map((p) => p.slug);
}
