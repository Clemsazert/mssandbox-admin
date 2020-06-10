/* eslint-disable camelcase */
import { useState, useEffect } from 'react';
import {
  expressHealthCheck,
  flaskHealthCheck,
  goHealthCheck,
  apiState
} from '../../services/requests';

export interface ApisData {
  express_api: apiState;
  flask_api: apiState;
  go_api: apiState;
}

interface useDashboardResult {
  data: ApisData;
  fetchApiState: () => Promise<void>;
}

export const useDashboard = (): useDashboardResult => {
  const [expressState, setExpressState] = useState<apiState>({
    status: 'down'
  });
  const [flaskState, setFlaskState] = useState<apiState>({ status: 'down' });
  const [goState, setGoState] = useState<apiState>({ status: 'down' });

  const fetchApiState = async () => {
    try {
      const { status, version, environment } = await expressHealthCheck();
      setExpressState({ status, version, environment });
    } catch {
      setExpressState({ status: 'crashed' });
    }
    flaskHealthCheck()
      .then(({ status, version, environment }) => {
        setFlaskState({ status, version, environment });
      })
      .catch(() => {
        setFlaskState({ status: 'crashed' });
      });
    goHealthCheck()
      .then(({ status, version, environment }) => {
        setGoState({ status, version, environment });
      })
      .catch(() => {
        setGoState({ status: 'crashed' });
      });
  };
  useEffect(() => {
    fetchApiState();
  }, []);
  return {
    data: { express_api: expressState, flask_api: flaskState, go_api: goState },
    fetchApiState
  };
};
