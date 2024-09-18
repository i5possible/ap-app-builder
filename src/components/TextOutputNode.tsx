import React from 'react';
import NodeLayout from "@/components/NodeLayout";
import { Typography } from "@mui/material";

export type TextOutputData = {
    value: string;
}

export type TextInputNodeProps = {
    id: string;
    data: TextOutputData;
}

const TextInputNode: React.FC<TextInputNodeProps> = ({ id, data }) => {
    const name = 'Text Output';
    return (
        <NodeLayout id={id} name={name}>
            <Typography>
                {data.value as string}
            </Typography>
        </NodeLayout>
    )
};

export default TextInputNode;