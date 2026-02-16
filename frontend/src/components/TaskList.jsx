import { useEffect, useState } from "react";
import { api } from "../services/api";
import TaskModal from "./TaskModal";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    if (confirm("Supprimer cette tâche ?")) {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    }
  };

  const editTask = (task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((t) => t.status === filter);

  return (
    <>
     <button
        onClick={() => {
          setSelectedTask(null);
          setOpen(true);
        }}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Nouvelle tâche
      </button>

      <div className="mb-4">
        <select
          className="border p-2 rounded"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Toutes</option>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Titre</th>
            <th className="p-2">Description</th>
            <th className="p-2">Statut</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id} className="border-t">
              <td className="p-2">{task.title}</td>
              <td className="p-2">{task.description}</td>
              <td className="p-2 capitalize">{task.status}</td>

              <td className="p-2 flex gap-2">
                {/* <button
                  onClick={() => editTask(task)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                >
                  Delete
                </button> */}

                <button onClick={() => editTask(task)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">

        <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg>
            </button>

        <button
          onClick={() => deleteTask(task.id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
</svg>
        </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {open && (
        <TaskModal
          task={selectedTask}
          close={() => setOpen(false)}
          refresh={fetchTasks}
        />
      )}
    </>
  );
}
