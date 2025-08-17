
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLocationPicker } from "@/hooks/UseLocationPicker";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function LocationMarker({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  }); 
  return null;
}

export default function LocationPicker() {
  const { location, loading, handleMapClick } = useLocationPicker();

  return (
    <div>
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "400px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker onMapClick={handleMapClick} />
        {location && (
          <Marker position={[location.lat, location.lng]} icon={markerIcon} />
        )}
      </MapContainer>

      {loading && <p>Fetching address…</p>}
      {location && (
        <div className="mt-2">
          <p><strong>Selected Address:</strong> {location.address}</p>
          <p><strong>Coordinates:</strong> {location.lat}, {location.lng}</p>
        </div>
      )}
    </div>
  );
}
