import React from 'react'
function ListItem({ list, onListClick }) {
    return (
      <li className="sidebar__lists--item">
        <button className="sidebar__lists--button" onClick={() => onListClick(list.name)}>
          {list.name}
        </button>
        <span className="sidebar__lists--count">{list.count || 0}</span>
      </li>
    );
  }
  
  export default ListItem;


