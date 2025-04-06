// src/App.jsx
import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    persona1: {
      nombre: "",
      genero: "",
      fechaNacimiento: "",
      horaNacimiento: "",
      metas: "",
      comunicacion: "Buena",
    },
    persona2: {
      nombre: "",
      genero: "",
      fechaNacimiento: "",
      horaNacimiento: "",
      metas: "",
      comunicacion: "Buena",
    },
  });

  const [resultado, setResultado] = useState("");

  const handleChange = (e, persona) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [persona]: {
        ...prev[persona],
        [name]: value,
      },
    }));
  };

  const calcularCompatibilidad = () => {
    const p1 = formData.persona1;
    const p2 = formData.persona2;

    let puntaje = 0;

    // Comunicación
    const puntosComunicacion = {
      "Nula": 0,
      "Poca": 1,
      "Buena": 2,
      "Muy buena": 3,
    };
    puntaje += puntosComunicacion[p1.comunicacion];
    puntaje += puntosComunicacion[p2.comunicacion];

    // Metas similares
    if (p1.metas.trim().toLowerCase() === p2.metas.trim().toLowerCase()) {
      puntaje += 2;
    }

    // Signos zodiacales (básico)
    const signosCompatibles = [
      ["Aries", "Leo", "Sagitario"],
      ["Tauro", "Virgo", "Capricornio"],
      ["Géminis", "Libra", "Acuario"],
      ["Cáncer", "Escorpio", "Piscis"],
    ];

    const obtenerSigno = (fecha) => {
      const [anio, mes, dia] = fecha.split("-").map(Number);
      if ((mes === 3 && dia >= 21) || (mes === 4 && dia <= 19)) return "Aries";
      if ((mes === 4 && dia >= 20) || (mes === 5 && dia <= 20)) return "Tauro";
      if ((mes === 5 && dia >= 21) || (mes === 6 && dia <= 20)) return "Géminis";
      if ((mes === 6 && dia >= 21) || (mes === 7 && dia <= 22)) return "Cáncer";
      if ((mes === 7 && dia >= 23) || (mes === 8 && dia <= 22)) return "Leo";
      if ((mes === 8 && dia >= 23) || (mes === 9 && dia <= 22)) return "Virgo";
      if ((mes === 9 && dia >= 23) || (mes === 10 && dia <= 22)) return "Libra";
      if ((mes === 10 && dia >= 23) || (mes === 11 && dia <= 21)) return "Escorpio";
      if ((mes === 11 && dia >= 22) || (mes === 12 && dia <= 21)) return "Sagitario";
      if ((mes === 12 && dia >= 22) || (mes === 1 && dia <= 19)) return "Capricornio";
      if ((mes === 1 && dia >= 20) || (mes === 2 && dia <= 18)) return "Acuario";
      if ((mes === 2 && dia >= 19) || (mes === 3 && dia <= 20)) return "Piscis";
      return "Desconocido";
    };

    const signo1 = obtenerSigno(p1.fechaNacimiento);
    const signo2 = obtenerSigno(p2.fechaNacimiento);

    const signosCompatiblesEntreSi = signosCompatibles.find(
      (grupo) => grupo.includes(signo1) && grupo.includes(signo2)
    );
    if (signosCompatiblesEntreSi) {
      puntaje += 3;
    }

    // Compatibilidad de género puede ajustarse a tu lógica

    const porcentaje = Math.min(Math.round((puntaje / 10) * 100), 100);
    let mensaje = `La compatibilidad entre ${p1.nombre} y ${p2.nombre} es del ${porcentaje}%.`;

    if (porcentaje >= 80) {
      mensaje += " ¡Tienen una conexión muy fuerte!";
    } else if (porcentaje >= 60) {
      mensaje += " Hay buena base para una relación.";
    } else {
      mensaje += " Podrían necesitar trabajar más en su relación.";
    }

    setResultado(mensaje);
  };

  return (
    <div className="App">
      <h1>Analizador de Compatibilidad de Pareja 💖</h1>

      {[1, 2].map((num) => (
        <div key={num} className="persona">
          <h2>Persona {num}</h2>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData[`persona${num}`].nombre}
            onChange={(e) => handleChange(e, `persona${num}`)}
          />
          <select
            name="genero"
            value={formData[`persona${num}`].genero}
            onChange={(e) => handleChange(e, `persona${num}`)}
          >
            <option value="">Seleccionar género</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
          <input
            type="date"
            name="fechaNacimiento"
            value={formData[`persona${num}`].fechaNacimiento}
            onChange={(e) => handleChange(e, `persona${num}`)}
          />
          <input
            type="time"
            name="horaNacimiento"
            value={formData[`persona${num}`].horaNacimiento}
            onChange={(e) => handleChange(e, `persona${num}`)}
          />
          <input
            type="text"
            name="metas"
            placeholder="Metas"
            value={formData[`persona${num}`].metas}
            onChange={(e) => handleChange(e, `persona${num}`)}
          />
          <select
            name="comunicacion"
            value={formData[`persona${num}`].comunicacion}
            onChange={(e) => handleChange(e, `persona${num}`)}
          >
            <option value="Nula">Comunicación: Nula</option>
            <option value="Poca">Poca</option>
            <option value="Buena">Buena</option>
            <option value="Muy buena">Muy buena</option>
          </select>
        </div>
      ))}

      <button onClick={calcularCompatibilidad}>Analizar Compatibilidad</button>

      {resultado && <div className="resultado">{resultado}</div>}
    </div>
  );
}

export default App;
