import React from 'react';
import { Card, CardContent } from "@mui/material";
import { NodeProps } from "react-flow-renderer";

type NodeLayoutProps = {
    top: number;
    left: number;
    children: React.ReactNode;
}

const NodeLayout: React.FC<NodeProps> = ({ top, left, children }) => {
    return (
        <Card sx={{ position: 'absolute', top, left }}>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
}

export default NodeLayout;