export interface BilingualText {
  ja: string;
  en: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface PoemLocation {
  name: BilingualText;
  coordinates: Coordinates;
  country: string;
  region: string;
}

export interface AudioMedia {
  file: string;
  duration: number;
  type: string;
}

export interface ImageMedia {
  file: string;
  alt: BilingualText;
  caption: BilingualText;
  is_primary: boolean;
}

export interface PoemMetadata {
  tags: string[];
  season: "spring" | "summer" | "autumn" | "winter";
  status: "published" | "draft";
}

export interface Poem {
  id: string;
  slug: string;
  title: BilingualText;
  body: BilingualText;
  date_created: string;
  location: PoemLocation;
  media: {
    audio: AudioMedia;
    images: ImageMedia[];
  };
  metadata: PoemMetadata;
}
