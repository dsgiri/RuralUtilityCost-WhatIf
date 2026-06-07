import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Leaf, Navigation, LayoutDashboard, Heart, Settings2 } from 'lucide-react';
import { cn } from '../lib/utils';

export function Layout() {
  return (
    <div className="min-h-screen bg-[#FDFCF8] flex flex-col font-sans text-gray-900 border-none">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 hidden sm:block">
        <div className="flex items-center justify-between px-6 h-[60px]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-900 rounded flex items-center justify-center text-white font-bold">W</div>
            <span className="font-bold tracking-tight text-lg">WhatIf <span className="text-green-800 font-normal">RuralUtility</span></span>
          </div>
          <nav className="flex gap-8 text-sm font-medium h-full">
            <NavLink to="/plan" className={({isActive}) => cn("flex items-center border-b-2 transition-colors", isActive ? "border-green-900 text-green-900" : "border-transparent text-gray-500 hover:text-gray-900")}>
              Plan
            </NavLink>
            <NavLink to="/forecast" className={({isActive}) => cn("flex items-center border-b-2 transition-colors", isActive ? "border-green-900 text-green-900" : "border-transparent text-gray-500 hover:text-gray-900")}>
              Forecast
            </NavLink>
            <NavLink to="/" className={({isActive}) => cn("flex items-center border-b-2 transition-colors", isActive ? "border-green-900 text-green-900" : "border-transparent text-gray-500 hover:text-gray-900")}>
              What If
            </NavLink>
            <NavLink to="/favorites" className={({isActive}) => cn("flex items-center border-b-2 transition-colors", isActive ? "border-green-900 text-green-900" : "border-transparent text-gray-500 hover:text-gray-900")}>
              My Favorites
            </NavLink>
          </nav>
          <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
            <span>Agri-Data v4.2</span>
          </div>
        </div>
      </header>

      {/* Mobile nav */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
         <div className="flex justify-between px-6 py-3">
            <NavLink to="/plan" className={({isActive}) => cn("flex flex-col items-center", isActive ? "text-green-600" : "text-gray-500")}>
               <Navigation className="w-6 h-6 mb-1"/>
               <span className="text-xs font-medium">Plan</span>
            </NavLink>
            <NavLink to="/forecast" className={({isActive}) => cn("flex flex-col items-center", isActive ? "text-green-600" : "text-gray-500")}>
               <Settings2 className="w-6 h-6 mb-1"/>
               <span className="text-xs font-medium">Forecast</span>
            </NavLink>
            <NavLink to="/" className={({isActive}) => cn("flex flex-col items-center", isActive ? "text-green-600" : "text-gray-500")}>
               <LayoutDashboard className="w-6 h-6 mb-1"/>
               <span className="text-xs font-medium">What If</span>
            </NavLink>
            <NavLink to="/favorites" className={({isActive}) => cn("flex flex-col items-center", isActive ? "text-green-600" : "text-gray-500")}>
               <Heart className="w-6 h-6 mb-1"/>
               <span className="text-xs font-medium">Favorites</span>
            </NavLink>
         </div>
      </div>

      <main className="flex-1 w-full pb-20 sm:pb-8">
        <Outlet />
      </main>
    </div>
  );
}
