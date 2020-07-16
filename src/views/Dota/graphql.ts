import { gql } from '@apollo/client';

export const GET_ALL_TEAMS = gql`
  query getAllTeams {
    teams {
      id
      name
      logoUrl
    }
  }
`;

export const GET_TEAM_BY_ID = gql`
  query getTeamById($teamId: ID!) {
    teamById(id: $teamId) {
      id
      name
      logoUrl
      players {
        id
        name
        gamesPlayed
        wins
      }
      rating
      wins
      losses
      lastMatchTime
      tag
    }
  }
`;
