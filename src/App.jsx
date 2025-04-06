import React, { useState } from "react";

const getZodiacSign = (dateString) => {
  const date = new Date(dateString);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;

  const signs = [
    { name: "Aries", from: [3, 21], to: [4, 19] },
    { name: "Tauro", from: [4, 20], to: [5, 20] },
    { name: "Géminis", from: [5, 21], to: [6, 20] },
    { name: "Cáncer", from: [6, 21], to: [7, 22] },
    { name: "Leo", from: [7, 23], to: [8, 22] },
    { name: "Virgo", from: [8, 23], to: [9, 22] },
    { name: "Libra", from: [9, 23], to: [10, 22] },
    { name: "Escorpio", from: [10, 23], to: [11, 21] },
    { name: "Sagitario", from: [11, 22], to: [12, 21] },
    { name: "Capricornio", from: [12, 22], to: [1, 19] },
    { name: "Acuario", from: [1, 20], to: [2, 18] },
    { name: "Piscis", from: [2, 19], to: [3, 20] },
  ];

  return (
    signs.find((sign) => {
      const [fromMonth, fromDay] = sign.from;
      const [toMonth, toDay] = sign.to;

      return (
        (month === fromMonth && day >= fromDay) ||
        (month === toMonth && day <= toDay)
      );
    })?.name || "Desconocido"
  );
};

const compatibility = {
  Aries: ["Leo", "Sagitario", "Géminis"],
  Tauro: ["Virgo", "Capricornio", "Cáncer"],
  Géminis: ["Libra", "Acuario", "Aries"],
  Cáncer: ["Escorpio", "Piscis", "Tauro"],
  Leo: ["Aries", "Sagitario", "Libra"],
  Virgo: ["Tauro", "Capricornio", "Escorpio"],
  Libra: ["Géminis", "Acuario", "Leo"],
  Escorpio: ["Cáncer", "Piscis", "Virgo"],
  Sagitario: ["Aries", "Leo", "Acuario"],
  Capricornio: ["Tauro", "Virgo", "Piscis"],
  Acuario: ["Géminis", "Libra", "Sagitario"],
  Piscis: ["Cáncer", "Escorpio", "Capricornio"],
};

function App() {
  const [form, setForm] = useState({
    nombre1: "",
    fecha1: "",
    hora1: "",
    ocupacion1: "",
    hobbies1: "",
    metas1: "",
    nombre2: "",
    fecha2: "",
    hora2: "",
    ocupacion2: "",
    hobbies2: "",
    metas2: "",
  });

  const [resultado, setResultado] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const analizarCompatibilidad = () => {
    const signo1 = getZodiacSign(form.fecha1);
    const signo2 = getZodiacSign(form.fecha2);
    const compatibles = compatibility[signo1] || [];

    const esCompatible = compatibles.includes(signo2);
    const porcentaje = esCompatible
      ? Math.floor(Math.random() * 21 + 80)
      : Math.floor(Math.random() * 41 + 40);

    const mensaje = esCompatible
      ? `¡Buena compatibilidad! ${signo1} y ${signo2} suelen llevarse bien.`
      : `Compatibilidad moderada. ${signo1} y ${signo2} pueden necesitar más comunicación.`;

    setResultado(
      `Signos: ${signo1} y ${signo2}. ${mensaje} Compatibilidad: ${porcentaje}%`
    );
  };

  return (
    <div style={{
      padding: "2rem",
      background: "linear-gradient(135deg, #ffafbd, #ffc3a0)",
      minHeight: "100vh",
      fontFamily: "'Comic Sans MS', cursive, sans-serif",
      color: "#4b2c4e"
    }}>
      <h1 style={{ textAlign: "center" }}>💖 Analizador de Compatibilidad de Pareja 💖</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          analizarCompatibilidad();
        }}
        style={{
          maxWidth: "600px",
          margin: "auto",
          background: "rgba(255,255,255,0.85)",
          padding: "2rem",
          borderRadius: "20px",
          boxShadow: "0 0 20px rgba(0,0,0,0.1)"
        }}
      >
        <h2>Persona 1</h2>
        <input name="nombre1" placeholder="Nombre" onChange={handleChange} />
        <input name="fecha1" type="date" onChange={handleChange} />
        <input name="hora1" type="time" onChange={handleChange} />
        <input name="ocupacion1" placeholder="Ocupación" onChange={handleChange} />
        <input name="hobbies1" placeholder="Hobbies" onChange={handleChange} />
        <input name="metas1" placeholder="Metas" onChange={handleChange} />

        <h2>Persona 2</h2>
        <input name="nombre2" placeholder="Nombre" onChange={handleChange} />
        <input name="fecha2" type="date" onChange={handleChange} />
        <input name="hora2" type="time" onChange={handleChange} />
        <input name="ocupacion2" placeholder="Ocupación" onChange={handleChange} />
        <input name="hobbies2" placeholder="Hobbies" onChange={handleChange} />
        <input name="metas2" placeholder="Metas" onChange={handleChange} />

        <button type="submit" style={{
          marginTop: "1rem",
          background: "#ff69b4",
          color: "white",
          padding: "0.5rem 1.5rem",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer"
        }}>
          💌 Analizar Compatibilidad
        </button>
      </form>

      {resultado && (
        <div style={{
          marginTop: "2rem",
          maxWidth: "600px",
          margin: "2rem auto",
          background: "white",
          padding: "1.5rem",
          borderRadius: "15px",
          textAlign: "center",
          boxShadow: "0 0 15px rgba(0,0,0,0.1)"
        }}>
          <strong>{resultado}</strong>
        </div>
      )}
    </div>
  );
}

export default App;
