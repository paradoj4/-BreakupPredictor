import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    person1: {
      age: '',
      birthDate: '',
      birthTime: '',
      occupation: '',
      hobbies: '',
      goals: '',
    },
    person2: {
      age: '',
      birthDate: '',
      birthTime: '',
      occupation: '',
      hobbies: '',
      goals: '',
    },
  });

  const handleChange = (e, person) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [person]: {
        ...prevState[person],
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const p1 = formData.person1;
    const p2 = formData.person2;

    const edadCompatible = Math.abs(p1.age - p2.age) <= 10;
    const hobbies1 = p1.hobbies.toLowerCase().split(',').map(h => h.trim());
    const hobbies2 = p2.hobbies.toLowerCase().split(',').map(h => h.trim());
    const hobbiesComunes = hobbies1.filter(h => hobbies2.includes(h));

    const metas1 = p1.goals.toLowerCase();
    const metas2 = p2.goals.toLowerCase();
    const metasCompatibles = metas1 && metas2 && (metas1.includes(metas2) || metas2.includes(metas1));

    let resultado = '🔍 Resultado del análisis de compatibilidad:\n\n';
    resultado += `📊 Diferencia de edad: ${Math.abs(p1.age - p2.age)} años → ${edadCompatible ? '✅ Compatible' : '❌ Muy diferente'}\n\n`;
    resultado += `🎯 Hobbies en común: ${hobbiesComunes.length > 0 ? hobbiesComunes.join(', ') : 'Ninguno'} → ${hobbiesComunes.length > 0 ? '✅ Compatible' : '❌ Poca afinidad'}\n\n`;
    resultado += `🚀 Metas similares: ${metasCompatibles ? '✅ Sí' : '❌ No'}`;

    alert(resultado);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>💘 Analizador de Compatibilidad de Parejas</h1>
      <form onSubmit={handleSubmit}>
        <h2>👤 Persona 1</h2>
        <input type="number" name="age" placeholder="Edad" onChange={(e) => handleChange(e, 'person1')} required />
        <input type="date" name="birthDate" placeholder="Fecha de nacimiento" onChange={(e) => handleChange(e, 'person1')} required />
        <input type="time" name="birthTime" placeholder="Hora de nacimiento" onChange={(e) => handleChange(e, 'person1')} required />
        <input type="text" name="occupation" placeholder="Ocupación" onChange={(e) => handleChange(e, 'person1')} required />
        <input type="text" name="hobbies" placeholder="Hobbies (separados por coma)" onChange={(e) => handleChange(e, 'person1')} required />
        <input type="text" name="goals" placeholder="Metas" onChange={(e) => handleChange(e, 'person1')} required />

        <h2>👤 Persona 2</h2>
        <input type="number" name="age" placeholder="Edad" onChange={(e) => handleChange(e, 'person2')} required />
        <input type="date" name="birthDate" placeholder="Fecha de nacimiento" onChange={(e) => handleChange(e, 'person2')} required />
        <input type="time" name="birthTime" placeholder="Hora de nacimiento" onChange={(e) => handleChange(e, 'person2')} required />
        <input type="text" name="occupation" placeholder="Ocupación" onChange={(e) => handleChange(e, 'person2')} required />
        <input type="text" name="hobbies" placeholder="Hobbies (separados por coma)" onChange={(e) => handleChange(e, 'person2')} required />
        <input type="text" name="goals" placeholder="Metas" onChange={(e) => handleChange(e, 'person2')} required />

        <br /><br />
        <button type="submit">Analizar Compatibilidad</button>
      </form>
    </div>
  );
}

export default App;