import React from 'react';
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect
} from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { routes } from './routes';
import { client } from './services/apollo';

import { Topbar } from './layout/Topbar';
import { Sidebar } from './layout/Sidebar';

export const App: React.FC = () => (
  <ApolloProvider client={client}>
    <div id="content-wrapper" className="min-vh-100">
      <Router>
        <Topbar />
        <div
          id="content"
          className="d-flex"
          style={{ paddingTop: '3.5rem', height: '100vh' }}
        >
          <Sidebar />
          <div className="pt-4 overflow-auto w-100">
            <Switch>
              {routes.map(({ path, component }) => (
                <Route key={path} path={path} component={component} />
              ))}
              <Redirect from="/" to="/dashboard" />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  </ApolloProvider>
);
