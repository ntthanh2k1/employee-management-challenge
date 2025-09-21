import { useEffect, useState } from "react";
import { useTaskModalStore } from "../../store/task/use-task-modal-store";
import TaskModal from "./task-modal";
import { useTaskStore } from "../../store/task/use-task-store";

const Task = () => {
  const [search, setSearch] = useState("");
  const { openModal } = useTaskModalStore();
  const { tasks, getTasks, deleteTask } = useTaskStore();

  useEffect(() => {
    getTasks({ search });
  }, [search]);

  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold mb-3">Tasks</h1>
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="border px-3 py-1 rounded w-1/3 focus:outline-none focus:border-indigo-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 cursor-pointer"
            onClick={() => openModal("create")}
          >
            Create
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-300">
                <th className="border px-4 py-1 text-left">Title</th>
                <th className="border px-4 py-1 text-left">Description</th>
                <th className="border px-4 py-1 text-left">Status</th>
                <th className="border px-4 py-1 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-200">
                    <td className="border px-4 py-1">{task.title}</td>
                    <td className="border px-4 py-1">{task.description}</td>
                    <td className="border px-4 py-1">
                      {task.status ? "Done" : "Undone"}
                    </td>
                    <td className="border px-4 py-1 w-xs">
                      <div className="flex gap-2">
                        <button
                          className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 cursor-pointer"
                          onClick={() => openModal("edit", task)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
                          onClick={() => deleteTask(task.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    No tasks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <TaskModal />
      </div>
    </>
  );
};

export default Task;
