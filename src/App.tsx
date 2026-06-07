/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { FavoritesPage } from './pages/FavoritesPage';
import { ToolDetailsPage } from './pages/ToolDetailsPage';

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="h-full w-full overflow-y-auto bg-gray-50 sm:bg-transparent flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl border border-gray-200 text-center max-w-sm w-full shadow-sm">
        <h1 className="text-xl font-bold text-gray-900 mb-2 uppercase tracking-wide">{title}</h1>
        <p className="text-xs text-gray-500 font-medium tracking-wide">Module under development.</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="tool/:id" element={<ToolDetailsPage />} />
          <Route path="plan" element={<PlaceholderPage title="Planning Hub" />} />
          <Route path="forecast" element={<PlaceholderPage title="Forecasting Models" />} />
        </Route>
      </Routes>
    </Router>
  );
}

