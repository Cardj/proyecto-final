import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const NewtonInterpolation = () => {
  const [values, setValues] = useState({ x: [], y: [] });
  const [result, setResult] = useState(null);
  const [inputCount, setInputCount] = useState(0);
  const history = useHistory();

  const handleInputChange = (e, index, type) => {
    const newValue = [...values[type]];
    newValue[index] = parseFloat(e.target.value);
    setValues({ ...values, [type]: newValue });
  };

  const handleInputCountChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setInputCount(count);
    setValues({ x: Array(count).fill(''), y: Array(count).fill('') });
  };

  const calculateNewton = () => {
    const { x, y } = values;
    const n = x.length;
    let dividedDiff = Array(n).fill(0).map(() => Array(n).fill(0));
    let result = [];

    for (let i = 0; i < n; i++) {
      dividedDiff[i][0] = y[i];
    }

    for (let j = 1; j < n; j++) {
      for (let i = 0; i < n - j; i++) {
        dividedDiff[i][j] = (dividedDiff[i + 1][j - 1] - dividedDiff[i][j - 1]) / (x[i + j] - x[i]);
      }
    }

    for (let i = 0; i < n; i++) {
      result.push(dividedDiff[0][i]);
    }

    setResult(result);
  };

  const createChartData = () => {
    const { x, y } = values;
    const dataPoints = x.map((xi, index) => ({ x: xi, y: y[index] }));
    return {
      labels: x,
      datasets: [
        {
          label: 'Interpolación de Newton',
          data: dataPoints,
          borderColor: 'rgba(75,192,192,1)',
          fill: false,
        },
      ],
    };
  };

  return (
    <div>
      <h2>Interpolación de Newton</h2>
      <label>
        Cantidad de puntos:
        <input type="number" value={inputCount} onChange={handleInputCountChange} />
      </label>
      {Array.from({ length: inputCount }).map((_, index) => (
        <div key={index}>
          <label>
            x{index}:
            <input
              type="number"
              step="any"
              value={values.x[index]}
              onChange={(e) => handleInputChange(e, index, 'x')}
            />
          </label>
          <label>
            y{index}:
            <input
              type="number"
              step="any"
              value={values.y[index]}
              onChange={(e) => handleInputChange(e, index, 'y')}
            />
          </label>
        </div>
      ))}
      <button onClick={calculateNewton}>Calcular</button>
      {result && <div>Resultado: {result.join(', ')}</div>}
      {result && <Line data={createChartData()} />}
      <button onClick={() => history.push('/')}>Regresar</button>
    </div>
  );
};

export default NewtonInterpolation;
