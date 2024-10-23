import React, { useState } from 'react';
import ListsContainer from './ListsContainer/ListsContainer';
import MiddleContainer from './MiddleContainer/MiddleContainer';

function TaskManager() {
  const [selectedListId, setSelectedListId] = useState(null);

  const handleListSelect = (listId) => {
    setSelectedListId(listId);
  };

  return (
    <div className="task-manager">
      <ListsContainer onSelectList={handleListSelect} />
      <MiddleContainer selectedListId={selectedListId} />
    </div>
  );
}

export default TaskManager;
