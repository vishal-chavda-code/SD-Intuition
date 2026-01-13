import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from 'recharts';
import { Card, Slider, SectionTitle, MathDisplay, InsightBadge } from '../components/UI';

const Averaging: React.FC = () => {
  const [startVol, setStartVol] = useState(10);
  const [endVol, setEndVol] = useState(50);

  const data = useMemo(() => {
    const points = [];
    for (let w = 0; w <= 100; w += 5) {
      const weight = w / 100;
      
      // Linear Interpolation in Volatility Space (Wrong)
      const naiveVol = (1 - weight) * startVol + weight * endVol;
      
      // Linear Interpolation in Variance Space (Correct)
      const startVar = Math.pow(startVol, 2);
      const endVar = Math.pow(endVol, 2);
      const avgVar = (1 - weight) * startVar + weight * endVar;
      const rmsVol = Math.sqrt(avgVar);

      points.push({
        weight: `${w}%`,
        naive: naiveVol,
        rms: rmsVol,
        diff: rmsVol - naiveVol
      });
    }
    return points;
  }, [startVol, endVol]);

  const maxDiff = Math.max(...data.map(d => d.diff));
  const midPoint = data.find(d => d.weight === '50%');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-6">
        <Card>
          <SectionTitle 
            title="Mix Two Regimes" 
            subtitle="Interpolating between a low SD and high SD state." 
          />
          <Slider label="Start Std Dev" value={startVol} min={5} max={40} onChange={setStartVol} unit="" />
          <Slider label="End Std Dev" value={endVol} min={20} max={100} onChange={setEndVol} unit="" />
          
          <div className="mt-8">
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-wide">At 50% Mix</p>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="bg-red-900/20 p-3 rounded-lg border border-red-900/50">
                <div className="text-xs text-red-400 font-medium">Naive Average</div>
                <div className="text-2xl font-bold text-red-400">{midPoint?.naive.toFixed(1)}</div>
              </div>
              <div className="bg-emerald-900/20 p-3 rounded-lg border border-emerald-900/50">
                <div className="text-xs text-emerald-400 font-medium">RMS Average</div>
                <div className="text-2xl font-bold text-emerald-400">{midPoint?.rms.toFixed(1)}</div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <SectionTitle title="Jensen's Inequality" />
          <p className="text-sm text-slate-400 mb-4">
            The square root of the average of squares is always greater than or equal to the average of the values.
          </p>
          <MathDisplay>
            <p>RMS ≥ Arithmetic Mean</p>
            <p className="mt-2">√[(σ₁² + σ₂²)/2] ≥ (σ₁ + σ₂)/2</p>
          </MathDisplay>
          <InsightBadge text="Standard Deviation is convex. Mixing low and high dispersion results in a combined state that is more dispersed than the simple average suggests." />
        </Card>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <Card className="h-[500px]">
          <SectionTitle title="The Convexity Gap" subtitle="Comparing Linear SD (Naive) vs. RMS SD (Correct)" />
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
              <XAxis dataKey="weight" label={{ value: 'Weight of Higher SD Dataset', position: 'insideBottom', offset: -10, fill: '#94a3b8' }} stroke="#94a3b8" />
              <YAxis label={{ value: 'Combined SD', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} domain={['dataMin - 5', 'dataMax + 5']} stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                formatter={(val: number) => val.toFixed(2)}
              />
              <Legend verticalAlign="top" height={36}/>
              
              {/* Naive Line */}
              <Line 
                type="monotone" 
                dataKey="naive" 
                name="Naive Average (Linear)" 
                stroke="#ef4444" 
                strokeWidth={2} 
                strokeDasharray="5 5"
                dot={false}
              />
              
              {/* Correct RMS Line */}
              <Line 
                type="monotone" 
                dataKey="rms" 
                name="RMS Average (Variance Space)" 
                stroke="#10b981" 
                strokeWidth={3} 
                dot={false} 
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default Averaging;