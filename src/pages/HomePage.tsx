import React, { useState } from 'react';
import { Search, Heart } from 'lucide-react';
import { TOOLS } from '../data/tools';
import { Category } from '../types';
import { ToolCard } from '../components/ToolCard';
import { useFavorites } from '../hooks/useFavorites';

const CATEGORIES: Category[] = [
  'Cost scenarios',
  'Price scenarios',
  'Yield scenarios',
  'Livestock scenarios',
  'Input rate scenarios',
  'Risk comparison scenarios'
];

export function HomePage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const { favorites, toggleFavorite } = useFavorites();

  const filteredTools = TOOLS.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(search.toLowerCase()) || 
                          tool.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const favoriteTools = TOOLS.filter(tool => favorites.includes(tool.id));

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header spanning all columns visually */}
      <header className="border-b border-gray-200 bg-white px-4 py-4 md:px-8 md:py-6 flex flex-col md:flex-row md:items-center justify-between shrink-0 gap-4">
        <div className="flex-1">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">Scenario Comparison Hub</h1>
          <p className="text-xs md:text-sm text-gray-500 max-w-2xl">
            Explore potential outcomes for your operation. Adjust inputs, compare risk, and find optimal utility paths.
          </p>
        </div>
        <div className="w-full md:w-64 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search scenarios..."
            className="w-full bg-gray-50 border border-gray-200 rounded-md py-2 pl-9 pr-3 text-sm focus:outline-none focus:border-green-900 transition-colors"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-[220px] border-r border-gray-200 bg-white p-4 hidden lg:flex flex-col shrink-0 overflow-y-auto">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Categories</h3>
          <div className="space-y-1 flex-1">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`w-full text-left px-4 py-2 text-sm rounded ${selectedCategory === 'All' ? 'bg-gray-100 text-green-900 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              All Scenarios
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`w-full text-left px-4 py-2 text-sm rounded ${selectedCategory === cat ? 'bg-gray-100 text-green-900 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-amber-50 rounded border border-amber-100">
            <h4 className="text-[10px] font-bold text-amber-800 uppercase mb-1">Pro Tip</h4>
            <p className="text-xs text-amber-700 leading-relaxed">
              Compare 'Base Case' vs 'Price Shock' to evaluate your liquidity buffer.
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 lg:bg-[#FDFCF8] overflow-y-auto p-4 md:p-6 lg:p-8 relative">
          {/* Mobile Categories - hidden on desktop where sidebar is visible */}
          <div className="lg:hidden flex flex-nowrap overflow-x-auto gap-2 pb-2 mb-4 scrollbar-hide shrink-0 -mx-4 px-4 sm:mx-0 sm:px-0">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-bold ${selectedCategory === 'All' ? 'bg-green-900 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}
            >
              All Scenarios
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-bold ${selectedCategory === cat ? 'bg-green-900 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTools.map(tool => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded border border-dashed border-gray-300">
              <p className="text-gray-500 text-sm">No scenarios match your search criteria.</p>
              <button 
                onClick={() => { setSearch(''); setSelectedCategory('All'); }}
                className="mt-3 text-green-800 text-sm font-semibold hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </main>

        {/* Right Sidebar */}
        <aside className="w-[260px] border-l border-gray-200 bg-white hidden xl:flex flex-col shrink-0">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">My Favorites</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {favoriteTools.length > 0 ? (
              <div className="space-y-2">
                {favoriteTools.map(t => (
                  <div key={t.id} className="flex items-center gap-3 p-2 border border-dashed border-gray-200 rounded">
                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-xs font-bold text-gray-500 shrink-0">
                      {t.title.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-bold text-gray-900 truncate">{t.title}</div>
                      <div className="text-[9px] text-gray-400 uppercase truncate">{t.category}</div>
                    </div>
                    <button 
                      onClick={() => toggleFavorite(t.id)} 
                      className="text-red-400 hover:text-red-600 shrink-0 p-1"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 opacity-50">
                <Heart className="w-6 h-6 mx-auto mb-2 text-gray-300" />
                <p className="text-[10px] font-medium text-gray-500 uppercase">No favorites</p>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-2">How Scenarios Work</h4>
            <p className="text-[10px] leading-tight text-gray-500 italic">
              Compare a static base case against adjusted variables to visualize net margins and operational impact.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
