/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import Routes from './Routes';

// Starting project
function App() {
  const location = useLocation();
  const loginCondition = location.pathname !== '/';
  return (
    <div className="app-container">
      {loginCondition && <Header />}
      <Routes />
    </div>

  );
}

export default App;
