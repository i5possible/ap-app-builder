// Canvas.js
import React, { useCallback } from 'react';
import ReactFlow, {
    addEdge,
    Background,
    useNodesState,
    useEdgesState,
    ReactFlowProvider,
} from 'react-flow-renderer';
import { useDrop } from 'react-dnd';
import TextInputNode from './TextInputNode';
import TextOutputNode from './TextOutputNode';

const nodeTypes = {
    textInput: TextInputNode,
    textOutput: TextOutputNode,
};

function Canvas() {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    // 设置拖拽放置区域
    const [{}, drop] = useDrop({
        accept: 'component',
        drop: (item, monitor) => {
            console.log(`handle drop`);
            const clientOffset = monitor.getClientOffset();
            const canvasRect = document.getElementById('canvas').getBoundingClientRect();

            console.log(`clientOffset: ${clientOffset?.x} ${clientOffset?.y}`);
            console.log(`canvasRect: ${canvasRect?.left} ${canvasRect?.top}`);

            const position = {
                x: clientOffset.x - canvasRect.left,
                y: clientOffset.y - canvasRect.top,
            };

            const id = `${item.type}_${+new Date()}`;
            const newNode = {
                id,
                type: item.type,
                position,
                data: { label: `${item.name}` },
            };

            setNodes((nds) => nds.concat(newNode));
        },
    });

    // 节点值变化处理
    const onNodeValueChange = (id, value) => {
        setNodes((nds) =>
            nds.map((node) =>
                node.id === id ? { ...node, data: { ...node.data, value } } : node
            )
        );
    };

    // 生成响应
    const onGenerateResponse = (id) => {
        const inputNode = nodes.find((node) => node.id === id);
        const connectedEdge = edges.find((edge) => edge.source === id);

        if (connectedEdge) {
            const outputNodeId = connectedEdge.target;
            const response = `响应：${inputNode.data.value}`;

            setNodes((nds) =>
                nds.map((node) =>
                    node.id === outputNodeId
                        ? { ...node, data: { ...node.data, value: response } }
                        : node
                )
            );
        }
    };

    // 更新节点的 data 属性，传递必要的函数
    const updatedNodes = nodes.map((node) => {
        if (node.type === 'textInput') {
            return {
                ...node,
                data: {
                    ...node.data,
                    value: node.data.value,
                    onChange: onNodeValueChange,
                    onGenerate: onGenerateResponse,
                },
            };
        }
        return node;
    });

    return (
        <div id="canvas" ref={drop} style={{ height: '100vh', flexGrow: 1 }}>
            <ReactFlowProvider>
                <ReactFlow
                    nodes={updatedNodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    snapToGrid
                    fitView
                >
                    <Background />
                </ReactFlow>
            </ReactFlowProvider>
        </div>
    );
}

export default Canvas;
