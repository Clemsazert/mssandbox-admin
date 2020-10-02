import { gql } from '@apollo/client';

export const GET_QUIZZ = gql`
  query getQuizz {
    generateQuizz {
      question
      type
      answers
      correct
    }
  }
`;
