import React, { useState } from 'react';

const CmdComponent = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Enviar la consulta al servidor
    const response = await fetch('/api/execute-query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    // Obtener el resultado de la ejecución
    const data = await response.json();
    setResult(data.result);
  };

  return (
    <div>
      <h2>Cmd Component</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter Cypher query"
        />
        <button type="submit">Run</button>
      </form>
      <div>
        <h3>Result:</h3>
        <pre>{result}</pre>
      </div>
    </div>
  );
};

export default CmdComponent;
