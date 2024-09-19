import React from 'react';
import { Handle } from 'react-flow-renderer';

function TextInputNode({ data }) {
    return (
        <div style={{ padding: '10px', border: '1px solid #777', borderRadius: '5px' }}>
            <input
                type="text"
                placeholder="输入文本"
                value={data.value || ''}
                onChange={(e) => data.onChange(e.target.value)}
            />
            <Handle type="source" position="right" id="a" style={{ top: '50%' }} />
        </div>
    );
}

export default TextInputNode;


