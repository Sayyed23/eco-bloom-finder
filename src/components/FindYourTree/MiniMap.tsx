
import { useEffect, useRef } from "react";

type MiniMapProps = {
  isVisible: boolean;
  location: string;
};

const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

const MiniMap = ({ isVisible, location }: MiniMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  
  useEffect(() => {
    if (!isVisible || !location || !mapRef.current) return;

    // Initialize Google Maps only when component is visible and has a location
    const loadGoogleMaps = async () => {
      // Check if Google Maps script is already loaded
      if (!window.google || !window.google.maps) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        return new Promise<void>((resolve) => {
          script.onload = () => resolve();
        });
      }
    };

    const initMap = async () => {
      await loadGoogleMaps();
      
      // Use geocoding to convert address to coordinates
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: location }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          const { location: coords } = results[0].geometry;
          
          if (mapRef.current) {
            mapInstanceRef.current = new google.maps.Map(mapRef.current, {
              center: coords,
              zoom: 15,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: false
            });

            // Add marker for the location
            new google.maps.Marker({
              position: coords,
              map: mapInstanceRef.current,
              title: "Planting Location",
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: "#22c55e", // Green color
                fillOpacity: 1,
                strokeWeight: 0,
                scale: 10
              }
            });
          }
        }
      });
    };

    initMap();
  }, [isVisible, location]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="mt-8 animate-fade-in">
      <h2 className="mb-4 text-xl font-bold">Planting Location</h2>
      <div className="overflow-hidden rounded-lg border">
        <div ref={mapRef} className="h-64 w-full bg-gray-100"></div>
        <div className="bg-white p-3">
          <div className="text-sm">
            <span className="font-medium">Selected Location:</span> {location}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniMap;
