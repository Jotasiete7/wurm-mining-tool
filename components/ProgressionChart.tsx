import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Ore } from '../types';
import { calculateIdealToolQL } from '../services/miningLogic';

interface ProgressionChartProps {
  currentSkill: number;
  currentTool: number;
  selectedOre: Ore;
}

export const ProgressionChart: React.FC<ProgressionChartProps> = ({ currentSkill, currentTool, selectedOre }) => {
  // Generate data points for skill 1-100 for the selected ore
  const data = Array.from({ length: 11 }, (_, i) => {
    const skill = i * 10;
    return {
      skill,
      idealQL: calculateIdealToolQL(selectedOre.difficulty, skill),
    };
  }).filter(d => d.idealQL > 0 && d.idealQL < 100);

  return (
    <div className="h-64 w-full bg-slate-800/30 rounded-lg p-4 border border-slate-700">
      <h4 className="text-sm font-semibold text-slate-400 mb-4 font-mono">
        Ideal Tool Curve: <span className="text-white">{selectedOre.name}</span>
      </h4>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis 
            dataKey="skill" 
            stroke="#94a3b8" 
            label={{ value: 'Your Skill', position: 'insideBottomRight', offset: -5, fill: '#64748b' }} 
            type="number"
            domain={[0, 100]}
          />
          <YAxis 
            stroke="#94a3b8" 
            label={{ value: 'Ideal Tool QL', angle: -90, position: 'insideLeft', fill: '#64748b' }} 
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#f1f5f9' }}
            itemStyle={{ color: '#38bdf8' }}
            formatter={(value: number) => [value.toFixed(1), 'Tool QL']}
          />
          <ReferenceLine x={currentSkill} stroke="#10b981" strokeDasharray="3 3" label={{ value: 'You', fill: '#10b981', position: 'insideTopLeft' }} />
          <Line 
            type="monotone" 
            dataKey="idealQL" 
            stroke="#38bdf8" 
            strokeWidth={2} 
            dot={false} 
            activeDot={{ r: 6, fill: '#38bdf8' }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};