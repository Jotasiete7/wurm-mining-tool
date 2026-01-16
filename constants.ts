import { Ore } from './types';

export const ORES: Ore[] = [
  { name: 'Rock', difficulty: 2, recommendedSkillRange: [1, 25], notes: 'Basic resource, high availability.' },
  { name: 'Zinc', difficulty: 2, recommendedSkillRange: [1, 25], notes: 'Good starter ore.' },
  { name: 'Iron', difficulty: 3, recommendedSkillRange: [25, 35], notes: 'Staple resource. High demand.' },
  { name: 'Tin', difficulty: 10, recommendedSkillRange: [35, 50], notes: 'Used for bronze/alloys.' },
  { name: 'Copper', difficulty: 20, recommendedSkillRange: [50, 75], notes: 'Core mid-game resource.' },
  { name: 'Slate', difficulty: 20, recommendedSkillRange: [50, 75], notes: 'Construction material.' },
  { name: 'Lead', difficulty: 20, recommendedSkillRange: [50, 75], notes: 'Toxic but useful.' },
  { name: 'Silver', difficulty: 35, recommendedSkillRange: [75, 90], notes: 'Precious metal.' },
  { name: 'Gold', difficulty: 40, recommendedSkillRange: [90, 100], notes: 'High value.' },
  { name: 'Marble', difficulty: 40, recommendedSkillRange: [90, 100], notes: 'High end masonry.' },
  { name: 'Sandstone', difficulty: 45, recommendedSkillRange: [90, 100], notes: 'Very hard rock.' },
];

export const MAX_SKILL = 100;
export const MAX_TOOL_QL = 100;
// Heuristic constant from the spreadsheet formula: (Skill + Tool) / 2 - 20
export const DIFFICULTY_OFFSET = 20;