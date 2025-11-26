import { useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;
// --------------------------------------------

export default function LocationPickerReadOnly({ initialLocation }) {

  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.setView(initialLocation, 15);
  }, [initialLocation]);

  return (
    <MapContainer
      center={initialLocation}
      zoom={15}
      style={{ height: "400px", width: "100%" }}
      whenReady={(e) => (mapRef.current = e.target)}
      dragging={false}
      touchZoom={false}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      zoomControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={initialLocation}>
        <Popup>Event Location</Popup>
      </Marker>
    </MapContainer>
  );
}
