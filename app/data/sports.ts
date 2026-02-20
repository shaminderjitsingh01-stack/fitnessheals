// FitnessHeals Sports Data
export const SPORTS = [
  { name: 'Pickleball', slug: 'pickleball', icon: '🏓', color: '#1565C0' },
  { name: 'Running', slug: 'running', icon: '🏃', color: '#AD1457' },
] as const;

export type Sport = (typeof SPORTS)[number];
