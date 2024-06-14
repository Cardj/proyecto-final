import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const LagrangeInterpolation = () => {
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

  const calculateLagrange = () => {
    const { x, y } = values;
    const n = x.length;
    let result = [];

    for (let i = 0; i < n; i++) {
      let term = y[i];
      for (let j = 0; j < n; j++) {
        if (j !== i) {
          term *= `(x - ${x[j]}) / (${x[i] - x[j]})`;
        }
      }
      result.push(term);
    }

    setResult(result.join(' + '));
  };

  const createChartData = () => {
    const { x, y } = values;
    const dataPoints = x.map((xi, index) => ({ x: xi, y: y[index] }));
    return {
      labels: x,
      datasets: [
        {
          label: 'Interpolación de Lagrange',
          data: dataPoints,
          borderColor: 'rgba(75,192,192,1)',
          fill: false,
        },
      ],
    };
  };

  return (
    <div>
      <h2>Interpolación de Lagrange</h2>
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
      <button onClick={calculateLagrange}>Calcular</button>
      {result && <div>Resultado: {result}</div>}
      {result && <Line data={createChartData()} />}
      <button onClick={() => history.push('/')}>Regresar</button>
    </div>
  );
};

export default LagrangeInterpolation;
