import React from 'react';
import NodeLayout from "@/components/NodeLayout";
import { Typography } from "@mui/material";

export type AIModelNode = {
    text: string;
}

export type AIModelNodeProps = {
    id: string;
    yPos: number;
    xPos: number;
    data: AIModelNode;
}

const AIModelNode: React.FC<AIModelNodeProps> = ({ id, data }) => {
    const name = 'AI Model';
    return (
        <NodeLayout id={id} name={name}>
            <Typography>
                {data.text as string}
            </Typography>
        </NodeLayout>
    )
};

export default AIModelNode;