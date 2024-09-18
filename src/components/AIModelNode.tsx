import React from 'react';
import NodeLayout from "@/components/NodeLayout";
import { Button, Typography } from "@mui/material";

export type AIModelNode = {
    query: () => void;

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
                <Button variant="contained" color="primary" onClick={() => data.query()}>
                    Query AI Model
                </Button>
            </Typography>
        </NodeLayout>
    )
};

export default AIModelNode;