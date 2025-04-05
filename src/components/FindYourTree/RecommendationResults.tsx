
import TreeCard, { Tree } from "./TreeCard";
import { Droplets, ThermometerSun, Wind } from "lucide-react";

type RecommendationResultsProps = {
  isVisible: boolean;
  location: string;
};

const RecommendationResults = ({ isVisible, location }: RecommendationResultsProps) => {
  // Mock data - in a real app, this would come from an API based on user inputs
  const recommendedTrees: Tree[] = [
    {
      id: "1",
      name: "Red Maple",
      scientificName: "Acer rubrum",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80",
      description: "Known for vibrant autumn colors. Adapts well to various soil conditions.",
      benefits: [
        { name: "Air Quality", level: "high", icon: <Wind className="h-3 w-3" /> },
        { name: "Shade", level: "high", icon: <ThermometerSun className="h-3 w-3" /> },
        { name: "Water", level: "medium", icon: <Droplets className="h-3 w-3" /> },
      ],
    },
    {
      id: "2",
      name: "River Birch",
      scientificName: "Betula nigra",
      image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80",
      description: "Excellent for wet areas with attractive peeling bark.",
      benefits: [
        { name: "Air Quality", level: "medium", icon: <Wind className="h-3 w-3" /> },
        { name: "Shade", level: "medium", icon: <ThermometerSun className="h-3 w-3" /> },
        { name: "Water", level: "high", icon: <Droplets className="h-3 w-3" /> },
      ],
    },
    {
      id: "3",
      name: "Green Giant Arborvitae",
      scientificName: "Thuja standishii × plicata",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80",
      description: "Fast-growing evergreen perfect for privacy screens.",
      benefits: [
        { name: "Air Quality", level: "high", icon: <Wind className="h-3 w-3" /> },
        { name: "Shade", level: "low", icon: <ThermometerSun className="h-3 w-3" /> },
        { name: "Water", level: "low", icon: <Droplets className="h-3 w-3" /> },
      ],
    },
  ];

  if (!isVisible) {
    return null;
  }

  return (
    <div className="animate-fade-in">
      <h2 className="mb-4 text-xl font-bold">Top Tree Picks for You</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {recommendedTrees.map((tree) => (
          <TreeCard key={tree.id} tree={tree} />
        ))}
      </div>
    </div>
  );
};

export default RecommendationResults;
