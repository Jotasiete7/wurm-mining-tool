import React from 'react';
import { calculateIdealToolQL } from '../services/miningLogic';

interface Bracket {
  label: string;
  minSkill: number;
  maxSkill: number;
  oreName: string;
  oreDiff: number;
}

interface ReferenceGuideProps {
  t: any;
}

const BRACKETS: Bracket[] = [
  { label: 'Beginner', minSkill: 1, maxSkill: 25, oreName: 'Rock / Iron', oreDiff: 3 },
  { label: 'Iron Age', minSkill: 25, maxSkill: 35, oreName: 'Iron', oreDiff: 3 },
  { label: 'Bronze Age', minSkill: 35, maxSkill: 50, oreName: 'Tin', oreDiff: 10 },
  { label: 'Industrial', minSkill: 50, maxSkill: 75, oreName: 'Copper / Slate', oreDiff: 20 },
  { label: 'Precious', minSkill: 75, maxSkill: 90, oreName: 'Silver', oreDiff: 35 },
  { label: 'Master', minSkill: 90, maxSkill: 99, oreName: 'Gold / Marble', oreDiff: 40 },
];

export const ReferenceGuide: React.FC<ReferenceGuideProps> = ({ t }) => {
  return (
    <div className="bg-wurm-panel rounded border border-wurm-border overflow-hidden mt-8">
      <div className="p-4 bg-wurm-bg border-b border-wurm-border flex justify-between items-center">
        <div>
          <h3 className="text-lg font-serif font-bold text-wurm-text">{t.guide.title}</h3>
        </div>
        <div className="hidden md:block text-[10px] text-wurm-muted text-right font-mono">
           (Diff + 20) * 2 - Skill
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-black/50 text-wurm-muted uppercase font-serif text-xs tracking-wider">
            <tr>
              <th className="px-6 py-3 font-normal">{t.guide.colRange}</th>
              <th className="px-6 py-3 font-normal">{t.guide.colOre}</th>
              <th className="px-6 py-3 text-right font-normal">{t.guide.colStart}</th>
              <th className="px-6 py-3 text-right font-normal">{t.guide.colEnd}</th>
              <th className="px-6 py-3 text-center font-normal">{t.guide.colStrat}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-wurm-border">
            {BRACKETS.map((bracket) => {
              const startQL = calculateIdealToolQL(bracket.oreDiff, bracket.minSkill);
              const endQL = calculateIdealToolQL(bracket.oreDiff, bracket.maxSkill);

              let strategy = t.guide.stratDown;
              if (startQL > 80) strategy = t.guide.stratHigh;
              if (endQL <= 1) strategy = t.guide.stratIrrelevant;

              return (
                <tr key={bracket.label} className="hover:bg-wurm-bg/50 transition-colors group">
                  <td className="px-6 py-4 font-mono font-medium text-wurm-accent group-hover:text-white transition-colors">
                    {bracket.minSkill} - {bracket.maxSkill}
                  </td>
                  <td className="px-6 py-4 text-wurm-text font-serif">
                    {bracket.oreName}
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-wurm-warning">
                    {startQL.toFixed(1)}
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-wurm-success">
                    {endQL > 1 ? endQL.toFixed(1) : '1.0'}
                  </td>
                  <td className="px-6 py-4 text-center text-xs text-wurm-muted italic">
                    {strategy}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};