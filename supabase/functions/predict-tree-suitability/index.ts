
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// This is a simplified pre-trained model implementation
// In a real application, this would use TensorFlow.js or a similar library
// with an actual trained model
function predictTreeSuitability(input: { aqi: number; temperature: number; space: number }) {
  const { aqi, temperature, space } = input;
  
  // Simplified tree recommendation logic based on input parameters
  // This simulates what an ML model would do with these inputs
  const trees = [
    {
      id: "1",
      name: "Red Maple",
      scientificName: "Acer rubrum",
      score: calculateScore(aqi, temperature, space, { aqiThreshold: 100, tempRange: [5, 30], spaceNeeded: 10 }),
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80",
    },
    {
      id: "2",
      name: "River Birch",
      scientificName: "Betula nigra",
      score: calculateScore(aqi, temperature, space, { aqiThreshold: 120, tempRange: [10, 35], spaceNeeded: 8 }),
      image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80",
    },
    {
      id: "3",
      name: "Green Giant Arborvitae",
      scientificName: "Thuja standishii × plicata",
      score: calculateScore(aqi, temperature, space, { aqiThreshold: 150, tempRange: [0, 25], spaceNeeded: 5 }),
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80",
    },
    {
      id: "4",
      name: "Eastern Redbud",
      scientificName: "Cercis canadensis",
      score: calculateScore(aqi, temperature, space, { aqiThreshold: 110, tempRange: [5, 30], spaceNeeded: 6 }),
      image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&q=80",
    },
    {
      id: "5",
      name: "Live Oak",
      scientificName: "Quercus virginiana",
      score: calculateScore(aqi, temperature, space, { aqiThreshold: 130, tempRange: [15, 40], spaceNeeded: 15 }),
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&q=80",
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
  preferences: { aqiThreshold: number; tempRange: [number, number]; spaceNeeded: number }
): number {
  let score = 0;
  
  // AQI handling - trees that can tolerate higher pollution receive higher scores
  // when the air quality is poor
  const aqiFactor = Math.min(1, preferences.aqiThreshold / Math.max(aqi, 20));
  score += aqiFactor * 30; // 30% weight to AQI
  
  // Temperature suitability
  const [minTemp, maxTemp] = preferences.tempRange;
  let tempFactor = 0;
  if (temperature >= minTemp && temperature <= maxTemp) {
    const tempMidpoint = (minTemp + maxTemp) / 2;
    // Higher score when temperature is closer to the ideal midpoint
    tempFactor = 1 - Math.abs(temperature - tempMidpoint) / (maxTemp - minTemp);
  }
  score += tempFactor * 40; // 40% weight to temperature
  
  // Space availability
  const spaceFactor = space >= preferences.spaceNeeded ? 
    1 : Math.max(0, space / preferences.spaceNeeded);
  score += spaceFactor * 30; // 30% weight to space
  
  return Math.round(score * 100) / 100; // Return score from 0-100 with 2 decimal precision
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Parse request body
    const { aqi, temperature, space } = await req.json();
    
    // Validate inputs
    if (typeof aqi !== 'number' || typeof temperature !== 'number' || typeof space !== 'number') {
      return new Response(
        JSON.stringify({ error: 'Invalid input. AQI, temperature, and space must be numbers.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Get predictions
    const predictions = predictTreeSuitability({ aqi, temperature, space });
    
    // Return predictions
    return new Response(
      JSON.stringify({
        predictions: predictions.slice(0, 3), // Return top 3 recommendations
        message: "Predictions based on environmental factors"
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
