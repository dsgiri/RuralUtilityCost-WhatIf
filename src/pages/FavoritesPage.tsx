import React from 'react';
import { Heart } from 'lucide-react';
import { TOOLS } from '../data/tools';
import { ToolCard } from '../components/ToolCard';
import { useFavorites } from '../hooks/useFavorites';
import { Link } from 'react-router-dom';

export function FavoritesPage() {
  const { favorites } = useFavorites();

  const favoriteTools = TOOLS.filter(tool => favorites.includes(tool.id));

  return (
    <div className="h-full w-full overflow-y-auto bg-gray-50 sm:bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="flex items-center space-x-3 mb-6">
          <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-green-900" strokeWidth={2} />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Favorites</h1>
        </div>

      {favoriteTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-gray-300">
          <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h2>
          <p className="text-gray-500 max-w-sm mx-auto mb-6">
            You haven't saved any scenarios yet. Click the heart icon on any tool card to add it to your favorites.
          </p>
          <Link 
            to="/"
            className="inline-flex items-center px-4 py-2 text-sm font-bold text-white bg-green-900 rounded hover:bg-green-800 transition-colors uppercase tracking-wider"
          >
            Browse Scenarios
          </Link>
        </div>
      )}
    </div>
    </div>
  );
}
