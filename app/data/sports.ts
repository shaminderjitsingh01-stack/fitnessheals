// FitnessHeals Sports Data
export const SPORTS = [
  { name: 'Cricket', slug: 'cricket', icon: '🏏', color: '#2E7D32' },
  { name: 'Baseball', slug: 'baseball', icon: '⚾', color: '#C62828' },
  { name: 'Pickleball', slug: 'pickleball', icon: '🏓', color: '#1565C0' },
  { name: 'Padel', slug: 'padel', icon: '🎾', color: '#6A1B9A' },
  { name: 'Soccer', slug: 'soccer', icon: '⚽', color: '#00695C' },
  { name: 'Basketball', slug: 'basketball', icon: '🏀', color: '#E65100' },
  { name: 'Hockey', slug: 'hockey', icon: '🏒', color: '#0277BD' },
  { name: 'Running', slug: 'running', icon: '🏃', color: '#AD1457' },
  { name: 'Swimming', slug: 'swimming', icon: '🏊', color: '#00838F' },
  { name: 'Muay Thai', slug: 'muay-thai', icon: '🥊', color: '#BF360C' },
  { name: 'Triathlon', slug: 'triathlon', icon: '🏅', color: '#4527A0' },
] as const;

export type Sport = (typeof SPORTS)[number];
