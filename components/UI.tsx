import React from 'react';

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-slate-800 rounded-xl shadow-lg border border-slate-700 p-6 ${className}`}>
    {children}
  </div>
);

export const Slider: React.FC<{
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (val: number) => void;
}> = ({ label, value, min, max, step = 1, unit = '%', onChange }) => (
  <div className="mb-4">
    <div className="flex justify-between items-center mb-2">
      <label className="text-sm font-medium text-slate-300">{label}</label>
      <span className="text-sm font-mono text-blue-400 font-bold">
        {value.toFixed(step < 1 ? 1 : 0)}{unit}
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
    />
  </div>
);

export const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-6">
    <h2 className="text-xl font-bold text-slate-100">{title}</h2>
    {subtitle && <p className="text-slate-400 text-sm mt-1">{subtitle}</p>}
  </div>
);

export const MathDisplay: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-slate-900 border-l-4 border-blue-500 p-4 my-4 font-mono text-sm text-slate-300 overflow-x-auto shadow-inner">
    {children}
  </div>
);

export const InsightBadge: React.FC<{ text: string }> = ({ text }) => (
  <div className="bg-amber-900/30 border border-amber-700/50 rounded-lg p-3 text-sm text-amber-200 flex items-start mt-4">
    <span className="text-xl mr-2">💡</span>
    <span className="font-medium">{text}</span>
  </div>
);