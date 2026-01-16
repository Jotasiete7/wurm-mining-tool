import React, { useState, useMemo } from 'react';
import { ORES } from './constants';
import { getSortedAnalysis } from './services/miningLogic';
import { StatInput } from './components/StatInput';
import { AnalysisCard } from './components/AnalysisCard';
import { ProgressionChart } from './components/ProgressionChart';
import { VerificationLab } from './components/VerificationLab';
import { ReferenceGuide } from './components/ReferenceGuide';
import { EfficiencyStatus } from './types';
import { translations, Language } from './translations';

const App: React.FC = () => {
  const [skill, setSkill] = useState<number>(30);
  const [toolQL, setToolQL] = useState<number>(15);
  const [showMath, setShowMath] = useState<boolean>(false);
  const [showLab, setShowLab] = useState<boolean>(false);
  const [showGuide, setShowGuide] = useState<boolean>(false);
  
  // Language State
  const [lang, setLang] = useState<Language>('en');
  const t = translations[lang];

  const analyses = useMemo(() => getSortedAnalysis(ORES, skill, toolQL), [skill, toolQL]);
  const bestOre = analyses.find(a => a.status === EfficiencyStatus.OPTIMAL) || analyses[0];

  return (
    <div className="min-h-screen bg-wurm-bg text-wurm-text p-4 md:p-8 font-sans selection:bg-wurm-accent selection:text-black flex flex-col">
      {/* Discrete Language Switcher */}
      <div className="fixed top-4 right-4 z-50 flex gap-3 text-[10px] font-mono tracking-widest text-wurm-muted uppercase">
         <button onClick={() => setLang('en')} className={`hover:text-wurm-accent transition-colors ${lang === 'en' ? 'text-wurm-accent underline' : ''}`}>EN</button>
         <button onClick={() => setLang('pt')} className={`hover:text-wurm-accent transition-colors ${lang === 'pt' ? 'text-wurm-accent underline' : ''}`}>PT</button>
         <button onClick={() => setLang('ru')} className={`hover:text-wurm-accent transition-colors ${lang === 'ru' ? 'text-wurm-accent underline' : ''}`}>RU</button>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 flex-grow w-full">
        
        {/* Header & Controls - Styled like the Guild Site Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="mb-4 text-center lg:text-left">
            <h1 className="text-4xl font-serif font-bold text-white mb-2 tracking-tight">
              A Guilda <span className="text-lg font-mono text-wurm-accent font-normal block mt-1">{t.title}</span>
            </h1>
            <p className="text-wurm-muted text-xs font-mono leading-relaxed max-w-md mx-auto lg:mx-0">
              // {t.subtitle}
            </p>
          </div>

          <div className="bg-wurm-panel p-6 rounded border border-wurm-border shadow-2xl shadow-black">
            <h2 className="text-xs font-bold text-wurm-accent uppercase tracking-widest mb-6 border-b border-wurm-border pb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-wurm-accent animate-pulse"></span>
              {t.inputSection}
            </h2>
            
            <div className="space-y-8">
              <StatInput 
                label={t.skill} 
                value={skill} 
                onChange={setSkill} 
                helpText={t.skillHelp}
              />
              <StatInput 
                label={t.tool} 
                value={toolQL} 
                onChange={setToolQL} 
                helpText={t.toolHelp}
              />
            </div>

            <div className="mt-8 flex flex-col gap-2 pt-6 border-t border-wurm-border">
               {/* Controls using the "Pill" style from screenshot */}
               <div className="flex flex-wrap gap-2">
                 <button 
                    onClick={() => setShowMath(!showMath)}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide border transition-all ${showMath ? 'bg-wurm-accent text-black border-wurm-accent' : 'bg-transparent text-wurm-muted border-wurm-muted hover:border-wurm-text'}`}
                 >
                   {t.toggles.math}
                 </button>

                 <button 
                    onClick={() => setShowGuide(!showGuide)}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide border transition-all ${showGuide ? 'bg-wurm-success text-white border-wurm-success' : 'bg-transparent text-wurm-muted border-wurm-muted hover:border-wurm-text'}`}
                 >
                   {t.toggles.guide}
                 </button>

                 <button 
                    onClick={() => setShowLab(!showLab)}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide border transition-all ${showLab ? 'bg-wurm-warning text-white border-wurm-warning' : 'bg-transparent text-wurm-muted border-wurm-muted hover:border-wurm-text'}`}
                 >
                   {t.toggles.lab}
                 </button>
               </div>
            </div>
            
            {showLab && <VerificationLab t={t} />}

            {!showLab && !showGuide && (
              <div className="mt-6 p-4 bg-black/40 rounded border border-wurm-border text-xs text-wurm-muted font-mono leading-relaxed">
                <strong className="text-wurm-text block mb-1 uppercase tracking-wider text-[10px]">{t.howItWorks.title}:</strong>
                {t.howItWorks.text}
              </div>
            )}
          </div>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-8 space-y-6">
          
          {showGuide ? (
            <ReferenceGuide t={t} />
          ) : (
            <>
              {/* Top Recommendation */}
              <div className="relative group">
                 <div className="absolute -inset-0.5 bg-gradient-to-r from-wurm-accent to-wurm-accentDim rounded opacity-20 blur transition duration-1000 group-hover:opacity-40"></div>
                 <div className="relative bg-wurm-panel rounded border border-wurm-border p-6 md:p-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                      <div>
                        <h2 className="text-2xl font-serif font-bold text-white">{t.results.title}</h2>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="h-px w-8 bg-wurm-accent"></span>
                          <p className="text-xs text-wurm-muted font-mono uppercase">{t.results.basedOn} {skill.toFixed(0)} / {toolQL.toFixed(0)}</p>
                        </div>
                      </div>
                      <div className="text-right hidden md:block">
                         <div className="text-[10px] text-wurm-muted font-mono uppercase tracking-widest mb-1">{t.results.potential}</div>
                         <div className="text-4xl font-serif text-wurm-accent">
                           {(((skill + toolQL) / 2) - 20).toFixed(1)}
                         </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div>
                          <h3 className="text-[10px] font-bold text-wurm-muted mb-4 uppercase tracking-widest border-l-2 border-wurm-accent pl-2">{t.results.topRec}</h3>
                          <AnalysisCard 
                            analysis={bestOre} 
                            currentSkill={skill} 
                            currentTool={toolQL}
                            showMath={showMath}
                            t={t}
                          />
                       </div>
                       <div>
                          <ProgressionChart 
                            currentSkill={skill} 
                            currentTool={toolQL} 
                            selectedOre={bestOre.ore} 
                          />
                       </div>
                    </div>
                 </div>
              </div>

              {/* All Options Grid */}
              <div className="mt-8">
                <h3 className="text-xl font-serif font-bold text-white mb-6 flex items-center gap-4">
                  {t.results.allOres}
                  <span className="h-px flex-grow bg-wurm-border"></span>
                  <span className="text-[10px] font-sans font-normal text-wurm-muted uppercase tracking-wider border border-wurm-border px-2 py-1 rounded-full">{t.results.sorted}</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {analyses.map((analysis) => (
                    <AnalysisCard 
                      key={analysis.ore.name} 
                      analysis={analysis}
                      currentSkill={skill} 
                      currentTool={toolQL}
                      showMath={showMath}
                      t={t}
                    />
                  ))}
                </div>
              </div>
            </>
          )}

        </div>
      </div>

      {/* Footer / Credits */}
      <footer className="max-w-7xl mx-auto w-full mt-12 mb-4 text-center border-t border-wurm-border pt-6">
         <p className="text-[10px] text-wurm-muted font-mono opacity-50 hover:opacity-100 transition-opacity cursor-default">
            Original spreadsheet logic & formulas by <span className="text-wurm-accent">Vaelir</span> (v1.2)
         </p>
      </footer>
    </div>
  );
};

export default App;