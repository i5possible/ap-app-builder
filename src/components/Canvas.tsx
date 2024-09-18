'use client'
import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
    addEdge,
    Connection,
    ReactFlowProvider,
    useEdgesState,
    useNodesState,
} from 'react-flow-renderer';
import { useDrop } from 'react-dnd';
import TextInputNode from './TextInputNode';
import TextOutputNode from './TextOutputNode';
import { DraggableItemProps } from "@/components/DraggableItem";
import AIModelNode from "./AIModelNode";

const nodeTypes = {
    textInput: TextInputNode,
    textOutput: TextOutputNode,
    aiModel: AIModelNode,
};

function Canvas() {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const [, drop] = useDrop({
        accept: ['textInput', 'aiModel', 'textOutput'],
        drop: (item: DraggableItemProps, monitor) => {
            const clientOffset = monitor.getClientOffset();
            const position = {
                x: clientOffset!.x,
                y: clientOffset!.y,
            };

            const id = `${item.type}_${+new Date()}`;
            const newNode = {
                id,
                type: item.type,
                position,
                data: { label: `${item.name}` },
            };
            // console.log(`newNode: ${newNode.id} ${newNode.type} ${newNode.position.x} ${newNode.position.y}`);

            setNodes((nodes) => ([...nodes, newNode]));
        },
    });

    useEffect(() => {
        // console.log('nodes:', nodes);
    }, [nodes]);

    const onNodeValueChange = (id: string, value: string) => {
        setNodes((nds) =>
            nds.map((node) =>
                node.id === id ? { ...node, data: { ...node.data, value } } : node
            )
        );
    };

    const onQueryAIModel = async (id: string) => {
        // find input node: target === id
        const inputEdge = edges.find((edge) => edge.target === id);
        const inputNode = nodes.find((node) => node.id === inputEdge?.source);
        const question = inputNode?.data.value;
        console.log(`AI Model Query: ${JSON.stringify(question)}`)

        // const inputNode = nodes.find((node) => node.id === id);
        // const response = `AI Model Response to：${question}`;
        const data = await fetch('/api/llama2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question })
        })
        let response = '';
        if (data.ok) {
            response = (await data.json()).data;
        }

        const outputEdge = edges.find((edge) => edge.source === id);
        const outputNode = nodes.find((node) => node.id === outputEdge?.target);
        const outputNodeId = outputNode?.id;


        setNodes((nds) =>
            nds.map((node) =>
                node.id === outputNodeId
                    ? { ...node, data: { ...node.data, value: response } }
                    : node
            )
        );
    }

    const updatedNodes = nodes.map((node) => {
        if (node.type === 'textInput') {
            return {
                ...node,
                data: {
                    ...node.data,
                    onTextChange: onNodeValueChange,
                },
            };
        }
        if (node.type === 'aiModel') {
            return {
                ...node,
                data: {
                    ...node.data,
                    query: () => onQueryAIModel(node.id),
                },
            };
        }
        return node;
    });

    return (
        // @ts-expect-error(2322)
        <div id="canvas" ref={drop} style={{ height: '100vh', flexGrow: 1 }}>
            <ReactFlowProvider>
                <ReactFlow
                    nodes={updatedNodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                >
                </ReactFlow>
            </ReactFlowProvider>
        </div>
    );
}

export default Canvas;
