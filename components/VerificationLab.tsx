import React, { useState } from 'react';
import { calculatePotential, calculateIdealToolQL } from '../services/miningLogic';

interface VerificationLabProps {
  t: any;
}

export const VerificationLab: React.FC<VerificationLabProps> = ({ t }) => {
  const [s1Skill, setS1Skill] = useState<number>(59);
  const [s1Tool, setS1Tool] = useState<number>(85);
  
  const [s3Skill, setS3Skill] = useState<number>(59);
  const [s3Diff, setS3Diff] = useState<number>(25);

  const calculatedDifficulty = calculatePotential(s1Skill, s1Tool);
  const calculatedTool = calculateIdealToolQL(s3Diff, s3Skill);

  return (
    <div className="bg-black/40 rounded border border-wurm-accent/20 p-4 mt-4">
      <h3 className="text-xs font-serif font-bold text-wurm-accent uppercase tracking-widest mb-4 border-b border-wurm-border pb-2">
        {t.lab.title}
      </h3>
      
      <div className="space-y-6">
        {/* Step 1 Replica */}
        <div className="space-y-2">
          <div className="flex justify-between items-center mb-1">
             <span className="text-xs text-wurm-warning font-semibold">{t.lab.step1}</span>
             <span className="text-[10px] text-wurm-muted font-mono">(Skill + Tool)/2 - 20</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
               <label className="text-[10px] uppercase text-wurm-muted font-mono">Skill</label>
               <input type="number" value={s1Skill} onChange={e => setS1Skill(Number(e.target.value))} className="w-full bg-wurm-panel border border-wurm-border rounded px-2 py-1 text-xs text-wurm-text font-mono" />
            </div>
            <div>
               <label className="text-[10px] uppercase text-wurm-muted font-mono">Tool</label>
               <input type="number" value={s1Tool} onChange={e => setS1Tool(Number(e.target.value))} className="w-full bg-wurm-panel border border-wurm-border rounded px-2 py-1 text-xs text-wurm-text font-mono" />
            </div>
          </div>
          <div className="flex justify-between items-center bg-wurm-bg p-2 rounded border border-wurm-border">
             <span className="text-xs text-wurm-muted">{t.lab.result}</span>
             <span className="text-sm font-mono font-bold text-wurm-warning">{calculatedDifficulty.toFixed(1)}</span>
          </div>
        </div>

        {/* Step 3 Replica */}
        <div className="space-y-2">
          <div className="flex justify-between items-center mb-1">
             <span className="text-xs text-wurm-accent font-semibold">{t.lab.step3}</span>
             <span className="text-[10px] text-wurm-muted font-mono">(Diff + 20)*2 - Skill</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
               <label className="text-[10px] uppercase text-wurm-muted font-mono">Skill</label>
               <input type="number" value={s3Skill} onChange={e => setS3Skill(Number(e.target.value))} className="w-full bg-wurm-panel border border-wurm-border rounded px-2 py-1 text-xs text-wurm-text font-mono" />
            </div>
            <div>
               <label className="text-[10px] uppercase text-wurm-muted font-mono">Diff</label>
               <input type="number" value={s3Diff} onChange={e => setS3Diff(Number(e.target.value))} className="w-full bg-wurm-panel border border-wurm-border rounded px-2 py-1 text-xs text-wurm-text font-mono" />
            </div>
          </div>
          <div className="flex justify-between items-center bg-wurm-bg p-2 rounded border border-wurm-border">
             <span className="text-xs text-wurm-muted">{t.lab.result}</span>
             <span className="text-sm font-mono font-bold text-wurm-accent">{calculatedTool.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};