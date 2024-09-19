import React, { useRef, useState } from 'react';
import { useDrag } from 'react-dnd';

const InputComponent = () => {
    const [inputValue, setInputValue] = useState('');

    const [, drag] = useDrag(() => ({
        type: 'component',
    }));

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter text"
            />
        </div>
    );
};

export default InputComponent;
