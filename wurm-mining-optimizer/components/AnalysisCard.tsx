import React from 'react';
import { MiningAnalysis, EfficiencyStatus } from '../types';
import { DIFFICULTY_OFFSET } from '../constants';

interface AnalysisCardProps {
  analysis: MiningAnalysis;
  currentSkill: number;
  currentTool: number;
  showMath?: boolean;
  t: any; // Translation object
}

export const AnalysisCard: React.FC<AnalysisCardProps> = ({ analysis, currentSkill, currentTool, showMath = false, t }) => {
  const { ore, status, idealToolQL, delta } = analysis;
  
  // Logic for translated status
  let translatedStatus = status;
  if (status === EfficiencyStatus.OPTIMAL) translatedStatus = t.status.optimal;
  if (status === EfficiencyStatus.VIABLE) translatedStatus = t.status.viable;
  if (status === EfficiencyStatus.INEFFICIENT_HARD) translatedStatus = t.status.inefficientHard;
  if (status === EfficiencyStatus.INEFFICIENT_EASY) translatedStatus = t.status.inefficientEasy;

  // Status Colors (Guild Palette)
  let borderColor = 'border-wurm-border';
  let badgeColor = 'bg-wurm-panel text-wurm-muted';
  let opacity = 'opacity-100';

  switch (status) {
    case EfficiencyStatus.OPTIMAL:
      borderColor = 'border-wurm-accent/50';
      badgeColor = 'bg-wurm-accent/10 text-wurm-accent border border-wurm-accent/30';
      break;
    case EfficiencyStatus.VIABLE:
      borderColor = 'border-wurm-warning/30';
      badgeColor = 'bg-wurm-warning/10 text-wurm-warning border border-wurm-warning/30';
      break;
    case EfficiencyStatus.INEFFICIENT_HARD:
      borderColor = 'border-red-900/30';
      badgeColor = 'bg-red-900/10 text-red-500/70 border border-red-900/30';
      opacity = 'opacity-60 grayscale-[0.8]';
      break;
    case EfficiencyStatus.INEFFICIENT_EASY:
      borderColor = 'border-wurm-border';
      badgeColor = 'bg-wurm-border text-wurm-muted';
      opacity = 'opacity-70';
      break;
  }

  const toolDiff = idealToolQL - currentTool;
  const toolAction = toolDiff > 2 ? t.card.upgrade : toolDiff < -5 ? t.card.downgrade : t.card.keep;
  
  // Math for verification
  const actionLevel = (currentSkill + currentTool) / 2;

  return (
    <div className={`relative bg-wurm-panel rounded border ${borderColor} p-5 transition-all hover:border-wurm-accent/40 ${opacity}`}>
      <div className="flex justify-between items-start mb-4 border-b border-wurm-border pb-3">
        <div>
          <h3 className="text-xl font-serif font-bold text-wurm-text">{ore.name}</h3>
          <p className="text-xs text-wurm-muted font-mono">{t.card.diff}: {ore.difficulty} | {t.card.range}: {ore.recommendedSkillRange.join('-')}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest font-mono ${badgeColor}`}>
          {translatedStatus}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm mt-4">
        <div className="p-2 border-l-2 border-wurm-border pl-3">
          <p className="text-[10px] text-wurm-muted uppercase tracking-wider mb-1 font-sans">{t.card.idealTool}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-mono font-semibold text-wurm-accent">{idealToolQL.toFixed(1)}</span>
            {Math.abs(toolDiff) > 2 && (
               <span className={`text-xs ${toolDiff > 0 ? 'text-red-400' : 'text-wurm-success'}`}>
                 ({toolDiff > 0 ? '+' : ''}{toolDiff.toFixed(1)})
               </span>
            )}
          </div>
        </div>
        
        <div className="p-2 border-l-2 border-wurm-border pl-3">
            <p className="text-[10px] text-wurm-muted uppercase tracking-wider mb-1 font-sans">{t.card.rec}</p>
            <p className="font-medium text-wurm-text font-serif italic">{toolAction}</p>
        </div>
      </div>

      {showMath && (
        <div className="mt-4 pt-4 border-t border-wurm-border text-xs font-mono text-wurm-muted bg-black/20 p-2 rounded">
          <div className="flex justify-between mb-1">
            <span>{t.card.math.action}:</span>
            <span>({currentSkill} + {currentTool}) / 2 = <span className="text-wurm-text">{actionLevel.toFixed(1)}</span></span>
          </div>
          <div className="flex justify-between mb-1">
            <span>{t.card.math.offset}:</span>
            <span className="text-red-400">-{DIFFICULTY_OFFSET}</span>
          </div>
          <div className="flex justify-between mb-1 border-b border-wurm-border pb-1">
            <span>Ore Diff:</span>
            <span className="text-wurm-accent">-{ore.difficulty}</span>
          </div>
          <div className="flex justify-between pt-1 font-bold">
            <span>{t.card.math.score}:</span>
            <span className={delta >= -5 && delta <= 10 ? 'text-wurm-success' : 'text-wurm-warning'}>
              {delta.toFixed(1)}
            </span>
          </div>
        </div>
      )}
      
      {status === EfficiencyStatus.OPTIMAL && (
          <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-wurm-accent shadow-[0_0_10px_#d4b483]"></div>
      )}
    </div>
  );
};