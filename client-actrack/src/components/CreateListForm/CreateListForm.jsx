import React from 'react';
import errorIcon from "../../assets/icons/error-24px.svg";

function CreateListForm({ newListName, onInputChange, onCreateList, onCancel, inputError }) {
  return (
    <div className="create__box">
      <div className="sidebar__create">
        <input
          type="text"
          value={newListName}
          onChange={onInputChange}
          placeholder="New List Name"
          className="sidebar__create--list-input"
        />
        {inputError && (
          <div className="sidebar__create--error">
            <img src={errorIcon} alt="Warning Icon" className="sidebar__create--error-icon" />
            <div className="sidebar__create--error-message">List name cannot be Empty!</div>
          </div>
        )}
        <div className="sidebar__create--buttons">
          <button className="sidebar__create--list-add-btn" onClick={onCreateList}>Add</button>
          <button type="button" className="sidebar__create--list-cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default CreateListForm;
