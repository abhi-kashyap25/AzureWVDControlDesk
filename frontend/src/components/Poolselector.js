import React, { useState } from 'react';

function PoolSelector() {
  const [selectedPool, setSelectedPool] = useState('');

  const handleSelect = (event) => {
    setSelectedPool(event.target.value);
  };

  return (
    <div className="mb-3">
      <label htmlFor="poolSelector" className="form-label">Select Pool</label>
      <select id="poolSelector" className="form-select" onChange={handleSelect}>
        <option value="">-- Select a Pool --</option>
        <option value="pool1">Pool 1</option>
        <option value="pool2">Pool 2</option>
      </select>
      {selectedPool && <p>Selected Pool: {selectedPool}</p>}
    </div>
  );
}

export default PoolSelector;
