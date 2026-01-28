"use client";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Poem } from "@/types/poem";
import PoemPreview from "@/components/preview/PoemPreview";

const poemIcon = new L.Icon({
  iconUrl: "/markers/marker-poem.svg",
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -28],
});

interface PoemMarkerProps {
  poem: Poem;
}

export default function PoemMarker({ poem }: PoemMarkerProps) {
  return (
    <Marker
      position={[poem.location.coordinates.lat, poem.location.coordinates.lng]}
      icon={poemIcon}
    >
      <Popup>
        <PoemPreview poem={poem} />
      </Popup>
    </Marker>
  );
}
