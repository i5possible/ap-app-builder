import React, { useState } from 'react';

interface TextInputProps {
    id: string;
    onTextChange: (id: string, text: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ id, onTextChange }) => {
    const [text, setText] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        onTextChange(id, e.target.value);
    };

    return <textarea value={text} onChange={handleChange} />;
};

export default TextInput;