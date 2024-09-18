import React from 'react';
import { useDrag } from 'react-dnd';

interface DraggableItemProps {
    type: string;
    id: string;
    top?: number;
    left?: number;
    children: React.ReactNode;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ type, id, top, left, children }) => {
    if (!type) {
        console.log('undefined type', type, id, children)
    }
    const [{ isDragging }, drag] = useDrag({
        type,
        item: { id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        drag(<div style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move', position: 'absolute', top, left }}>
            {children}
        </div>)
    );
};

export default DraggableItem;