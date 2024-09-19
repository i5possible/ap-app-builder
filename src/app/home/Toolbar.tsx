import React from 'react';

const Toolbar = ({ addComponent }: { addComponent: (type: string) => void }) => {
    return (
        <div style={{ width: '200px', padding: '10px', backgroundColor: '#f5f5f5' }}>
            <h3>Components</h3>
            <button onClick={() => addComponent('input')}>Add Input</button>
            <button onClick={() => addComponent('output')}>Add Output</button>
            <button onClick={() => addComponent('image')}>Add Image</button>
        </div>
    );
};

export default Toolbar;
