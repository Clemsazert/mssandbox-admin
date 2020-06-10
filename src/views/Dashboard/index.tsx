import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { HealthCheck } from './components/HealthCheckCard';
import { LoadingButton } from './components/LoadingButton';

import { useDashboard, ApisData } from './useDashboard';

export const Dashboard: React.FC = () => {
  const { data, fetchApiState } = useDashboard();
  return (
    <div className="w-100 h-100 pl-4 pr-4">
      <p>Welcome to the MSSandbox Admin, a simple tool to monitor and experiment
        {' '}about micro services and kubernetes.
      </p>
      <Card className="bg-dark">
        <Card.Header>
          <h3>API Status:</h3>
        </Card.Header>
        <Card.Body>
          <LoadingButton onClick={fetchApiState} title="Refetch Status" />
          <Row className="pt-2">
            {Object.keys(data).map(key => (
              <Col>
                <HealthCheck
                  status={data[key as keyof ApisData].status}
                  name={key}
                  environment={data[key as keyof ApisData].environment}
                  version={data[key as keyof ApisData].version}
                />
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};
