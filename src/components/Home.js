import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const history = useHistory();

  return (
    <div>
      <h1>Métodos Numéricos</h1>
      <button onClick={() => history.push('/newton')}>Interpolación de Newton</button>
      <button onClick={() => history.push('/lagrange')}>Interpolación de Lagrange</button>
    </div>
  );
};

export default Home;
