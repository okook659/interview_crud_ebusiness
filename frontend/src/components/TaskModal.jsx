import { useState, useEffect } from "react";
import { api } from "../services/api";

export default function TaskModal({ close, refresh, task }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    }
  }, [task]);

  const submit = async (e) => {
    e.preventDefault();

    const data = {
      title,
      description,
      status,
    };

    if (task) {
      await api.put(`/tasks/${task.id}`, data);
    } else {
      await api.post("/tasks", data);
    }

    refresh();
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-invert backdrop-opacity-10 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {task ? "Modifier la tâche" : "Nouvelle tâche"}
        </h2>

        <form onSubmit={submit}>

          <input
            className="w-full border p-2 mb-2 rounded"
            placeholder="Titre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            className="w-full border p-2 mb-2 rounded"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <select
            className="w-full border p-2 mb-4 rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={close}
              className="border px-3 py-1 rounded"
            >
              Annuler
            </button>

            <button className="bg-blue-600 text-white px-3 py-1 rounded">
              {task ? "Modifier" : "Ajouter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
