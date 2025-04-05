import React, { useState } from "react";

const compatibilityAnalysis = (data) => {
  const { age1, age2, job1, job2, birthdate1, birthdate2 } = data;

  let score = 50;

  const ageDiff = Math.abs(age1 - age2);
  if (ageDiff <= 2) score += 10;
  else if (ageDiff >= 10) score -= 15;

  const creativeJobs = ["diseñador", "escritor", "artista", "actor", "músico"];
  const techJobs = ["programador", "ingeniero", "analista", "científico"];

  if (
    (creativeJobs.includes(job1.toLowerCase()) && creativeJobs.includes(job2.toLowerCase())) ||
    (techJobs.includes(job1.toLowerCase()) && techJobs.includes(job2.toLowerCase()))
  ) {
    score += 10;
  } else if (job1.toLowerCase() === job2.toLowerCase()) {
    score += 5;
  } else {
    score -= 10;
  }

  const getMonth = (birthdate) => new Date(birthdate).getMonth();
  const month1 = getMonth(birthdate1);
  const month2 = getMonth(birthdate2);

  if (month1 === month2) {
    score += 10;
  } else if (Math.abs(month1 - month2) === 6) {
    score -= 10;
  }

  if (score >= 70) return "Alta compatibilidad. ¡El amor es real! 💖";
  if (score >= 50) return "Compatibilidad media. Hay potencial si se esfuerzan. 🤔";
  return "Compatibilidad baja. Podría acabarse en cualquier momento... 💔";
};

export default function App() {
  const [formData, setFormData] = useState({
    age1: "",
    age2: "",
    birthdate1: "",
    birthdate2: "",
    job1: "",
    job2: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedData = {
      ...formData,
      age1: parseInt(formData.age1),
      age2: parseInt(formData.age2),
    };
    const analysis = compatibilityAnalysis(parsedData);
    setResult(analysis);
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto', padding: 20 }}>
      <h1>Ruptura Predictor</h1>
      <form onSubmit={handleSubmit}>
        <input type="number" name="age1" placeholder="Edad Persona 1" onChange={handleChange} required /><br />
        <input type="date" name="birthdate1" onChange={handleChange} required /><br />
        <input name="job1" placeholder="Ocupación Persona 1" onChange={handleChange} required /><br />
        <input type="number" name="age2" placeholder="Edad Persona 2" onChange={handleChange} required /><br />
        <input type="date" name="birthdate2" onChange={handleChange} required /><br />
        <input name="job2" placeholder="Ocupación Persona 2" onChange={handleChange} required /><br />
        <button type="submit">Analizar Compatibilidad</button>
      </form>
      {result && <div style={{ marginTop: 20, fontWeight: 'bold' }}>Resultado: {result}</div>}
    </div>
  );
}
