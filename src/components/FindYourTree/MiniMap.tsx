
type MiniMapProps = {
  isVisible: boolean;
  location: string;
};

const MiniMap = ({ isVisible, location }: MiniMapProps) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="mt-8 animate-fade-in">
      <h2 className="mb-4 text-xl font-bold">Planting Location</h2>
      <div className="overflow-hidden rounded-lg border">
        <div className="relative h-64 w-full bg-gray-100">
          {/* In a real implementation, this would be an actual map component */}
          <div className="flex h-full items-center justify-center bg-[url('https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&q=80')] bg-cover bg-center">
            <div className="absolute inset-0 bg-eco-green/10"></div>
            <div className="rounded-full bg-eco-green p-2 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
          </div>
        </div>
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
