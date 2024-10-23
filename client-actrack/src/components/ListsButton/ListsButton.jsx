import React from 'react';
import './ListsButton.scss'
function ListsButton({ listName }) {
  return (
    <button className="sidebar__lists--button">
      {listName}
    </button>
  );
}

export default ListsButton;
