import { useState } from "react";

// This component only cares about ONE job: collecting input and passing it up
// It receives `onAdd` as a prop — a function from App.js
function TaskInput({ onAdd }) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    const trimmed = value.trim(); // remove accidental spaces
    if (!trimmed) return;         // don't add empty tasks
    onAdd(trimmed);               // call the function from App.js
    setValue("");                 // clear the input
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="task-input">
      <input
        type="text"
        placeholder="Add a new task..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}

export default TaskInput;