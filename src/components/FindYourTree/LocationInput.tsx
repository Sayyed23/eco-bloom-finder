
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { useState } from "react";

type LocationInputProps = {
  onLocationSelect: (location: string) => void;
};

const LocationInput = ({ onLocationSelect }: LocationInputProps) => {
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      onLocationSelect(location);
    }
  };

  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        // In a real app, we would reverse geocode these coordinates
        setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        onLocationSelect(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
      });
    }
  };

  return (
    <div className="mb-6 space-y-2">
      <label htmlFor="location" className="block text-sm font-medium">
        Enter Your Location
      </label>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          id="location"
          type="text"
          placeholder="City, postal code, or address"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" className="bg-eco-green hover:bg-eco-dark-green">
          <MapPin className="mr-2 h-4 w-4" />
          Set
        </Button>
      </form>
      <Button
        type="button"
        variant="outline"
        onClick={useCurrentLocation}
        className="w-full border-eco-green text-eco-green hover:bg-eco-light-green/10"
      >
        Use My Current Location
      </Button>
    </div>
  );
};

export default LocationInput;
