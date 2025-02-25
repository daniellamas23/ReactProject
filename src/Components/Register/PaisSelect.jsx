import React, { useState, useEffect } from 'react';

const PaisSelect = ({ onSelect }) => {
  const [paises, setPaises] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://movetrack.develotion.com/paises.php')
      .then(response => response.json())
      .then(data => setPaises(data.paises))
      .catch(err => setError('No se encontraron los paises'));
  }, []);

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return (
    <div className="mb-3">
      <label htmlFor="pais" className="form-label">País de Residencia</label>
      <select id="pais" className="form-control" onChange={e => onSelect(e.target.value)} required>
        <option value="">Seleccione un país</option>
        {paises.map(pais => (
          <option key={pais.id} value={pais.id}>
            {pais.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PaisSelect;
