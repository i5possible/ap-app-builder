import React, { useState } from 'react';
import NodeLayout from "@/components/NodeLayout";

export type TextInputData = {
    value: string;
    onTextChange: (id: string, text: string) => void;
}

export type TextInputNodeProps = {
    id: string;
    data: TextInputData;
}

const TextInputNode: React.FC<TextInputNodeProps> = ({ id, data }) => {
    const name = 'Text Input';
    const [text, setText] = useState(data.value);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        data?.onTextChange(id, e.target.value);
    };

    return (
        <NodeLayout name={name} id={id}>
            <textarea style={{ width: '100%', height: '200px', fontSize: '16px' }} value={text} onChange={handleChange}/>
        </NodeLayout>
    )
};

export default TextInputNode;