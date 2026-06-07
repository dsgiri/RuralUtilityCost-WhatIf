import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'rural_utility_cost_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const item = localStorage.getItem(FAVORITES_KEY);
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.warn('Failed to read from localStorage', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.warn('Failed to save to localStorage', error);
    }
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(f => f !== id)
        : [id, ...prev]
    );
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return { favorites, toggleFavorite, isFavorite };
}
