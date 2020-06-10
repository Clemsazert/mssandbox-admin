import React from 'react';

import Navbar from 'react-bootstrap/Navbar';

export const Topbar: React.FC = () => (
  <Navbar bg="dark" variant="dark" fixed="top">
    <Navbar.Brand href="#home">
      <img
        alt=""
        src="/sandbox.png"
        width="30"
        height="30"
        className="d-inline-block align-top mr-2"
      />
      Micro Services Sandbox
    </Navbar.Brand>
  </Navbar>
);
