import React, { useState } from 'react';

function App() {
  const [temperature, setTemperature] = useState('');
  const [windspeed, setWindspeed] = useState('');
  const [precipitation, setPrecipitation] = useState('');
  const [predictions, setPredictions] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        temperature: Number(temperature),
        windspeed: Number(windspeed),
        precipitation: Number(precipitation),
      }),
    });
    const data = await response.json();
    setPredictions(data.predictions);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Weather Risk Predictor</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Temperature (°F)"
          value={temperature}
          required
          onChange={e => setTemperature(e.target.value)}
        />
        <br />
        <input
          type="number"
          placeholder="Wind Speed (mph)"
          value={windspeed}
          required
          onChange={e => setWindspeed(e.target.value)}
        />
        <br />
        <input
          type="number"
          placeholder="Precipitation (mm)"
          value={precipitation}
          required
          onChange={e => setPrecipitation(e.target.value)}
        />
        <br />
        <button type="submit">Predict</button>
      </form>

      {predictions && (
        <div>
          <h2>Predictions</h2>
          <ul>
            {Object.entries(predictions).map(([k, v]) => (
              <li key={k}>{k.replace(/_/g, ' ')}: {(v * 100).toFixed(1)}%</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
