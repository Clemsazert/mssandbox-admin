export interface DOTATeamLight {
  id: number;
  name: string;
  logoUrl?: string;
}

export interface DOTAPlayer {
  id: number;
  name: string;
  gamesPlayed: number;
  wins: number;
}

export interface DOTATeam {
  id: number;
  name: string;
  logoUrl?: string;
  players: DOTAPlayer[];
  rating: number;
  wins: number;
  losses: number;
  lastMatchTime: number;
  tag: string;
}
