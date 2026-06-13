// This is the smallest unit — one single task row
// Props: task object, onToggle function, onDelete function
function TaskItem({ task, onToggle, onDelete }) {
    return (
      <li className={`task-item ${task.done ? "done" : ""}`}>
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}  // tell App.js to flip this task's done state
        />
        <span className="task-text">{task.text}</span>
        <button
          className="delete-btn"
          onClick={() => onDelete(task.id)}    // tell App.js to remove this task
          aria-label="Delete task"
        >
          ✕
        </button>
      </li>
    );
  }
  
  export default TaskItem;