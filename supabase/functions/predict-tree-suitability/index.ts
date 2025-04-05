
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// This is a simplified pre-trained model implementation
// In a real application, this would use TensorFlow.js or a similar library
// with an actual trained model
function predictTreeSuitability(input: { aqi: number; temperature: number; space: number; location: string }) {
  const { aqi, temperature, space, location } = input;
  
  // Use location to modify recommendations slightly (simplified simulation)
  const isWarm = location.toLowerCase().includes('florida') || 
                 location.toLowerCase().includes('california') || 
                 location.toLowerCase().includes('texas');
  
  const isUrban = location.toLowerCase().includes('new york') || 
                  location.toLowerCase().includes('chicago') || 
                  location.toLowerCase().includes('los angeles');
  
  // Simplified tree recommendation logic based on input parameters
  // This simulates what an ML model would do with these inputs
  const trees = [
    {
      id: "1",
      name: "Red Maple",
      scientificName: "Acer rubrum",
      score: calculateScore(aqi, temperature, space, { 
        aqiThreshold: 100, 
        tempRange: isWarm ? [10, 35] : [5, 30], 
        spaceNeeded: 10,
        urbanSuitable: true
      }, isUrban),
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80",
    },
    {
      id: "2",
      name: "River Birch",
      scientificName: "Betula nigra",
      score: calculateScore(aqi, temperature, space, { 
        aqiThreshold: 120, 
        tempRange: isWarm ? [15, 40] : [10, 35], 
        spaceNeeded: 8,
        urbanSuitable: true
      }, isUrban),
      image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80",
    },
    {
      id: "3",
      name: "Green Giant Arborvitae",
      scientificName: "Thuja standishii × plicata",
      score: calculateScore(aqi, temperature, space, { 
        aqiThreshold: 150, 
        tempRange: isWarm ? [5, 30] : [0, 25], 
        spaceNeeded: 5,
        urbanSuitable: true
      }, isUrban),
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80",
    },
    {
      id: "4",
      name: "Eastern Redbud",
      scientificName: "Cercis canadensis",
      score: calculateScore(aqi, temperature, space, { 
        aqiThreshold: 110, 
        tempRange: isWarm ? [10, 35] : [5, 30], 
        spaceNeeded: 6,
        urbanSuitable: true
      }, isUrban),
      image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&q=80",
    },
    {
      id: "5",
      name: "Live Oak",
      scientificName: "Quercus virginiana",
      score: calculateScore(aqi, temperature, space, { 
        aqiThreshold: 130, 
        tempRange: isWarm ? [20, 45] : [15, 40], 
        spaceNeeded: 15,
        urbanSuitable: false
      }, isUrban),
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&q=80",
    },
    {
      id: "6",
      name: "Japanese Maple",
      scientificName: "Acer palmatum",
      score: calculateScore(aqi, temperature, space, { 
        aqiThreshold: 90, 
        tempRange: isWarm ? [10, 30] : [5, 25], 
        spaceNeeded: 4,
        urbanSuitable: true
      }, isUrban),
      image: "https://images.unsplash.com/photo-1590611380053-bb32522a975b?auto=format&fit=crop&q=80",
    },
    {
      id: "7",
      name: "Southern Magnolia",
      scientificName: "Magnolia grandiflora",
      score: calculateScore(aqi, temperature, space, { 
        aqiThreshold: 110, 
        tempRange: isWarm ? [15, 40] : [10, 30], 
        spaceNeeded: 12,
        urbanSuitable: false
      }, isUrban),
      image: "https://images.unsplash.com/photo-1622730000579-20f9296daa02?auto=format&fit=crop&q=80",
    },
  ];
  
  // Sort by score (higher is better) and return top results
  return trees.sort((a, b) => b.score - a.score);
}

// Calculate suitability score based on environmental factors
function calculateScore(
  aqi: number, 
  temperature: number, 
  space: number, 
  preferences: { 
    aqiThreshold: number; 
    tempRange: [number, number]; 
    spaceNeeded: number;
    urbanSuitable: boolean;
  },
  isUrban: boolean
): number {
  let score = 0;
  
  // AQI handling - trees that can tolerate higher pollution receive higher scores
  // when the air quality is poor
  const aqiFactor = Math.min(1, preferences.aqiThreshold / Math.max(aqi, 20));
  score += aqiFactor * 25; // 25% weight to AQI
  
  // Temperature suitability
  const [minTemp, maxTemp] = preferences.tempRange;
  let tempFactor = 0;
  if (temperature >= minTemp && temperature <= maxTemp) {
    const tempMidpoint = (minTemp + maxTemp) / 2;
    // Higher score when temperature is closer to the ideal midpoint
    tempFactor = 1 - Math.abs(temperature - tempMidpoint) / (maxTemp - minTemp);
  }
  score += tempFactor * 35; // 35% weight to temperature
  
  // Space availability
  const spaceFactor = space >= preferences.spaceNeeded ? 
    1 : Math.max(0, space / preferences.spaceNeeded);
  score += spaceFactor * 25; // 25% weight to space
  
  // Urban suitability bonus
  if (isUrban && preferences.urbanSuitable) {
    score += 15; // 15% bonus for urban-suitable trees in urban areas
  } else if (!isUrban && !preferences.urbanSuitable) {
    score += 15; // 15% bonus for non-urban trees in non-urban areas
  }
  
  return Math.round(score * 100) / 100; // Return score from 0-100 with 2 decimal precision
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Parse request body
    const { aqi, temperature, space, location } = await req.json();
    
    // Validate inputs
    if (typeof aqi !== 'number' || typeof temperature !== 'number' || typeof space !== 'number') {
      return new Response(
        JSON.stringify({ error: 'Invalid input. AQI, temperature, and space must be numbers.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    if (!location || typeof location !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Location is required and must be a string.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Get predictions
    const predictions = predictTreeSuitability({ aqi, temperature, space, location });
    
    // Return predictions
    return new Response(
      JSON.stringify({
        predictions: predictions.slice(0, 3), // Return top 3 recommendations
        message: "Predictions based on environmental factors and location"
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error processing prediction:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process prediction' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
