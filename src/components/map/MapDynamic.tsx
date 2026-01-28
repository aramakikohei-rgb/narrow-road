"use client";

import dynamic from "next/dynamic";
import { Poem } from "@/types/poem";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-screen flex items-center justify-center bg-background">
      <p className="font-[var(--font-cormorant-garamond)] text-sm text-text-secondary italic animate-pulse">
        Loading map...
      </p>
    </div>
  ),
});

interface MapDynamicProps {
  poems: Poem[];
}

export default function MapDynamic({ poems }: MapDynamicProps) {
  return <MapView poems={poems} />;
}
