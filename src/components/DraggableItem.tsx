import React from 'react';
import { useDrag } from 'react-dnd';

export type DraggableItemProps = {
    type: string;
    id: string;
    name: string;
    top?: number;
    left?: number;
    children?: React.ReactNode;
    data?: Record<string, unknown>;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ type, id, top, left, children, name }) => {
    if (!type) {
        console.log('undefined type', type, id, children)
    }
    const [{ isDragging }, drag] = useDrag({
        type,
        item: { id, type, top, left, name },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        // @ts-expect-error(2322)
        <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move', position: 'absolute', top, left }}>
            {children}
        </div>
    );
};

export default DraggableItem;