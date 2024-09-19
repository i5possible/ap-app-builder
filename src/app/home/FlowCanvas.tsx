'use client'
import React from 'react';
import { useDrop } from 'react-dnd';
import InputComponent from './components/InputComponent';
import OutputComponent from './components/OutputComponent';

export type Component = {
    id: number;
    type: string;
};

const FlowCanvas = ({ components }: { components: Component[] }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const [, drop] = useDrop(() => ({
        accept: 'component',
        drop: (item) => {
            console.log(`item: ${item}`);
        },
    }));
    drop(ref);

    return (
        <div ref={ref} style={{ flex: 1, padding: '10px', backgroundColor: '#fafafa' }}>
            {components.map((component) => {
                switch (component.type) {
                    case 'input':
                        return <InputComponent key={component.id}/>;
                    case 'output':
                        return <OutputComponent key={component.id}/>;
                    default:
                        return null;
                }
            })}
        </div>
    );
};

export default FlowCanvas;
