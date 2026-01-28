import Image from "next/image";
import { ImageMedia } from "@/types/poem";

interface PoemHeroProps {
  image: ImageMedia;
}

export default function PoemHero({ image }: PoemHeroProps) {
  return (
    <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
      <Image
        src={image.file}
        alt={image.alt.en}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
