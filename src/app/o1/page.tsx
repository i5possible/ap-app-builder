'use client'
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Canvas from "@/app/o1/Canvas";
import ToolBar from "@/app/o1/ToolBar";

const Main = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                <ToolBar/>
                <Canvas/>
            </div>
        </DndProvider>
    )
}

export default Main;