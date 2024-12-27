import React, { useState, useEffect } from 'react';

function App() {
    const [pools, setPools] = useState([]);

    useEffect(() => {
        fetch('/api/pools')
            .then((response) => response.json())
            .then((data) => setPools(data))
            .catch((error) => console.error('Error fetching pools:', error));
    }, []);

    return (
        <div className="App">
            <h1>Azure WVD Control Panel</h1>
            <div>
                <h2>Pool List</h2>
                <ul>
                    {pools.map((pool, index) => (
                        <li key={index}>{pool.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
