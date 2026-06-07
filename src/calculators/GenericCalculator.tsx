import React from 'react';

export function GenericCalculator({ title }: { title: string }) {
  return (
    <div className="bg-white p-12 rounded border border-gray-200 shadow-sm text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-gray-400 text-2xl font-bold">?</span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Calculator Setup Required</h3>
      <p className="text-gray-500 max-w-md mx-auto mb-6">
        The interactive comparison view for the <strong>{title}</strong> scenario has not been fully implemented yet. 
      </p>
      <button className="px-4 py-2 bg-green-900 text-white rounded font-bold uppercase tracking-wider text-sm transition-colors hover:bg-green-800">
        Request this Calculator
      </button>
    </div>
  );
}
