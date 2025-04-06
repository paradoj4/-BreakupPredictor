import React, { useState } from 'react';
import './App.css';

const zodiacSigns = [
  { sign: 'Aries', start: '03-21', end: '04-19' },
  { sign: 'Taurus', start: '04-20', end: '05-20' },
  { sign: 'Gemini', start: '05-21', end: '06-20' },
  { sign: 'Cancer', start: '06-21', end: '07-22' },
  { sign: 'Leo', start: '07-23', end: '08-22' },
  { sign: 'Virgo', start: '08-23', end: '09-22' },
  { sign: 'Libra', start: '09-23', end: '10-22' },
  { sign: 'Scorpio', start: '10-23', end: '11-21' },
  { sign: 'Sagittarius', start: '11-22', end: '12-21' },
  { sign: 'Capricorn', start: '12-22', end: '01-19' },
  { sign: 'Aquarius', start: '01-20', end: '02-18' },
  { sign: 'Pisces', start: '02-19', end: '03-20' }
];

function getZodiacSign(date) {
  const d = new Date(date);
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  const formattedDate = `${month}-${day}`;

  for (const z of zodiacSigns) {
    if (
      (z.start <= formattedDate && formattedDate <= z.end) ||
      (z.start > z.end && (formattedDate >= z.start || formattedDate <= z.end))
    ) {
      return z.sign;
    }
  }
  return '';
}

function App() {
  const [formData, setFormData] = useState({
    person1: { birthdate: '', birthtime: '', goals: '', communication: 'Buena' },
    person2: { birthdate: '', birthtime: '', goals: '', communication: 'Buena' }
  });
  const [result, setResult] = useState(null);

  const handleChange = (e, person) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [person]: {
        ...prev[person],
        [name]: value
      }
    }));
  };

  const calculateCompatibility = () => {
    const { person1, person2 } = formData;

    const sign1 = getZodiacSign(person1.birthdate);
    const sign2 = getZodiacSign(person2.birthdate);

    const scoreMap = {
      'Muy buena': 25,
      'Buena': 20,
      'Poca': 10,
      'Nula': 0
    };

    let score = 50;

    if (sign1 === sign2) score += 10;
    else score += 5;

    if (person1.goals === person2.goals) score += 15;
    else score += 5;

    score += scoreMap[person1.communication] || 0;
    score += scoreMap[person2.communication] || 0;

    const percentage = Math.min(100, Math.round(score));
    let message = '';

    if (percentage > 85) message = '¡Pareja muy compatible!';
    else if (percentage > 60) message = 'Tienen buena compatibilidad con margen para mejorar.';
    else if (percentage > 40) message = 'Compatibilidad media. Trabajen en sus diferencias.';
    else message = 'Poca compatibilidad. Requiere mucho trabajo en la relación.';

    setResult({ sign1, sign2, percentage, message });
  };

  return (
    <div className="form-container">
      <h1>Breakup Predictor</h1>

      {["person1", "person2"].map((person, index) => (
        <div key={person}>
          <h2>Persona {index + 1}</h2>

          <label>Fecha de nacimiento:</label>
          <input type="date" name="birthdate" value={formData[person].birthdate} onChange={(e) => handleChange(e, person)} />

          <label>Hora de nacimiento:</label>
          <input type="time" name="birthtime" value={formData[person].birthtime} onChange={(e) => handleChange(e, person)} />

          <label>Metas:</label>
          <input type="text" name="goals" value={formData[person].goals} onChange={(e) => handleChange(e, person)} />

          <label>Comunicación:</label>
          <select name="communication" value={formData[person].communication} onChange={(e) => handleChange(e, person)}>
            <option value="Muy buena">Muy buena</option>
            <option value="Buena">Buena</option>
            <option value="Poca">Poca</option>
            <option value="Nula">Nula</option>
          </select>
        </div>
      ))}

      <button onClick={calculateCompatibility}>Analizar compatibilidad</button>

      {result && (
        <div className="result">
          <h2>Resultados</h2>
          <p>Signo de la persona 1: {result.sign1}</p>
          <p>Signo de la persona 2: {result.sign2}</p>
          <p>Porcentaje de compatibilidad: <strong>{result.percentage}%</strong></p>
          <p><em>{result.message}</em></p>
        </div>
      )}
    </div>
  );
}

export default App;