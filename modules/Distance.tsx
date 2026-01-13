import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, Slider, SectionTitle, MathDisplay, InsightBadge } from '../components/UI';

const Distance: React.FC = () => {
  const [baseVol1, setBaseVol1] = useState(10);
  const [baseVol2, setBaseVol2] = useState(40);
  const [shockSize, setShockSize] = useState(5);

  const scenario1Start = baseVol1;
  const scenario1End = baseVol1 + shockSize;
  const scenario2Start = baseVol2;
  const scenario2End = baseVol2 + shockSize;

  const varChange1 = Math.pow(scenario1End, 2) - Math.pow(scenario1Start, 2);
  const varChange2 = Math.pow(scenario2End, 2) - Math.pow(scenario2Start, 2);
  
  const ratio = varChange2 / varChange1;

  // Generate data for the curve y = x^2
  const curveData = [];
  const maxDomain = Math.max(scenario1End, scenario2End) + 10;
  for (let x = 0; x <= maxDomain; x += 1) {
    curveData.push({
      vol: x,
      variance: Math.pow(x, 2),
    });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Card>
          <SectionTitle 
            title="The Cost of Dispersion" 
            subtitle="Compare a fixed SD shock at different baseline levels." 
          />
          <Slider label="Low Regime Baseline (σ₁)" value={baseVol1} min={5} max={25} onChange={setBaseVol1} unit="" />
          <Slider label="High Regime Baseline (σ₂)" value={baseVol2} min={30} max={60} onChange={setBaseVol2} unit="" />
          <Slider label="Shock Size (+Δσ)" value={shockSize} min={1} max={15} onChange={setShockSize} unit="" />
        </Card>

        <Card>
          <SectionTitle title="Impact Analysis" />
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-blue-900/20 rounded border border-blue-900/50">
              <h4 className="font-bold text-blue-400 text-sm">Low Regime Shock</h4>
              <p className="text-xs text-blue-300 mb-1">{baseVol1} → {scenario1End}</p>
              <p className="text-lg font-mono font-bold text-blue-200">ΔVar: {varChange1.toFixed(0)}</p>
            </div>
            <div className="p-3 bg-orange-900/20 rounded border border-orange-900/50">
              <h4 className="font-bold text-orange-400 text-sm">High Regime Shock</h4>
              <p className="text-xs text-orange-300 mb-1">{baseVol2} → {scenario2End}</p>
              <p className="text-lg font-mono font-bold text-orange-200">ΔVar: {varChange2.toFixed(0)}</p>
            </div>
          </div>
          <MathDisplay>
            <p>Impact Ratio: {ratio.toFixed(2)}x</p>
            <p className="text-xs mt-1 text-slate-400">The same +{shockSize} unit SD shock creates {ratio.toFixed(1)} times more variance in the high dispersion regime.</p>
          </MathDisplay>
          <InsightBadge text="Distance in Standard Deviation space is misleading. An increase from 40 to 45 represents massively more energy (variance) than a move from 10 to 15." />
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="h-[450px]">
          <SectionTitle title="The Parabolic Reality" subtitle="Plotting Variance (Energy) vs Standard Deviation" />
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={curveData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="vol" label={{ value: 'Standard Deviation (σ)', position: 'insideBottomRight', offset: -5, fill: '#94a3b8' }} type="number" stroke="#94a3b8" />
              <YAxis label={{ value: 'Variance (σ²)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} stroke="#94a3b8" />
              <Tooltip 
                 formatter={(val: number) => val.toFixed(0)} 
                 labelFormatter={(label) => `SD: ${label}`}
                 contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
              />
              
              <Area type="monotone" dataKey="variance" stroke="#94a3b8" fill="#475569" fillOpacity={0.3} strokeWidth={2} />
              
              {/* Low Regime Zone */}
              <ReferenceLine x={scenario1Start} stroke="#3b82f6" strokeDasharray="3 3" />
              <ReferenceLine x={scenario1End} stroke="#3b82f6" />
              
              {/* High Regime Zone */}
              <ReferenceLine x={scenario2Start} stroke="#f97316" strokeDasharray="3 3" />
              <ReferenceLine x={scenario2End} stroke="#f97316" />

            </AreaChart>
          </ResponsiveContainer>
          <div className="flex justify-center mt-2 space-x-6 text-sm text-slate-400">
             <div className="flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                <span>Low Regime Impact</span>
             </div>
             <div className="flex items-center">
                <span className="w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
                <span>High Regime Impact</span>
             </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Distance;