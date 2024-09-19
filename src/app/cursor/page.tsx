'use client'
import React, { useEffect, useRef, useState } from 'react';
import { DndProvider, DropTargetMonitor } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableItem, { DraggableItemProps } from '@/components/DraggableItem';
import DropZone from '@/components/DropZone';
import TextInput from './components/TextInput';
import TextOutput from './components/TextOutput';
import { ITEM_TYPE } from "@/app/cursor/constants";

const App: React.FC = () => {
    const [components, setComponents] = useState<DraggableItemProps[]>([]);
    const nextId = useRef<number>(1); // 使用 useRef 来保持最新的 nextId

    useEffect(() => {
        console.log(components);
    }, [components]);

    const handleDrop = (item: DraggableItemProps, monitor: DropTargetMonitor) => {
        const dropPosition = monitor.getClientOffset(); // 获取放置时的坐标
        // handle template drop
        if (item.id === 'input-template' || item.id === 'output-template') {
            const newId = `component-${nextId.current}`;
            setComponents((components) => [...components, {
                id: newId,
                type: item.id === 'input-template' ? ITEM_TYPE.INPUT : ITEM_TYPE.OUTPUT,
                left: dropPosition?.x,
                top: dropPosition?.y,
                data: {
                    text: '',
                }
            }]);
            nextId.current = nextId.current + 1;
        } else {
            setComponents((components) =>
                components.map(component =>
                    component.id === item.id ? {
                        ...component,
                        left: dropPosition?.x,
                        top: dropPosition?.y
                    } : component));
        }
    };

    const handleTextChange = (id: string, text: string) => {
        setComponents(components.map(c => c.id === id ? { ...c, text } : c));
    };

    const generateResponse = () => {
        const input = components.find(c => c.type === 'INPUT')?.data?.text || '';
        const response = `LLM response to: "${input}"`;
        const outputComponent = components.find(c => c.type === 'OUTPUT');
        if (outputComponent) {
            handleTextChange(outputComponent.id, response);
        } else {
            const newId = `component-${nextId}`;
            setComponents([...components, { id: newId, type: ITEM_TYPE.OUTPUT, data: { text: response }, top: 100, left: 100 }]);
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                <h1>LLM Interface</h1>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    <DraggableItem type="INPUT" id="input-template">Input</DraggableItem>
                    <DraggableItem type="OUTPUT" id="output-template" left={100}>Output</DraggableItem>
                </div>
                <DropZone onDrop={handleDrop}>
                    {components.map(({ id, type, left, top, data }) => (
                        <DraggableItem key={id} type={type} id={id} left={left} top={top}>
                            {type === 'INPUT' ? (
                                <TextInput id={id} onTextChange={handleTextChange}/>
                            ) : (
                                <TextOutput text={String(data?.text) || ''}/>
                            )}
                        </DraggableItem>
                    ))}
                </DropZone>
                <button onClick={generateResponse}>Generate Response</button>
            </div>
        </DndProvider>
    );
};

export default App;