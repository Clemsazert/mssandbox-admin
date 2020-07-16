import React from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { routes } from '../routes';

const styles = {
  main: {
    backgroundColor: '#475057',
    width: '15%',
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10
  },
  navLink: { marginBottom: 20, textDecoration: 'none' },
  navRow: { alignItems: 'center', '&:hover': { backgroundColor: '#475090' } },
  navText: { color: 'white', marginLeft: 10, marginBottom: 0 }
};

export const Sidebar: React.FC = () => (
  <div style={styles.main}>
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion">
      {routes.map(({ path, title, icon }) => (
        title ? <NavLink path={path} title={title} icon={icon} /> : <></>
      ))}
    </ul>
  </div>
);

interface NavLinkProps {
  path: string;
  title: string;
  icon: string;
}

const NavLink: React.FC<NavLinkProps> = ({ path, title, icon }) => (
  <Link to={path} style={styles.navLink}>
    <Col>
      <Row style={styles.navRow}>
        <i className={icon} />
        <h5 style={styles.navText}>{title}</h5>
      </Row>
    </Col>
  </Link>
);
