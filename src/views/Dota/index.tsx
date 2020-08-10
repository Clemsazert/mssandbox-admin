import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import { DotaLoader } from '../../components/Loaders';

import { DOTATeamLight } from '../../models/dotaModels';
import { GET_ALL_TEAMS } from './graphql';

const styles = {
  cardsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
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

export const Dota: React.FC = () => {
  const { data, loading } = useQuery<{ teams: DOTATeamLight[] }>(GET_ALL_TEAMS);
  const [test, setTest] = useState<boolean>(false);
  const history = useHistory();
  const displayTeam = (id: number) => {
    history.push(`/dota/team/${id}`);
  };
  return (
    <div className="w-100 h-100 pl-4 pr-4">
      <Button onClick={() => setTest(!test)} title="Test Loader" />
      <DotaLoader show={loading || test} />
      <p>Here is my dota team following app !</p>
      <div style={styles.cardsContainer as { display: string; flexWrap: 'wrap'; justifyContent: string }}>
        {data
          ? data.teams.map(({ id, name, logoUrl }) => (
            <TeamDisplay id={id} name={name} logoUrl={logoUrl} onDisplayTeam={displayTeam} />
          ))
          : 'No teams'}
      </div>
    </div>
  );
};

interface TeamDisplayProps extends DOTATeamLight {
  onDisplayTeam: (id: number) => void;
}

const TeamDisplay: React.FC<TeamDisplayProps> = ({
  id,
  name,
  logoUrl,
  onDisplayTeam
}) => (
  <Card style={styles.teamCard}>
    <Card.Body>
      <Row
        style={{
          alignItems: 'center',
          fontWeight: 'bold',
          justifyContent: 'space-evenly'
        }}
      >
        <Image src={logoUrl} style={styles.logo} alt="such a beautiful team logo" />
        {name}
      </Row>
    </Card.Body>
    <Button title="Display" onClick={() => { onDisplayTeam(id); }} />
  </Card>
);
