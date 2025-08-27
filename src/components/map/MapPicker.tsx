import { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder"; // ✅ important

interface LocationPickerProps {
  onLocationSelect: (lat: number, lng: number) => void;
   initialLocation?: [number, number] 
}

function LocationMarker({ position, setPosition, onLocationSelect }: any) {
  // capture map click
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      onLocationSelect(lat, lng);
    },
  });

  return (
    <Marker position={position}>
      <Popup>Selected Location</Popup>
    </Marker>
  );
}

export default function LocationPicker({ onLocationSelect }: LocationPickerProps) {
  const mapRef = useRef<L.Map | null>(null);
  const [position, setPosition] = useState<[number, number]>([20.5937, 78.9629]); // default India

  useEffect(() => {
    if (!mapRef.current) return;

    // ✅ add geocoder search box
    const geocoder = (L.Control as any).geocoder({
      defaultMarkGeocode: false,
    })
      .on("markgeocode", (e: any) => {
        const { center } = e.geocode;
        setPosition([center.lat, center.lng]);
        mapRef.current!.setView(center, 15);
        onLocationSelect(center.lat, center.lng);
      })
      .addTo(mapRef.current);

    return () => {
      mapRef.current?.removeControl(geocoder);
    };
  }, [onLocationSelect]);

  return (
    <MapContainer
      center={position}
      zoom={5}
      style={{ height: "400px", width: "100%" }}
      whenReady={(e) => {
        mapRef.current = e.target;
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* Marker updates on both search + click */}
      <LocationMarker
        position={position}
        setPosition={setPosition}
        onLocationSelect={onLocationSelect}
      />
    </MapContainer>
  );
}
