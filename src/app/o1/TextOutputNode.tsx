// nodes/TextOutputNode.js
import React from 'react';
import { Handle } from 'react-flow-renderer';

function TextOutputNode({ data }) {
    return (
        <div style={{ padding: '10px', border: '1px solid #777', borderRadius: '5px' }}>
            <div>{data.value || '等待输入...'}</div>
            <Handle type="target" position="left" id="b" style={{ top: '50%' }}/>
        </div>
    );
}

export default TextOutputNode;