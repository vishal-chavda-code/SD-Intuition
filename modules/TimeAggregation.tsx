import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, Slider, SectionTitle, MathDisplay, InsightBadge } from '../components/UI';

const TimeAggregation: React.FC = () => {
  const [dailyVol, setDailyVol] = useState(1); // 1% daily

  const data = [];
  const days = [1, 5, 21, 63, 126, 252]; // Day, Week, Month, Quarter, Half, Year
  
  days.forEach(d => {
    data.push({
      days: d,
      naive: dailyVol * d, // Wrong: Summing vols
      actual: dailyVol * Math.sqrt(d), // Correct: Sqrt(Sum of Vars)
    });
  });

  const annualNaive = data[data.length - 1].naive;
  const annualActual = data[data.length - 1].actual;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Card>
          <SectionTitle 
            title="Time Scaling (Random Walk)" 
            subtitle="How does daily standard deviation translate to annual standard deviation?" 
          />
          <Slider label="Daily Std Dev" value={dailyVol} min={0.5} max={3.0} step={0.1} onChange={setDailyVol} unit="" />
          
          <div className="mt-6 space-y-4">
             <div className="bg-slate-900 border border-slate-700 p-4 rounded-lg">
                <p className="text-sm font-medium text-slate-400">Daily Variance</p>
                <p className="text-xl font-bold font-mono text-slate-200">σ² = {Math.pow(dailyVol, 2).toFixed(2)}</p>
             </div>
             <div className="bg-slate-900 border border-slate-700 p-4 rounded-lg">
                <p className="text-sm font-medium text-slate-400">Annual Variance (x252)</p>
                <p className="text-xl font-bold font-mono text-slate-200">Σσ² = {(Math.pow(dailyVol, 2) * 252).toFixed(0)}</p>
             </div>
          </div>
        </Card>

        <Card>
          <SectionTitle title="The Square Root Rule" />
          <MathDisplay>
             <p>σ_annual ≠ σ_daily × 252</p>
             <p>σ_annual = √(σ_daily² × 252)</p>
             <p>σ_annual = σ_daily × √252</p>
             <p>σ_annual = σ_daily × 15.87</p>
          </MathDisplay>
          <InsightBadge text="Variances add over time. Standard Deviations scale with the square root of time (for independent random walks)." />
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="h-[500px]">
          <SectionTitle title="Scaling Error Growth" subtitle="Comparing Linear Scaling vs Square Root Scaling" />
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="days" label={{ value: 'Time Steps', position: 'insideBottom', offset: -10, fill: '#94a3b8' }} stroke="#94a3b8" />
              <YAxis label={{ value: 'Standard Deviation', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                formatter={(val: number) => val.toFixed(1)}
                labelFormatter={(d) => `Time Step ${d}`}
              />
              <Legend verticalAlign="top" height={36}/>
              
              <Line 
                type="monotone" 
                dataKey="naive" 
                name="Naive Linear (x T)" 
                stroke="#ef4444" 
                strokeWidth={2} 
                strokeDasharray="5 5"
              />
              
              <Line 
                type="monotone" 
                dataKey="actual" 
                name="Actual (x √T)" 
                stroke="#3b82f6" 
                strokeWidth={3} 
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 text-center text-sm text-slate-400">
             At T=252, Naive: {annualNaive.toFixed(0)} vs Actual: {annualActual.toFixed(1)}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TimeAggregation;