import { useState, useEffect } from "react";
import { useTaskModalStore } from "../../store/task/use-task-modal-store";
import { useTaskStore } from "../../store/task/use-task-store";
import { useUserStore } from "../../store/user/use-user-store";

const TaskModal = () => {
  const { isOpen, mode, data, closeModal } = useTaskModalStore();
  const { createTask, getTasks, updateTask, loading, error } = useTaskStore();
  const { users, getUsers } = useUserStore();
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    assignedUserId: "",
    status: false,
  });

  useEffect(() => {
    if (mode === "edit" && data) {
      setTaskForm({
        title: data.title || "",
        description: data.description || "",
        assignedUserId: data.assignedUserId || "",
        status: data.status || false,
      });
    } else {
      setTaskForm({
        title: "",
        description: "",
        assignedUserId: "",
        status: false,
      });
    }

    if (isOpen) {
      // chỉ lấy user có role = 1 (employee)
      getUsers({ role: 1 });
    }
  }, [mode, data, isOpen, getUsers]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setTaskForm((prev) => ({
      ...prev,
      [name]: name === "status" ? value === "true" : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (mode === "create") {
        await createTask(taskForm);
        await getTasks();
      } else {
        await updateTask(data.id, taskForm);
        console.log("Updated task:", taskForm);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      closeModal();
      setTaskForm({
        title: "",
        description: "",
        assignedUserId: "",
        status: false,
      });
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white border-1 rounded shadow-lg w-96 p-6">
          <h2 className="text-xl font-bold mb-4">
            {mode === "create" ? "Create Task" : "Edit Task"}
          </h2>

          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <div className="mb-2">
                <label htmlFor="title" className="block mb-1">
                  Title:
                </label>
                <input
                  required
                  name="title"
                  type="text"
                  placeholder="Title"
                  className="w-full border px-3 py-1 rounded focus:outline-none focus:border-indigo-500"
                  value={taskForm.title}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="assignee" className="block mb-1">
                  Assignee:
                </label>
                <select
                  required
                  id="assignee"
                  name="assignedUserId"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-indigo-500"
                  value={taskForm.assignedUserId}
                  onChange={handleChange}
                >
                  <option value="">Select user to assign</option>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>Users not found</option>
                  )}
                </select>
              </div>
              <div className="mb-2">
                <label htmlFor="description" className="block mb-1">
                  Description:
                </label>
                <textarea
                  required
                  id="description"
                  name="description"
                  placeholder="Description"
                  className="w-full border px-3 py-1 rounded focus:outline-none focus:border-indigo-500"
                  value={taskForm.description}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="status" className="block mb-1">
                  Status:
                </label>
                <select
                  name="status"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-indigo-500"
                  value={taskForm.status ? "true" : "false"}
                  onChange={handleChange}
                >
                  <option value="false">Undone</option>
                  <option value="true">Done</option>
                </select>
              </div>
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-600 cursor-pointer"
              >
                {loading ? "Loading..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TaskModal;
