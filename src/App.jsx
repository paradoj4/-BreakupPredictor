import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    person1: {
      age: '',
      birthDate: '',
      birthTime: '',
      occupation: '',
      hobbies: '',
      goals: ''
    },
    person2: {
      age: '',
      birthDate: '',
      birthTime: '',
      occupation: '',
      hobbies: '',
      goals: ''
    }
  });

  const handleChange = (person, field, value) => {
    setFormData({
      ...formData,
      [person]: {
        ...formData[person],
        [field]: value
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
    alert('Análisis en proceso...');
    // Aquí iría la lógica para analizar compatibilidad
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Analizador de Compatibilidad</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Persona 1</h2>
          <input placeholder="Edad" type="number" value={formData.person1.age} onChange={(e) => handleChange('person1', 'age', e.target.value)} />
          <input placeholder="Fecha de nacimiento" type="date" value={formData.person1.birthDate} onChange={(e) => handleChange('person1', 'birthDate', e.target.value)} />
          <input placeholder="Hora de nacimiento" type="time" value={formData.person1.birthTime} onChange={(e) => handleChange('person1', 'birthTime', e.target.value)} />
          <input placeholder="Ocupación" type="text" value={formData.person1.occupation} onChange={(e) => handleChange('person1', 'occupation', e.target.value)} />
          <input placeholder="Hobbies" type="text" value={formData.person1.hobbies} onChange={(e) => handleChange('person1', 'hobbies', e.target.value)} />
          <input placeholder="Metas" type="text" value={formData.person1.goals} onChange={(e) => handleChange('person1', 'goals', e.target.value)} />
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h2>Persona 2</h2>
          <input placeholder="Edad" type="number" value={formData.person2.age} onChange={(e) => handleChange('person2', 'age', e.target.value)} />
          <input placeholder="Fecha de nacimiento" type="date" value={formData.person2.birthDate} onChange={(e) => handleChange('person2', 'birthDate', e.target.value)} />
          <input placeholder="Hora de nacimiento" type="time" value={formData.person2.birthTime} onChange={(e) => handleChange('person2', 'birthTime', e.target.value)} />
          <input placeholder="Ocupación" type="text" value={formData.person2.occupation} onChange={(e) => handleChange('person2', 'occupation', e.target.value)} />
          <input placeholder="Hobbies" type="text" value={formData.person2.hobbies} onChange={(e) => handleChange('person2', 'hobbies', e.target.value)} />
          <input placeholder="Metas" type="text" value={formData.person2.goals} onChange={(e) => handleChange('person2', 'goals', e.target.value)} />
        </div>

        <button style={{ marginTop: '2rem' }} type="submit">Analizar Compatibilidad</button>
      </form>
    </div>
  );
}

export default App;