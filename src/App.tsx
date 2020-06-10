import React from 'react';

import { Topbar } from './layout/Topbar';
import { Sidebar } from './layout/Sidebar';
import { Dashboard } from './views/Dashboard';

export const App: React.FC = () => (
  <div id="content-wrapper" className="min-vh-100">
    <Topbar />
    <div
      id="content"
      className="d-flex"
      style={{ paddingTop: '3.5rem', height: '100vh' }}
    >
      <Sidebar />
      <div className="pt-4 overflow-auto w-100">
        <Dashboard />
      </div>
    </div>
  </div>
);
