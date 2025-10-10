import { useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface LocationPickerReadOnlyProps {
  initialLocation: [number, number]; // Required prop for event location
}

export default function LocationPickerReadOnly({ initialLocation }: LocationPickerReadOnlyProps) {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Center the map on the initial location
    mapRef.current.setView(initialLocation, 15);
  }, [initialLocation]);

  return (
    <MapContainer
      center={initialLocation}
      zoom={15}
      style={{ height: "400px", width: "100%" }}
      whenReady={(e) => {
        mapRef.current = e.target;
      }}
      // Disable all interactions
      dragging={false}
      touchZoom={false}
      doubleClickZoom={false}
      scrollWheelZoom={false}
      boxZoom={false}
      keyboard={false}
      zoomControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={initialLocation} interactive={false}>
        <Popup autoClose={false} closeOnClick={false} closeButton={false}>
          Event Location
        </Popup>
      </Marker>
    </MapContainer>
  );
}