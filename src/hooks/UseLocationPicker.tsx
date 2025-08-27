import { useState, useCallback } from "react";

interface PickedLocation {
  lat: number;
  lng: number;
  address: string;
}

export const useLocationPicker = () => {
  const [location, setLocation] = useState<PickedLocation | null>(null);
  const [loading, setLoading] = useState(false);

  const handleMapClick = useCallback(async (lat: number, lng: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await res.json();

      setLocation({
        lat,
        lng,
        address: data.display_name || `${lat}, ${lng}`,
      });
    } catch (err) {
      console.error("Error fetching location:", err);
      setLocation({ lat, lng, address: `${lat}, ${lng}` });
    } finally {
      setLoading(false);
    }
  }, []);

  return { location, loading, handleMapClick };
};
