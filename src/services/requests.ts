import { expressSession, flaskSession, goSession } from './session';

export interface apiState {
  status: 'up' | 'down' | 'crashed';
  version?: string;
  environment?: string;
}

export const expressHealthCheck = (): Promise<apiState> => expressSession.get<apiState>('/healthcheck');

export const flaskHealthCheck = (): Promise<apiState> => flaskSession.get<apiState>('/healthcheck');

export const goHealthCheck = (): Promise<apiState> => goSession.get<apiState>('/healthcheck');
