import React, { useState } from 'react';

const OutputComponent = () => {
    const [output, setOutput] = useState('LLM response will appear here.');

    const simulateResponse = () => {
        setOutput('This is a simulated response from LLM.');
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <button onClick={simulateResponse}>Generate LLM Response</button>
            <p>{output}</p>
        </div>
    );
};

export default OutputComponent;
