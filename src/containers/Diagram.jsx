import React, { useState, useCallback } from 'react';
import ReactFlow, { addEdge, Controls} from 'react-flow-renderer';
import Sidebar from '../components/Sidebar';
import './Diagram.css';

const initialNodes = [
  { id: '1', type: 'default', position: { x: 250, y: 5 }, data: { label: 'Node 1' } },
  { id: '2', type: 'default', position: { x: 100, y: 100 }, data: { label: 'Node 2' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', type: 'smoothstep' },
];

const Diagram = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => nds.map((node) => ({ ...node, ...changes }))),
    []
  );

  const addNode = (label) => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      type: 'default',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const updateNode = (id, newLabel) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, label: newLabel } } : node
      )
    );
  };

  const deleteNode = (id) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
  };

  return (
    <div className="diagram-container">
      <Sidebar 
        onAddNode={addNode} 
        onUpdateNode={updateNode}
        onDeleteNode={deleteNode}
        selectedNode={selectedNode}
        setSelectedNode={setSelectedNode}
      />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onConnect={onConnect}
        fitView
        onNodeClick={(event, node) => setSelectedNode(node)}
      >
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Diagram;
