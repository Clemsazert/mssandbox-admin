import React from 'react';
import { useQuery } from '@apollo/client';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

import { DotaLoader } from '../../components/Loaders';

import { DOTATeam } from '../../models/dotaModels';
import { GET_ALL_TEAMS } from './graphql';

const styles = {
  cardsContainer: {
    // display: 'flex'
  },
  teamCard: {
    width: '25%',
    height: 100,
    marginBottom: 20,
    marginRight: 20
  },
  logo: {
    width: 'auto',
    height: 70
  }
};

export const Dota = () => {
  const { data, loading } = useQuery<{ teams: DOTATeam[] }>(GET_ALL_TEAMS);
  return (
    <div className="w-100 h-100 pl-4 pr-4">
      <DotaLoader show={loading} />
      <p>Here is my dota team following app !</p>
      <div style={styles.cardsContainer}>
        {data
          ? data.teams.map(({ id, name, logoUrl }) => (
              <TeamDisplay id={id} name={name} logoUrl={logoUrl} />
            ))
          : 'No teams'}
      </div>
    </div>
  );
};

const TeamDisplay: React.FC<DOTATeam> = ({ id, name, logoUrl }) => (
  <Card style={styles.teamCard}>
    <Card.Body>
      <Row
        style={{
          alignItems: 'center',
          fontWeight: 'bold',
          justifyContent: 'space-evenly'
        }}
      >
        <Image src={logoUrl} style={styles.logo} />
        {name}
      </Row>
    </Card.Body>
  </Card>
);
