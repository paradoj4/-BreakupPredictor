import React, { useState } from "react";
import "./App.css";

const zodiacSigns = [
  "Aries", "Tauro", "Géminis", "Cáncer", "Leo", "Virgo",
  "Libra", "Escorpio", "Sagitario", "Capricornio", "Acuario", "Piscis"
];

function App() {
  const [formData, setFormData] = useState({
    person1: {
      name: "",
      birthDate: "",
      birthTime: "",
      zodiacSign: "",
      gender: "",
      goals: "",
      communication: ""
    },
    person2: {
      name: "",
      birthDate: "",
      birthTime: "",
      zodiacSign: "",
      gender: "",
      goals: "",
      communication: ""
    },
  });

  const [result, setResult] = useState(null);

  const handleChange = (e, person) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [person]: {
        ...prev[person],
        [name]: value,
      },
    }));
  };

  const analyzeCompatibility = () => {
    const { person1, person2 } = formData;

    // Compatibilidad de signos (simulada)
    const signCompatibility = person1.zodiacSign === person2.zodiacSign ? 80 : 60;

    // Compatibilidad de metas
    const goalsCompatible = person1.goals.toLowerCase() === person2.goals.toLowerCase();
    const goalsScore = goalsCompatible ? 85 : 55;

    // Comunicación
    const commLevels = { "nula": 20, "poca": 50, "buena": 80, "muy buena": 95 };
    const comm1 = commLevels[person1.communication] || 50;
    const comm2 = commLevels[person2.communication] || 50;
    const avgComm = (comm1 + comm2) / 2;

    // Promedio final
    const finalScore = Math.round((signCompatibility + goalsScore + avgComm) / 3);

    const summary = `
    Compatibilidad entre signos (${person1.zodiacSign} y ${person2.zodiacSign}): ${signCompatibility}%. Esto indica una ${signCompatibility >= 70 ? "alta" : "moderada"} conexión astral.

    Compatibilidad de metas: ${goalsCompatible ? "Ambos comparten metas similares, lo cual fortalece la relación." : "Las metas difieren, lo que podría traer desafíos si no se comunican bien."}

    Nivel de comunicación: ${person1.communication} y ${person2.communication}. La comunicación promedio entre ambos es de ${Math.round(avgComm)}%. Esto influye directamente en la capacidad de resolver conflictos y compartir emociones.

    ➤ Porcentaje total de compatibilidad: ${finalScore}%
    `;

    setResult(summary);
  };

  return (
    <div className="App">
      <h1>💘 Analizador de Compatibilidad de Pareja 💘</h1>
      <div className="form-container">
        {["person1", "person2"].map((person, idx) => (
          <div key={person} className="form-section">
            <h2>Persona {idx + 1}</h2>
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={formData[person].name}
              onChange={(e) => handleChange(e, person)}
            />
            <select
              name="gender"
              value={formData[person].gender}
              onChange={(e) => handleChange(e, person)}
            >
              <option value="">Género</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
            </select>
            <input
              type="date"
              name="birthDate"
              value={formData[person].birthDate}
              onChange={(e) => handleChange(e, person)}
            />
            <input
              type="time"
              name="birthTime"
              value={formData[person].birthTime}
              onChange={(e) => handleChange(e, person)}
            />
            <select
              name="zodiacSign"
              value={formData[person].zodiacSign}
              onChange={(e) => handleChange(e, person)}
            >
              <option value="">Signo Zodiacal</option>
              {zodiacSigns.map((sign) => (
                <option key={sign} value={sign}>{sign}</option>
              ))}
            </select>
            <input
              type="text"
              name="goals"
              placeholder="Metas personales"
              value={formData[person].goals}
              onChange={(e) => handleChange(e, person)}
            />
            <select
              name="communication"
              value={formData[person].communication}
              onChange={(e) => handleChange(e, person)}
            >
              <option value="">Nivel de comunicación</option>
              <option value="nula">Nula</option>
              <option value="poca">Poca</option>
              <option value="buena">Buena</option>
              <option value="muy buena">Muy buena</option>
            </select>
          </div>
        ))}
      </div>
      <button onClick={analyzeCompatibility}>Analizar Compatibilidad</button>
      {result && (
        <div className="result">
          <h2>🔮 Resultado del Análisis</h2>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
