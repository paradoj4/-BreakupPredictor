// App.jsx
import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    person1: {
      name: "",
      birthdate: "",
      birthtime: "",
      occupation: "",
      hobbies: "",
      goals: "",
    },
    person2: {
      name: "",
      birthdate: "",
      birthtime: "",
      occupation: "",
      hobbies: "",
      goals: "",
    },
  });

  const [result, setResult] = useState(null);

  const handleChange = (e, person) => {
    setFormData({
      ...formData,
      [person]: {
        ...formData[person],
        [e.target.name]: e.target.value,
      },
    });
  };

  const getZodiacSign = (date) => {
    const [year, month, day] = date.split("-").map(Number);
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces";
  };

  const calculateCompatibility = () => {
    const { person1, person2 } = formData;
    const sign1 = getZodiacSign(person1.birthdate);
    const sign2 = getZodiacSign(person2.birthdate);

    let score = 50;

    // Simple compatibility boost based on same zodiac sign
    if (sign1 === sign2) score += 20;

    // Compare hobbies
    const hobbies1 = person1.hobbies.toLowerCase().split(",");
    const hobbies2 = person2.hobbies.toLowerCase().split(",");
    const commonHobbies = hobbies1.filter(hobby => hobbies2.includes(hobby.trim()));
    score += commonHobbies.length * 5;

    // Compare goals
    if (person1.goals.toLowerCase() === person2.goals.toLowerCase()) score += 10;

    // Similar occupations
    if (person1.occupation.toLowerCase() === person2.occupation.toLowerCase()) score += 10;

    // Clamp score
    if (score > 100) score = 100;

    setResult({
      sign1,
      sign2,
      score,
    });
  };

  return (
    <div className="App">
      <h1>🔮 Analizador de Compatibilidad de Parejas 💘</h1>
      <div className="form-container">
        {["person1", "person2"].map((person, index) => (
          <div key={person} className="form-section">
            <h2>{`Persona ${index + 1}`}</h2>
            <input type="text" name="name" placeholder="Nombre" value={formData[person].name} onChange={(e) => handleChange(e, person)} />
            <input type="date" name="birthdate" placeholder="Fecha de nacimiento" value={formData[person].birthdate} onChange={(e) => handleChange(e, person)} />
            <input type="time" name="birthtime" placeholder="Hora de nacimiento" value={formData[person].birthtime} onChange={(e) => handleChange(e, person)} />
            <input type="text" name="occupation" placeholder="Ocupación" value={formData[person].occupation} onChange={(e) => handleChange(e, person)} />
            <input type="text" name="hobbies" placeholder="Hobbies (separados por coma)" value={formData[person].hobbies} onChange={(e) => handleChange(e, person)} />
            <input type="text" name="goals" placeholder="Metas" value={formData[person].goals} onChange={(e) => handleChange(e, person)} />
          </div>
        ))}
      </div>
      <button onClick={calculateCompatibility}>Analizar Compatibilidad</button>
      {result && (
        <div className="result">
          <h2>Resultado</h2>
          <p>Signo de {formData.person1.name || "Persona 1"}: {result.sign1}</p>
          <p>Signo de {formData.person2.name || "Persona 2"}: {result.sign2}</p>
          <p>Porcentaje de Compatibilidad: <strong>{result.score}%</strong></p>
          <p>
            {result.score > 80
              ? "¡Son una pareja con gran potencial! 🌟"
              : result.score > 60
              ? "Tienen compatibilidad, aunque deben trabajar en sus diferencias. 💑"
              : result.score > 40
              ? "Hay potencial, pero deben conocerse más a fondo. 🤔"
              : "Compatibilidad baja, pero el amor todo lo puede. ❤️‍🔥"}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
