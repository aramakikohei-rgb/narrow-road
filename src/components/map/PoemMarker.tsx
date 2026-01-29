"use client";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Poem } from "@/types/poem";
import PoemPreview from "@/components/preview/PoemPreview";

const poemIcon = new L.Icon({
  iconUrl: "/markers/marker-poem.svg",
  iconSize: [16, 16],
  iconAnchor: [8, 8],
  popupAnchor: [0, -12],
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
