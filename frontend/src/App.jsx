import { useState } from "react";
import TaskBoard from "./components/TaskBoard";
import TaskList from "./components/TaskList";

function App() {
  const [view, setView] = useState("kanban");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold">TaskFlow</h1>

        <button
          onClick={() => setView(view === "kanban" ? "list" : "kanban")}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow cursor-pointer"
        >
          {view === "kanban" ? "Vue Liste" : "Vue Kanban"}
        </button>
      </div>

      {view === "kanban" ? <TaskBoard /> : <TaskList />}
    </div>
  );
}

export default App;
