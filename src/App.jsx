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
    const mensaje = esCompatible
      ? `Buena compatibilidad entre ${signo1} y ${signo2}.`
      : `Compatibilidad baja entre ${signo1} y ${signo2}, pero todo se puede trabajar si hay amor.`;

    setResultado(`Signos: ${signo1} y ${signo2}. ${mensaje}`);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Analizador de Compatibilidad de Pareja</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          analizarCompatibilidad();
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

        <button type="submit">Analizar</button>
      </form>

      {resultado && <p style={{ marginTop: "1rem" }}>{resultado}</p>}
    </div>
  );
}

export default App;
