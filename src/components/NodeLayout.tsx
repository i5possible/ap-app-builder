import { Box, Stack, Typography } from '@mui/material';
import React, { memo } from 'react';
import { Handle, Position } from "react-flow-renderer";

type NodeLayoutProps = {
    id: string;
    name: string;
    children: React.ReactNode;
}

const NodeLayout: React.FC<NodeLayoutProps> = ({ id, name, children }) => {
    return (
        <>
            <Handle
                type="target"
                position={Position.Left}
            />
            <Box id={id} sx={{
                minWidth: 200,
                minHeight: 250,
                maxWidth: 400,
                backgroundColor: '#f5f5f5',
                borderRadius: 5,
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'
            }}>
                <Stack direction={'column'} sx={{
                    padding: 2,
                }}>
                    <Typography>
                        {name}
                    </Typography>
                    <Box sx={{
                        padding: '1rem 0',
                    }}>
                        {children}
                    </Box>
                </Stack>
            </Box>
            <Handle
                type="source"
                position={Position.Right}
            />
        </>
    );
}

export default memo(NodeLayout);