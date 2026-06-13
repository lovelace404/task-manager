import { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    setTasks([{ id: Date.now(), text, done: false }, ...tasks]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const clearDone = () => {
    setTasks(tasks.filter((t) => !t.done));
  };

  const filtered = tasks.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  const doneCount = tasks.filter((t) => t.done).length;
  const progressPct = tasks.length === 0 ? 0 : (doneCount / tasks.length) * 100;

  return (
    <div className="app">
      <div className="card">
        <header>
          <h1>My Tasks</h1>
          <p className="subtitle">
            {tasks.length === 0
              ? "Nothing here yet — add a task!"
              : `${doneCount} of ${tasks.length} done`}
          </p>
        </header>

        {/* Progress bar — shows how many tasks are done */}
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <TaskInput onAdd={addTask} />

        <div className="filters">
          {["all", "active", "done"].map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <TaskList tasks={filtered} onToggle={toggleTask} onDelete={deleteTask} />

        {doneCount > 0 && (
          <button className="clear-btn" onClick={clearDone}>
            Clear completed ({doneCount})
          </button>
        )}
      </div>
    </div>
  );
}

export default App;