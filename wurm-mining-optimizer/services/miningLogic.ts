import { Ore, EfficiencyStatus, MiningAnalysis } from '../types';
import { DIFFICULTY_OFFSET } from '../constants';

/**
 * Calculates the "Action Difficulty Potential" derived from the spreadsheet.
 * This number represents the Ore Difficulty level where the user is perfectly balanced.
 */
export const calculatePotential = (skill: number, toolQL: number): number => {
  return ((skill + toolQL) / 2) - DIFFICULTY_OFFSET;
};

/**
 * Inverts the formula to find the ideal Tool QL for a specific ore and skill.
 * Formula: ToolQL = (OreDiff + 20) * 2 - Skill
 */
export const calculateIdealToolQL = (oreDifficulty: number, skill: number): number => {
  const result = (oreDifficulty + DIFFICULTY_OFFSET) * 2 - skill;
  return Math.max(1, parseFloat(result.toFixed(1)));
};

/**
 * Analyzes a specific ore against the user's stats to determine viability.
 */
export const analyzeOre = (ore: Ore, skill: number, toolQL: number): MiningAnalysis => {
  const potential = calculatePotential(skill, toolQL);
  const delta = potential - ore.difficulty;
  
  // Logic derived from the concept that you want the "Action Difficulty" to be close to the Ore Difficulty
  // A negative delta means the ore is harder than the "Optimal" point.
  // A positive delta means the ore is easier.
  
  let status: EfficiencyStatus;
  let skillGainFactor = 0.5;

  // These thresholds are heuristics based on the spreadsheet's logic flow
  if (delta < -15) {
    status = EfficiencyStatus.INEFFICIENT_HARD;
    skillGainFactor = 0.1;
  } else if (delta < -5) {
    status = EfficiencyStatus.VIABLE; // Hard, but possible. Good for challenges.
    skillGainFactor = 0.7;
  } else if (delta >= -5 && delta <= 10) {
    status = EfficiencyStatus.OPTIMAL; // Sweet spot
    skillGainFactor = 1.0;
  } else {
    status = EfficiencyStatus.INEFFICIENT_EASY; // Too easy, likely capped results
    skillGainFactor = 0.3;
  }

  // Override: If skill is way below recommended, flag it
  if (skill < ore.recommendedSkillRange[0] - 10) {
    status = EfficiencyStatus.INEFFICIENT_HARD;
  }

  const idealToolQL = calculateIdealToolQL(ore.difficulty, skill);

  return {
    ore,
    status,
    idealToolQL,
    delta,
    skillGainFactor
  };
};

export const getSortedAnalysis = (ores: Ore[], skill: number, toolQL: number): MiningAnalysis[] => {
  return ores.map(ore => analyzeOre(ore, skill, toolQL)).sort((a, b) => {
    // Sort logic: Optimal first, then Viable, then others based on distance
    const scoreA = getStatusScore(a.status);
    const scoreB = getStatusScore(b.status);
    if (scoreA !== scoreB) return scoreB - scoreA;
    return Math.abs(a.delta) - Math.abs(b.delta);
  });
};

const getStatusScore = (status: EfficiencyStatus): number => {
  switch (status) {
    case EfficiencyStatus.OPTIMAL: return 3;
    case EfficiencyStatus.VIABLE: return 2;
    case EfficiencyStatus.INEFFICIENT_EASY: return 1;
    case EfficiencyStatus.INEFFICIENT_HARD: return 0;
  }
};