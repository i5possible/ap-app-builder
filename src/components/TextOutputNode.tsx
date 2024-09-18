import React, { useState } from 'react';
import BaseNode from "@/components/BaseNode";

export type TextInputNodeProps = {
    id: string;
    top: number;
    left: number;
    onTextChange: (id: string, text: string) => void;
}

const TextInputNode: React.FC<TextInputNodeProps> = ({ id, top, left, onTextChange }) => {
    const [text, setText] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        onTextChange(id, e.target.value);
    };

    return (<BaseNode id={id} top={top} left={left}>
        <textarea value={text} onChange={handleChange}/>
    </BaseNode>)
};

export default TextInputNode;