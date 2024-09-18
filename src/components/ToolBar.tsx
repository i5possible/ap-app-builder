import React from 'react';
import DraggableItem from "@/components/DraggableItem";

const ToolBar = () => {
    return (
        <div style={{ width: '200px', padding: '16px', borderRight: '1px solid #ccc' }}>
            <h3>Toolbox</h3>
            <DraggableItem  type="textInput" id={'text-input-template'} name={'Text Input'} top={20} left={250}>
                Text Input
            </DraggableItem>
            <DraggableItem  type="aiModel" id={'ai-model-template'} name={'AI Model'} top={20} left={350}>
                AI Model
            </DraggableItem>
            <DraggableItem  type="textOutput" id={'text-output-template'} name={'Text Output'} top={20} left={450}>
                Text Output
            </DraggableItem>
        </div>
    );
}

export default ToolBar;
