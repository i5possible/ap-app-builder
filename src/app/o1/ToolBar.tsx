import React from 'react';
import { useDrag } from 'react-dnd';

const ItemTypes = {
    COMPONENT: 'component',
};

function DraggableItem({ name, type }) {
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.COMPONENT,
        item: { type, name },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                margin: '8px',
                padding: '8px',
                backgroundColor: '#ccc',
                cursor: 'move',
            }}
        >
            {name}
        </div>
    );
}

function ToolBar() {
    return (
        <div style={{ width: '200px', padding: '16px', borderRight: '1px solid #ccc' }}>
            <h3>工具栏</h3>
            <DraggableItem name="文本输入" type="textInput" />
            <DraggableItem name="文本输出" type="textOutput" />
        </div>
    );
}

export default ToolBar;
