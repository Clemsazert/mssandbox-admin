import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export const Topbar: React.FC = () => (
  <Navbar bg="dark" variant="dark" fixed="top">
    <Navbar.Brand href="#home" className="mr-auto">
      <img
        alt=""
        src="/sandbox.png"
        width="30"
        height="30"
        className="d-inline-block align-top mr-2"
      />
      Micro Services Sandbox
    </Navbar.Brand>
    <Nav.Link href="https://github.com/Clemsazert">
      <i className="fab fa-github fa-2x text-white" />
    </Nav.Link>
  </Navbar>
);
