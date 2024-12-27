import React, { useState, useEffect } from 'react';

const Sidebar = ({ onAddNode, onUpdateNode, onDeleteNode, selectedNode, setSelectedNode }) => {
  const [nodeLabel, setNodeLabel] = useState('');
  const [newLabel, setNewLabel] = useState('');

  useEffect(() => {
    if (selectedNode) {
      setNewLabel(selectedNode.data.label);
    }
  }, [selectedNode]);

  const handleAddNode = () => {
    if (nodeLabel) {
      onAddNode(nodeLabel);
      setNodeLabel('');
    }
  };

  const handleUpdateNode = () => {
    if (selectedNode && newLabel) {
      onUpdateNode(selectedNode.id, newLabel);
      setSelectedNode(null); // Clear selection after update
    }
  };

  const handleDeleteNode = () => {
    if (selectedNode) {
      onDeleteNode(selectedNode.id);
      setSelectedNode(null); // Clear selection after delete
    }
  };

  return (
    <div className="sidebar">
      <h3>Actions</h3>
      
      <div>
        <h4>Add Node</h4>
        <input
          type="text"
          placeholder="Node Label"
          value={nodeLabel}
          onChange={(e) => setNodeLabel(e.target.value)}
        />
        <button onClick={handleAddNode}>Add Node</button>
      </div>

      {selectedNode && (
        <div>
          <h4>Edit Node</h4>
          <input
            type="text"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="Edit Node Label"
          />
          <button onClick={handleUpdateNode}>Update Node</button>
          <button onClick={handleDeleteNode}>Delete Node</button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
