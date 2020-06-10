import React from 'react';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const styles = {
  card: {
    maxWidth: 450
  },
  iconHolder: {
    width: 50,
    height: 50
  }
};

interface Props {
  name: string;
  status: 'up' | 'down' | 'crashed';
  version?: string;
  environment?: string;
}

export const HealthCheck: React.FC<Props> = ({
  name,
  status,
  version = 'None',
  environment = 'None'
}) => (
  <Card style={styles.card}>
    <Card.Body>
      <Row>
        <div
          style={styles.iconHolder}
          className={`d-flex align-items-center justify-content-center rounded-circle ${
            status === 'up' ? 'bg-success' : 'bg-danger'
          }`}
        >
          {status === 'up' ? (
            <i className="fas fa-check-square" />
          ) : (
            <i className="fas fa-heart-broken" />
          )}
        </div>
        <Col className="ml-2">
          <Row className="font-weight-bold text-primary text-uppercase mb-1">
            {name}
          </Row>
          <Row>
            <h6 className="h6 mb-0">Status: {status}</h6>
          </Row>
        </Col>
        <Col>
          <h6 className="h6 mb-1">Version {version}</h6>
          <h6 className="h6 mb-0">Env. {environment}</h6>
        </Col>
      </Row>
    </Card.Body>
  </Card>
);
