import React from 'react';

interface StatInputProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  helpText?: string;
}

export const StatInput: React.FC<StatInputProps> = ({ label, value, onChange, min = 1, max = 100, helpText }) => {
  return (
    <div className="flex flex-col gap-2 w-full group">
      <div className="flex justify-between items-baseline border-b border-wurm-border pb-1">
        <label className="text-sm font-serif font-bold text-wurm-muted group-hover:text-wurm-accent transition-colors tracking-wide">{label}</label>
        <span className="text-xs text-wurm-accent font-mono">{value.toFixed(1)}</span>
      </div>
      <div className="relative pt-2">
        <input
          type="range"
          min={min}
          max={max}
          step={0.1}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-1 bg-wurm-border rounded-lg appearance-none cursor-pointer accent-wurm-accent hover:accent-wurm-accentDim transition-all"
        />
      </div>
      <div className="flex gap-2 mt-1">
        <input 
          type="number"
          value={value}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            if (!isNaN(val)) onChange(Math.min(Math.max(val, min), max));
          }}
          className="w-full bg-black/50 border border-wurm-border rounded px-3 py-2 text-sm text-wurm-text focus:border-wurm-accent focus:outline-none font-mono text-right"
        />
      </div>
      {helpText && <p className="text-[10px] text-wurm-muted font-mono">{helpText}</p>}
    </div>
  );
};