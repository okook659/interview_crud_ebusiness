import { useEffect, useState } from "react";
import { api } from "../services/api";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";

const statuses = ["todo", "in-progress", "done"];

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const changeStatus = async (task) => {
    const nextStatus =
      task.status === "todo"
        ? "in_progress"
        : task.status === "in-progress"
        ? "done"
        : "todo";

    await api.put(`/tasks/${task.id}`, { status: nextStatus });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    if (confirm("Supprimer cette tâche ?")) {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    }
  };

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

      <div className="grid grid-cols-3 gap-4">
        {statuses.map((status) => (
          <div key={status} className="bg-white p-4 rounded shadow">
            <h2 className="font-bold mb-2 capitalize">{status}</h2>

            {tasks
              .filter((t) => t.status === status)
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onNext={() => changeStatus(task)}
                  onEdit={(task) => {
                    setSelectedTask(task);
                    setOpen(true);
                  }}
                  onDelete={deleteTask}
                />
              ))}
          </div>
        ))}
      </div>

      {open && (
        <TaskModal
          close={() => setOpen(false)}
          refresh={fetchTasks}
          task={selectedTask}
        />
      )}
    </>
  );
}
