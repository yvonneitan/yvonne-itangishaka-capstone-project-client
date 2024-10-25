import React from 'react';
import ListItem from '../ListItem/ListItem';
import CreateListForm from '../CreateListForm/CreateListForm';

function Sidebar({
  user,
  taskLists,
  selectedList,
  onListClick,
  showInput,
  newListName,
  onNewListChange,
  onCreateNewList,
  onShowInput,
  inputError,
  onCancelCreateList,
  
}) {
  return (
    <div className="sidebar">
      <div className="sidebar__title">
        {user ? `${user.username} AcTrack` : "Your AcTrack"}
      </div>
      {taskLists.length === 0 ? (
        <div className="sidebar__no-list">No task lists available.</div>
      ) : (
        <ul className="sidebar__lists">
          {taskLists.map((list) => (
            <ListItem key={list.id} list={list} onListClick={onListClick} />
          ))}
        </ul>
      )}
      {showInput ? (
        <CreateListForm
          newListName={newListName}
          onInputChange={onNewListChange}
          onCreateList={onCreateNewList}
          onCancel={onCancelCreateList}
          inputError={inputError}
        />
      ) : (
        <button className="sidebar__new--btn" onClick={onShowInput}>+ Create new List ⌘L</button>
      )}
    </div>
  );
}

export default Sidebar;
