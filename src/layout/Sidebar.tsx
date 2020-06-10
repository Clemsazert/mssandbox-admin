import React from 'react';

const styles = {
  main: { backgroundColor: '#475057', width: '15%' }
};

export const Sidebar: React.FC = () => (
  <div style={styles.main}>
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" />
  </div>
);
