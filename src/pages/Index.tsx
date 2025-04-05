
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import LocationInput from "@/components/FindYourTree/LocationInput";
import SpaceAvailability from "@/components/FindYourTree/SpaceAvailability";
import RecommendationResults from "@/components/FindYourTree/RecommendationResults";
import MiniMap from "@/components/FindYourTree/MiniMap";
import HowItWorks from "@/components/FindYourTree/HowItWorks";

const Index = () => {
  const [location, setLocation] = useState("");
  const [spaceAvailable, setSpaceAvailable] = useState(5);
  const [resultsVisible, setResultsVisible] = useState(false);

  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation);
  };

  const handleSpaceChange = (space: number) => {
    setSpaceAvailable(space);
  };

  const handleGetRecommendations = () => {
    if (location) {
      setResultsVisible(true);
    }
  };

  return (
    <div className="min-h-screen pb-16">
      <Header />
      <main className="container px-4 py-6">
        <div className="mb-6">
          <h1 className="mb-1 text-2xl font-bold">Find Your Tree</h1>
          <p className="text-sm text-muted-foreground">
            Get eco-friendly tree suggestions tailored to your space and city.
          </p>
        </div>
        
        <LocationInput onLocationSelect={handleLocationSelect} />
        <SpaceAvailability onSpaceChange={handleSpaceChange} />
        
        <Button 
          onClick={handleGetRecommendations}
          disabled={!location}
          className="w-full bg-eco-green hover:bg-eco-dark-green"
        >
          Get Recommendations
        </Button>
        
        <div className="mt-8">
          <RecommendationResults 
            isVisible={resultsVisible} 
            location={location} 
          />
          
          <MiniMap 
            isVisible={resultsVisible} 
            location={location} 
          />
          
          <HowItWorks isVisible={resultsVisible} />
        </div>
      </main>
      <Navigation />
    </div>
  );
};

export default Index;
