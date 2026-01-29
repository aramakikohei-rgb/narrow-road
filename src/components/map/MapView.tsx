"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { Poem } from "@/types/poem";
import PoemMarker from "./PoemMarker";

interface MapViewProps {
  poems: Poem[];
}

export default function MapView({ poems }: MapViewProps) {
  const defaultCenter: [number, number] = [30.0, 100.0];
  const defaultZoom = 3;

  return (
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      className="h-full w-full"
      zoomControl={false}
      scrollWheelZoom={true}
      style={{ background: "#FAFAFA" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
        className="map-tiles-muted"
      />
      {poems.map((poem) => (
        <PoemMarker key={poem.id} poem={poem} />
      ))}
    </MapContainer>
  );
}
