import React from 'react';

interface TextOutputProps {
    text: string;
}

const TextOutput: React.FC<TextOutputProps> = ({ text }) => {
    return <div>Output: {text}</div>;
};

export default TextOutput;