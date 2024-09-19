'use client'

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ToolBar from "@/components/ToolBar";
import Canvas from "@/components/Canvas";

export default function APP() {
    return (
        <DndProvider backend={HTML5Backend}>
            <ToolBar/>
            <Canvas/>
        </DndProvider>

    );
}
