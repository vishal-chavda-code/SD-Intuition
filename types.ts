export type ModuleId = 'additivity' | 'averaging' | 'distance' | 'time';

export interface ModuleConfig {
  id: ModuleId;
  title: string;
  description: string;
  shortDescription: string;
}

export const MODULES: ModuleConfig[] = [
  {
    id: 'additivity',
    title: 'Additivity & Independence',
    shortDescription: 'Why σ₁ + σ₂ is wrong',
    description: 'Demonstrating how independent variances add linearly, while standard deviations behave like sides of a triangle.'
  },
  {
    id: 'averaging',
    title: 'Averaging & Interpolation',
    shortDescription: 'The convexity of SD',
    description: 'Visualizing why the average standard deviation is higher than the average of the variances rooted.'
  },
  {
    id: 'distance',
    title: 'Distance & Shock Size',
    shortDescription: 'Equal σ jumps ≠ Equal impact',
    description: 'Comparing linear standard deviation distance against the true energy/variance distance.'
  },
  {
    id: 'time',
    title: 'Time Aggregation',
    shortDescription: 'The √T Rule',
    description: 'Deriving the square root of time rule from variance additivity (Random Walk).'
  }
];