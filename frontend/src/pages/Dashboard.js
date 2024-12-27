import React from 'react';
import PoolSelector from '../components/PoolSelector';
import UserSearch from '../components/UserSearch';
import SessionControl from '../components/SessionControl';
import PoolStatistics from '../components/PoolStatistics';

function Dashboard() {
  return (
    <div className="container mt-4">
      <h1>Azure WVD Control Panel</h1>
      <PoolSelector />
      <UserSearch />
      <SessionControl />
      <PoolStatistics />
    </div>
  );
}

export default Dashboard;
