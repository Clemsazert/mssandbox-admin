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
