
import { useState } from "react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TreeCard, { Tree } from "@/components/FindYourTree/TreeCard";
import { Droplets, ThermometerSun, Wind, Search } from "lucide-react";

const TreeProfiles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterWater, setFilterWater] = useState("");
  const [filterGrowth, setFilterGrowth] = useState("");

  // Mock data for tree profiles
  const trees: Tree[] = [
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
    {
      id: "4",
      name: "Eastern Redbud",
      scientificName: "Cercis canadensis",
      image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&q=80",
      description: "Beautiful pink-purple flowers in early spring.",
      benefits: [
        { name: "Air Quality", level: "medium", icon: <Wind className="h-3 w-3" /> },
        { name: "Shade", level: "medium", icon: <ThermometerSun className="h-3 w-3" /> },
        { name: "Water", level: "medium", icon: <Droplets className="h-3 w-3" /> },
      ],
    },
    {
      id: "5",
      name: "Japanese Maple",
      scientificName: "Acer palmatum",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80",
      description: "Elegant ornamental tree with delicate foliage.",
      benefits: [
        { name: "Air Quality", level: "medium", icon: <Wind className="h-3 w-3" /> },
        { name: "Shade", level: "low", icon: <ThermometerSun className="h-3 w-3" /> },
        { name: "Water", level: "high", icon: <Droplets className="h-3 w-3" /> },
      ],
    },
    {
      id: "6",
      name: "Live Oak",
      scientificName: "Quercus virginiana",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&q=80",
      description: "Majestic evergreen oak with sprawling canopy.",
      benefits: [
        { name: "Air Quality", level: "high", icon: <Wind className="h-3 w-3" /> },
        { name: "Shade", level: "high", icon: <ThermometerSun className="h-3 w-3" /> },
        { name: "Water", level: "low", icon: <Droplets className="h-3 w-3" /> },
      ],
    },
  ];

  // Filter trees based on search and filter selections
  const filteredTrees = trees.filter((tree) => {
    const matchesSearch = tree.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         tree.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesWater = filterWater ? 
      tree.benefits.some(b => b.name === "Water" && b.level === filterWater) : 
      true;
    
    // In a real app, we'd have a growth rate property to filter on
    return matchesSearch && matchesWater;
  });

  return (
    <div className="min-h-screen pb-16">
      <Header />
      <main className="container px-4 py-6">
        <div className="mb-6">
          <h1 className="mb-1 text-2xl font-bold">Tree Profiles</h1>
          <p className="text-sm text-muted-foreground">
            Explore trees built for your city's climate.
          </p>
        </div>
        
        <div className="mb-6">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search trees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="water-filter" className="mb-1 block text-xs font-medium">
                Water Needs
              </label>
              <Select value={filterWater} onValueChange={setFilterWater}>
                <SelectTrigger id="water-filter" className="w-full">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label htmlFor="growth-filter" className="mb-1 block text-xs font-medium">
                Growth Rate
              </label>
              <Select value={filterGrowth} onValueChange={setFilterGrowth}>
                <SelectTrigger id="growth-filter" className="w-full">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  <SelectItem value="slow">Slow</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="fast">Fast</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTrees.length > 0 ? (
            filteredTrees.map((tree) => (
              <TreeCard key={tree.id} tree={tree} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-muted-foreground">No trees match your filter criteria.</p>
              <Button 
                variant="outline" 
                onClick={() => {setSearchTerm(""); setFilterWater(""); setFilterGrowth("");}}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      <Navigation />
    </div>
  );
};

export default TreeProfiles;
