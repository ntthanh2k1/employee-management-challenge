import { useEffect, useState } from "react";
import { useUserModalStore } from "../../store/user/use-user-modal-store";
import UserModal from "./user-modal";
import { useUserStore } from "../../store/user/use-user-store";

const User = () => {
  const [search, setSearch] = useState("");
  const { openModal } = useUserModalStore();
  const { users, getUsers, deleteUser } = useUserStore();

  useEffect(() => {
    getUsers({ search });
  }, [search]);

  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold mb-3">Users</h1>
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
                <th className="border px-4 py-1 text-left">Name</th>
                <th className="border px-4 py-1 text-left">Username</th>
                <th className="border px-4 py-1 text-left">Phone</th>
                <th className="border px-4 py-1 text-left">Email</th>
                <th className="border px-4 py-1 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-200">
                    <td className="border px-4 py-1">{user.name}</td>
                    <td className="border px-4 py-1">{user.username}</td>
                    <td className="border px-4 py-1">{user.phoneNumber}</td>
                    <td className="border px-4 py-1">{user.email}</td>
                    <td className="border px-4 py-1 w-xs">
                      <div className="flex gap-2">
                        <button
                          className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 cursor-pointer"
                          onClick={() => openModal("edit", user)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
                          onClick={() => deleteUser(user.id)}
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
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <UserModal />
      </div>
    </>
  );
};

export default User;
