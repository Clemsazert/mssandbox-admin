import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { DotaLoader } from '../../components/Loaders';

import { DOTATeam } from '../../models/dotaModels';
import { GET_TEAM_BY_ID } from './graphql';

export const TeamView: React.FC = () => {
  const { id } = useParams();
  const { data, loading } = useQuery<{ teamById: DOTATeam }>(GET_TEAM_BY_ID, {
    variables: { teamId: id }
  });
  const team = data?.teamById;
  return (
    <div className="w-100 h-100 pl-4 pr-4">
      <DotaLoader show={loading} />
      {team ? (
        <>
          <Row>
            <Card>
              <Card.Header>{team.name}</Card.Header>
              <Card.Body>
                <p>Last Match Time: {moment(team.lastMatchTime).format('L')}</p>
                <p>Rating: {team.rating}</p>
                <p>Game Won: {team.wins}</p>
                <p>Game Lost: {team.losses}</p>
                <p>Tag: {team.tag}</p>
              </Card.Body>
            </Card>
          </Row>
          <Row>
            {team.players.map(player => (
              <Col>
                <p>{player.name}</p>
                <p>Wins: {player.wins}</p>
                <p>Games Played: {player.gamesPlayed}</p>
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <p>No team found</p>
      )}
    </div>
  );
};
