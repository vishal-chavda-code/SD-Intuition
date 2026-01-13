import React, { useState } from 'react';
import { MODULES, ModuleId } from './types';
import Additivity from './modules/Additivity';
import Averaging from './modules/Averaging';
import Distance from './modules/Distance';
import TimeAggregation from './modules/TimeAggregation';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleId>('additivity');

  const renderModule = () => {
    switch (activeModule) {
      case 'additivity': return <Additivity />;
      case 'averaging': return <Averaging />;
      case 'distance': return <Distance />;
      case 'time': return <TimeAggregation />;
      default: return <Additivity />;
    }
  };

  const activeConfig = MODULES.find(m => m.id === activeModule)!;

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col text-slate-200">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-900/50">
              σ
            </div>
            <h1 className="text-xl font-bold text-slate-100 hidden sm:block">Standard Deviation Intuition Builder</h1>
            <h1 className="text-xl font-bold text-slate-100 sm:hidden">SD Builder</h1>
          </div>
          <div className="text-xs sm:text-sm text-slate-400 font-medium bg-slate-900 border border-slate-700 px-3 py-1 rounded-full">
            SD is a curved space. Variance is flat.
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {MODULES.map((module) => (
            <button
              key={module.id}
              onClick={() => setActiveModule(module.id)}
              className={`flex flex-col items-start p-4 rounded-xl border transition-all duration-200 text-left h-24 sm:h-auto
                ${activeModule === module.id 
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/50' 
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200 hover:bg-slate-750'
                }`}
            >
              <span className="text-sm sm:text-base font-bold mb-1">{module.title}</span>
              <span className={`text-xs ${activeModule === module.id ? 'text-blue-100' : 'text-slate-500'}`}>
                {module.shortDescription}
              </span>
            </button>
          ))}
        </div>

        {/* Module Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-100">{activeConfig.title}</h2>
          <p className="text-slate-400 mt-1">{activeConfig.description}</p>
        </div>

        {/* Active Module Content */}
        <div className="animate-fade-in">
          {renderModule()}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 border-t border-slate-700 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>Designed for Statistical Intuition</p>
        </div>
      </footer>
    </div>
  );
};

export default App;