import TaskItem from "./TaskItem";

// This component receives a list of tasks and renders each one
// It doesn't manage any state — it just displays what App.js gives it
function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <p className="empty">No tasks here. ✓</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}         // React needs a unique key for each list item
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TaskList;