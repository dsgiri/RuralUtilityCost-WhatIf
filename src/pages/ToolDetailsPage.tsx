import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Info } from 'lucide-react';
import { TOOLS } from '../data/tools';
import { useFavorites } from '../hooks/useFavorites';
import { cn } from '../lib/utils';
import { FertilizerRateCalculator } from '../calculators/FertilizerRateCalculator';
import { GenericCalculator } from '../calculators/GenericCalculator';
import { useSEO } from '../hooks/useSEO';

export function ToolDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const tool = TOOLS.find(t => t.id === id);
  const { isFavorite, toggleFavorite } = useFavorites();

  useSEO({
    title: tool ? `${tool.title} | WhatIf Rural Utility` : 'Tool Not Found | WhatIf Rural Utility',
    description: tool ? tool.description : 'Scenario testing tool for agricultural and rural operations.'
  });

  if (!tool) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Scenario Not Found</h2>
        <Link to="/" className="text-green-600 hover:underline">Return to Hub</Link>
      </div>
    );
  }

  const fav = isFavorite(tool.id);

  const renderCalculator = () => {
    switch (tool.id) {
      case 'fertilizer-rate':
        return <FertilizerRateCalculator />;
      // other calculators can be mapped here
      default:
        return <GenericCalculator title={tool.title} />;
    }
  };

  return (
    <div className="h-full w-full overflow-y-auto bg-gray-50 sm:bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
        <Link to="/" className="inline-flex items-center text-[10px] uppercase font-bold text-green-800 hover:text-green-900 tracking-wider mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to What-If Hub
        </Link>

      <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-block tracking-wide px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-bold uppercase rounded">
                {tool.category}
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">{tool.title}</h1>
            <p className="text-sm text-gray-600 max-w-3xl leading-relaxed">
              {tool.description}
            </p>
          </div>
          
          <button
            onClick={() => toggleFavorite(tool.id)}
            aria-label={fav ? "Remove from favorites" : "Add to favorites"}
            className={cn(
              "flex-shrink-0 flex items-center justify-center space-x-2 px-4 py-2 rounded border text-[11px] uppercase tracking-wider font-bold transition-all focus:outline-none focus:ring-1 focus:ring-green-900",
              fav 
                ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100" 
                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            )}
          >
            <Heart className={cn("w-4 h-4", fav ? "fill-current" : "")} strokeWidth={2} />
            <span>{fav ? "Saved" : "Save to Favorites"}</span>
          </button>
        </div>
      </div>

      <div className="mb-12">
        {renderCalculator()}
      </div>

      {/* Assumptions Footer */}
      <div className="bg-gray-100 rounded-xl p-6 flex flex-col sm:flex-row gap-4 items-start border border-gray-200">
        <div className="flex-shrink-0 p-2 bg-gray-200 rounded-full text-gray-600">
          <Info className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-gray-900 mb-2">Notice of Assumptions</h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            The calculations above are for educational and exploratory planning purposes. They assume a linear relationship between input adjustments and outputs, which may not always reflect complex real-world conditions (such as severe weather, market volatility, or secondary crop effects). Always verify with regional agronomic or final financial models before making sweeping operational changes.
          </p>
        </div>
      </div>

    </div>
    </div>
  );
}
