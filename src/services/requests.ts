import {
  expressSession, flaskSession, goSession, railsSession
} from './session';
import { DOTATeam } from '../models/dotaModels';

export interface apiState {
  status: 'up' | 'down' | 'crashed';
  version?: string;
  environment?: string;
}

/* -------------------------- Express API Requests -------------------------- */

export const expressHealthCheck = (): Promise<apiState> => expressSession.get<apiState>('/healthcheck');
export const getAllTeams = (): Promise<DOTATeam[]> => expressSession.get<DOTATeam[]>('/dota/teams');

export const flaskHealthCheck = (): Promise<apiState> => flaskSession.get<apiState>('/healthcheck');

export const goHealthCheck = (): Promise<apiState> => goSession.get<apiState>('/healthcheck');

export const railsHealthCheck = (): Promise<apiState> => railsSession.get<apiState>('/healthcheck/test');
