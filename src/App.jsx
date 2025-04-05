import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    edad: '',
    fechaNacimiento: '',
    horaNacimiento: '',
    ocupacion: '',
    hobbies: '',
    metas: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
    // Aquí puedes agregar lógica para "predecir la ruptura" o enviar los datos a un backend
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: 'auto' }}>
      <h1>Predictor de Ruptura</h1>
      <form onSubmit={handleSubmit}>
        <label>Edad: <input type="number" name="edad" value={formData.edad} onChange={handleChange} required /></label><br />
        <label>Fecha de nacimiento: <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} required /></label><br />
        <label>Hora de nacimiento: <input type="time" name="horaNacimiento" value={formData.horaNacimiento} onChange={handleChange} required /></label><br />
        <label>Ocupación: <input type="text" name="ocupacion" value={formData.ocupacion} onChange={handleChange} required /></label><br />
        <label>Hobbies: <input type="text" name="hobbies" value={formData.hobbies} onChange={handleChange} required /></label><br />
        <label>Metas: <input type="text" name="metas" value={formData.metas} onChange={handleChange} required /></label><br />
        <button type="submit">Analizar compatibilidad</button>
      </form>
    </div>
  );
}

export default App;