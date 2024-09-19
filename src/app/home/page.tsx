'use client'
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import FlowCanvas, { Component } from './FlowCanvas';
import Toolbar from './Toolbar';

const App = () => {
    const [components, setComponents] = useState<Component[]>([]);

    // 添加组件
    const addComponent = (type: string) => {
        setComponents([...components, { type, id: components.length + 1 }]);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{ display: 'flex', height: '100vh' }}>
                <Toolbar addComponent={addComponent} />
                <FlowCanvas components={components} />
            </div>
        </DndProvider>
    );
};

export default App;
