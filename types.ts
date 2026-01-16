export interface Ore {
  name: string;
  difficulty: number;
  recommendedSkillRange: [number, number];
  notes?: string;
}

export enum EfficiencyStatus {
  INEFFICIENT_HARD = 'Inefficient (Too Hard)',
  VIABLE = 'Viable',
  OPTIMAL = 'Optimal',
  INEFFICIENT_EASY = 'Inefficient (Too Easy)',
}

export interface MiningAnalysis {
  ore: Ore;
  status: EfficiencyStatus;
  idealToolQL: number;
  delta: number; // Difference between calculated potential and ore difficulty
  skillGainFactor: number; // 0 to 1 score for visualization
}

export interface UserStats {
  skill: number;
  toolQL: number;
}