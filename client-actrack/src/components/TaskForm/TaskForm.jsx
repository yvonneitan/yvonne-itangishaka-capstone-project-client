import React from 'react';

function TaskForm({
  taskName,
  setTaskName,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  selectedList,
  setSelectedList,
  taskLists,
  onCancelTask,
  onCreateNewTask
}) {
  return (
    <form onSubmit={onCreateNewTask} className="task-form__container">
      <label htmlFor="task-name" className="task-form__label">Task:</label>
      <input
        type="text"
        id="task-name"
        className="task-form__input"
        placeholder="Enter your Task"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        required
      />
      <label htmlFor="start-time" className="task-form__label">Start date and time:</label>
      <input
        type="datetime-local"
        id="start-time"
        className="task-form__input"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        required
      />
      <label htmlFor="end-time" className="task-form__label">End date and time :</label>
      <input
        type="datetime-local"
        id="end-time"
        className="task-form__input"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        required
      />
      <label htmlFor="task-list" className="task-form__label">List:</label>
      <select
        id="task-list"
        className="task-form__select"
        value={selectedList}
        onChange={(e) => setSelectedList(e.target.value)}
        required
      >
        <option value="">Select a list</option>
        {taskLists.map((list) => (
          <option key={list.id} value={list.id}>{list.name}</option>
        ))}
      </select>
      <div className="task-form__btn">
        <button type="submit" className="task-form__btn--submit">Add Task</button>
        <button type="button" className="task-form__btn--cancel" onClick={onCancelTask}>Cancel</button>
      </div>
    </form>
  );
}

export default TaskForm;
