import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function FertilizerRateCalculator() {
  const [acres, setAcres] = useState(1000);
  
  // Base Case
  const [baseRate, setBaseRate] = useState(150); // lbs/acre
  const [baseCostPerTon, setBaseCostPerTon] = useState(800); // $/ton
  const [baseYield, setBaseYield] = useState(180); // bu/acre

  // Altered Case
  const [altRate, setAltRate] = useState(130);
  const [altCostPerTon, setAltCostPerTon] = useState(800);
  const [altYield, setAltYield] = useState(170);

  // Common crop price
  const [cropPrice, setCropPrice] = useState(5.50); // $/bu

  // Calculations
  const lbsPerTon = 2000;
  
  const baseFertilizerCostPerAcre = (baseRate / lbsPerTon) * baseCostPerTon;
  const baseTotalFertilizerCost = baseFertilizerCostPerAcre * acres;
  const baseRevenue = baseYield * cropPrice * acres;
  const baseMarginOverFertilizer = baseRevenue - baseTotalFertilizerCost;

  const altFertilizerCostPerAcre = (altRate / lbsPerTon) * altCostPerTon;
  const altTotalFertilizerCost = altFertilizerCostPerAcre * acres;
  const altRevenue = altYield * cropPrice * acres;
  const altMarginOverFertilizer = altRevenue - altTotalFertilizerCost;

  const diffCost = altTotalFertilizerCost - baseTotalFertilizerCost;
  const diffRevenue = altRevenue - baseRevenue;
  const diffMargin = altMarginOverFertilizer - baseMarginOverFertilizer;

  const chartData = [
    {
      name: 'Costs ($)',
      Base: baseTotalFertilizerCost,
      Altered: altTotalFertilizerCost,
    },
    {
      name: 'Revenue ($)',
      Base: baseRevenue,
      Altered: altRevenue,
    },
    {
      name: 'Margin ($)',
      Base: baseMarginOverFertilizer,
      Altered: altMarginOverFertilizer,
    }
  ];

  const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="space-y-8">
      {/* Inputs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Base Case Panel */}
        <div className="bg-white p-6 rounded border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Base Case</h3>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Farm Size (Acres)</label>
              <input type="number" value={acres} onChange={e => setAcres(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-green-900 focus:border-green-900" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expected Crop Price ($/bu)</label>
              <input type="number" step="0.1" value={cropPrice} onChange={e => setCropPrice(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-green-900 focus:border-green-900" />
            </div>
            
            <div className="pt-4 border-t border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-1">Fertilizer Rate (lbs/acre)</label>
              <input type="number" value={baseRate} onChange={e => setBaseRate(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-green-900 focus:border-green-900" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fertilizer Cost ($/ton)</label>
              <input type="number" value={baseCostPerTon} onChange={e => setBaseCostPerTon(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-green-900 focus:border-green-900" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expected Yield (bu/acre)</label>
              <input type="number" value={baseYield} onChange={e => setBaseYield(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-green-900 focus:border-green-900" />
            </div>
          </div>
        </div>

        {/* Altered Case Panel */}
        <div className="bg-blue-50 p-6 rounded border border-blue-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-blue-200 pb-2">Altered Case</h3>
          
          <div className="space-y-5">
            <div className="h-16 hidden lg:block"></div> {/* Spacer to align with pt-4 in Base */}
            
            <div className="pt-4 border-t border-blue-200 lg:border-t-0 lg:pt-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Fertilizer Rate (lbs/acre)</label>
              <div className="flex items-center gap-4">
                 <input type="range" min="50" max="250" value={altRate} onChange={e => setAltRate(Number(e.target.value))} className="flex-1 h-2 bg-blue-200 rounded appearance-none cursor-pointer" />
                 <input type="number" value={altRate} onChange={e => setAltRate(Number(e.target.value))} className="w-20 px-3 py-1 border border-gray-300 rounded focus:ring-blue-900 focus:border-blue-900" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fertilizer Cost ($/ton)</label>
              <input type="number" value={altCostPerTon} onChange={e => setAltCostPerTon(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 bg-white rounded focus:ring-blue-900 focus:border-blue-900" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expected Yield (bu/acre)</label>
              <input type="number" value={altYield} onChange={e => setAltYield(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 bg-white rounded focus:ring-blue-900 focus:border-blue-900" />
              <p className="text-xs text-gray-500 mt-1">If cutting rate, consider potential yield drop.</p>
            </div>
          </div>
        </div>

      </div>

        {/* Results Section */}
      <div className="bg-white p-6 rounded border border-gray-200 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Scenario Outcomes</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           <div className="bg-gray-50 p-4 rounded text-center">
              <div className="text-sm font-medium text-gray-500 mb-1">Cost Difference</div>
              <div className={`text-2xl font-bold ${diffCost < 0 ? 'text-green-600' : diffCost > 0 ? 'text-red-600' : 'text-gray-900'}`}>
                {diffCost > 0 ? '+' : ''}{formatCurrency(diffCost)}
              </div>
           </div>
           <div className="bg-gray-50 p-4 rounded text-center">
              <div className="text-sm font-medium text-gray-500 mb-1">Revenue Difference</div>
              <div className={`text-2xl font-bold ${diffRevenue > 0 ? 'text-green-600' : diffRevenue < 0 ? 'text-red-600' : 'text-gray-900'}`}>
                 {diffRevenue > 0 ? '+' : ''}{formatCurrency(diffRevenue)}
              </div>
           </div>
           <div className={`p-4 rounded text-center border-2 ${diffMargin > 0 ? 'bg-green-50 border-green-200' : diffMargin < 0 ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
              <div className="text-sm font-semibold text-gray-700 mb-1">Net Margin Impact</div>
              <div className={`text-3xl font-extrabold ${diffMargin > 0 ? 'text-green-700' : diffMargin < 0 ? 'text-red-700' : 'text-gray-900'}`}>
                 {diffMargin > 0 ? '+' : ''}{formatCurrency(diffMargin)}
              </div>
              <p className="text-xs mt-2 font-medium">
                {diffMargin > 0 ? 'Scenario is more profitable.' : diffMargin < 0 ? 'Scenario is less profitable.' : 'Neutral outcome.'}
              </p>
           </div>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend />
              <Bar dataKey="Base" fill="#9CA3AF" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Altered" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
