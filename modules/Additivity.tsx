import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Card, Slider, SectionTitle, MathDisplay, InsightBadge } from '../components/UI';

const Additivity: React.FC = () => {
  const [vol1, setVol1] = useState(15);
  const [vol2, setVol2] = useState(20);

  // Calculations
  const naiveSum = vol1 + vol2;
  const variance1 = Math.pow(vol1, 2);
  const variance2 = Math.pow(vol2, 2);
  const totalVariance = variance1 + variance2;
  const actualVol = Math.sqrt(totalVariance);
  const errorPct = ((naiveSum - actualVol) / actualVol) * 100;

  const data = [
    { name: 'Combined SD', value: actualVol, type: 'Correct' },
    { name: 'Naive Sum', value: naiveSum, type: 'Wrong' },
  ];

  // SVG dimensions for Triangle visualization
  const scale = 5;
  const padding = 40;
  const svgHeight = 300;
  const svgWidth = 400;
  
  // Triangle coordinates
  const x0 = padding;
  const y0 = svgHeight - padding;
  const x1 = x0 + vol1 * scale;
  const y1 = y0;
  const x2 = x0 + vol1 * scale;
  const y2 = y0 - vol2 * scale;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Card>
          <SectionTitle 
            title="Inputs: Independent Variables" 
            subtitle="Adjust the Standard Deviation (σ) of two uncorrelated datasets." 
          />
          <Slider label="Dataset 1 Std Dev (σ₁)" value={vol1} min={5} max={50} onChange={setVol1} unit="" />
          <Slider label="Dataset 2 Std Dev (σ₂)" value={vol2} min={5} max={50} onChange={setVol2} unit="" />
        </Card>

        <Card>
          <SectionTitle title="The Math" />
          <MathDisplay>
            <div className="space-y-2">
              <p>Var₁ = {vol1}² = {variance1.toFixed(0)}</p>
              <p>Var₂ = {vol2}² = {variance2.toFixed(0)}</p>
              <p className="font-bold text-blue-400">Var_Total = {variance1.toFixed(0)} + {variance2.toFixed(0)} = {totalVariance.toFixed(0)}</p>
              <div className="h-px bg-slate-600 w-full my-2"></div>
              <p>Naive SD = {vol1} + {vol2} = {naiveSum}</p>
              <p className="font-bold text-emerald-400">Actual SD = √{totalVariance.toFixed(0)} ≈ {actualVol.toFixed(2)}</p>
            </div>
          </MathDisplay>
          <InsightBadge text={`The naive sum overestimates dispersion by ${errorPct.toFixed(1)}%. Standard Deviations are orthogonal vectors, not parallel lines.`} />
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="h-[400px] flex flex-col">
          <SectionTitle title="Vector Addition (Pythagoras)" subtitle="SD behaves like distance in 2D space." />
          <div className="flex-1 w-full flex items-center justify-center border border-slate-700 rounded-lg bg-slate-900 relative overflow-hidden">
            <svg width="100%" height="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="xMidYMid meet">
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                </marker>
              </defs>
              
              {/* Grid lines for effect */}
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" strokeWidth="1"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Leg 1 */}
              <line x1={x0} y1={y0} x2={x1} y2={y1} stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowhead)"/>
              <text x={x0 + (x1-x0)/2} y={y0 + 20} textAnchor="middle" className="text-sm fill-blue-400 font-bold">σ₁ = {vol1}</text>

              {/* Leg 2 */}
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowhead)"/>
              <text x={x2 + 10} y={y1 + (y2-y1)/2} textAnchor="start" className="text-sm fill-blue-400 font-bold">σ₂ = {vol2}</text>

              {/* Hypotenuse (Result) */}
              <line x1={x0} y1={y0} x2={x2} y2={y2} stroke="#10b981" strokeWidth="4" strokeDasharray="5,5" />
              <text x={x0 + (x2-x0)/2 - 20} y={y0 + (y2-y0)/2 - 10} textAnchor="end" className="text-sm fill-emerald-400 font-bold">Actual = {actualVol.toFixed(1)}</text>

              {/* Naive Path Ghost */}
              <path d={`M ${x0} ${y0-10} Q ${x1} ${y0-40} ${x2+40} ${y2}`} fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="4,4" opacity="0.5" />
               <text x={x1 + 20} y={y0 - 50} textAnchor="middle" className="text-xs fill-red-400 opacity-70">Naive Sum Path</text>
            </svg>
          </div>
        </Card>

        <Card className="h-[300px]">
          <SectionTitle title="Magnitude Comparison" />
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis type="number" stroke="#94a3b8" />
              <YAxis dataKey="name" type="category" width={100} stroke="#94a3b8" />
              <Tooltip 
                cursor={{fill: 'transparent'}}
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.type === 'Correct' ? '#10b981' : '#ef4444'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default Additivity;