import { useState, useEffect } from "react";
import { useUserModalStore } from "../../store/user/use-user-modal-store";
import { useUserStore } from "../../store/user/use-user-store";

const UserModal = () => {
  const { isOpen, mode, data, closeModal } = useUserModalStore();
  const { createUser, getUsers, updateUser, loading, error } = useUserStore();
  const [userForm, setUserForm] = useState({
    name: "",
    username: "",
    phoneNumber: "",
    email: "",
  });

  useEffect(() => {
    if (mode === "edit" && data) {
      setUserForm({
        name: data.name || "",
        username: data.username || "",
        phoneNumber: data.phoneNumber || "",
        email: data.email || "",
      });
    } else {
      setUserForm({
        name: "",
        username: "",
        phoneNumber: "",
        email: "",
      });
    }
  }, [mode, data]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (mode === "create") {
        await createUser(userForm);
        await getUsers();
      } else {
        await updateUser(data.id, {
          name: userForm.name,
          phoneNumber: userForm.phoneNumber,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      closeModal();
      setUserForm({
        name: "",
        username: "",
        phoneNumber: "",
        email: "",
      });
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center w-full">
        <div className="bg-white border-1 rounded shadow-lg w-96 p-6">
          <h2 className="text-xl font-bold mb-4">
            {mode === "create" ? "Create Task" : "Edit Task"}
          </h2>

          <form className="flex flex-col w-full" onSubmit={handleSubmit}>
            <div className="flex gap-5 w-full">
              <div className="flex flex-col w-1/2">
                <div className="mb-2">
                  <label htmlFor="name" className="block mb-1">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-500"
                    value={userForm.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="phoneNumber" className="block mb-1">
                    Phone number:
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-500"
                    value={userForm.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex flex-col w-1/2">
                <div className="mb-2">
                  <label htmlFor="username" className="block mb-1">
                    Username:
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-500"
                    value={userForm.username}
                    onChange={handleChange}
                    disabled={mode === "edit"}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="email" className="block mb-1">
                    Email:
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-500"
                    value={userForm.email}
                    onChange={handleChange}
                    disabled={mode === "edit"}
                  />
                </div>
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

export default UserModal;
