import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Leaf, Navigation, LayoutDashboard, Heart, Settings2 } from 'lucide-react';
import { cn } from '../lib/utils';

export function Layout() {
  return (
    <div className="h-[100dvh] bg-[#FDFCF8] flex flex-col font-sans text-gray-900 border-none overflow-hidden">
      <header className="bg-white border-b border-gray-200 shrink-0 hidden sm:block">
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

      {/* Mobile header */}
      <header className="sm:hidden bg-white border-b border-gray-200 shrink-0 p-3 flex items-center justify-center z-10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-900 rounded flex items-center justify-center text-white font-bold text-xs">W</div>
          <span className="font-bold tracking-tight text-base">WhatIf <span className="text-green-800 font-normal">RuralUtility</span></span>
        </div>
      </header>

      <main className="flex-1 w-full overflow-hidden flex flex-col relative min-h-0 bg-white sm:bg-[#FDFCF8]">
        <Outlet />
      </main>

      {/* Mobile nav */}
      <nav className="sm:hidden shrink-0 bg-white border-t border-gray-200 z-50">
         <div className="flex justify-around px-2 py-2 pb-safe">
            <NavLink to="/plan" className={({isActive}) => cn("flex flex-col items-center p-1", isActive ? "text-green-900" : "text-gray-500")}>
               <Navigation className="w-5 h-5 mb-1"/>
               <span className="text-[10px] font-medium uppercase tracking-wider">Plan</span>
            </NavLink>
            <NavLink to="/forecast" className={({isActive}) => cn("flex flex-col items-center p-1", isActive ? "text-green-900" : "text-gray-500")}>
               <Settings2 className="w-5 h-5 mb-1"/>
               <span className="text-[10px] font-medium uppercase tracking-wider">Forecast</span>
            </NavLink>
            <NavLink to="/" className={({isActive}) => cn("flex flex-col items-center p-1", isActive ? "text-green-900" : "text-gray-500")}>
               <LayoutDashboard className="w-5 h-5 mb-1"/>
               <span className="text-[10px] font-medium uppercase tracking-wider">What If</span>
            </NavLink>
            <NavLink to="/favorites" className={({isActive}) => cn("flex flex-col items-center p-1", isActive ? "text-green-900" : "text-gray-500")}>
               <Heart className="w-5 h-5 mb-1"/>
               <span className="text-[10px] font-medium uppercase tracking-wider">Favorites</span>
            </NavLink>
         </div>
      </nav>
    </div>
  );
}
