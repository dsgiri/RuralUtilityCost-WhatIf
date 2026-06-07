import React from 'react';
import { Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ToolItem } from '../types';
import { cn } from '../lib/utils';
import { useFavorites } from '../hooks/useFavorites';

interface ToolCardProps {
  key?: React.Key;
  tool: ToolItem;
}

export function ToolCard({ tool }: ToolCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  const fav = isFavorite(tool.id);

  return (
    <div className="bg-white border border-gray-200 p-4 flex flex-col justify-between transition-all duration-200 hover:border-green-900 hover:shadow-[0_4px_12px_rgba(54,83,20,0.05)] min-h-[160px]">
      <div>
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wide text-green-700 bg-green-50 px-1.5 py-0.5 rounded">
            {tool.category}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(tool.id);
            }}
            aria-label={fav ? "Remove from favorites" : "Add to favorites"}
            className={cn(
              "focus:outline-none transition-colors",
              fav ? "text-red-500" : "text-gray-300 hover:text-gray-400"
            )}
          >
            <Heart className="w-5 h-5" fill={fav ? "currentColor" : "none"} strokeWidth={2} />
          </button>
        </div>
        <h4 className="font-bold text-sm mb-1 text-gray-900">{tool.title}</h4>
        <p className="text-xs text-gray-500 leading-snug line-clamp-3">{tool.description}</p>
      </div>
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
        <div className="text-[10px]">
          <span className="text-gray-400 block uppercase">Key Variable</span>
          <span className="font-semibold text-gray-700">{tool.keyVariable}</span>
        </div>
        <button
          onClick={() => navigate(tool.route)}
          className="bg-green-900 text-white text-[10px] px-3 py-1.5 rounded font-bold hover:bg-green-800 transition-colors uppercase focus:outline-none focus:ring-2 focus:ring-green-900 focus:ring-offset-1"
        >
          Launch
        </button>
      </div>
    </div>
  );
}
