import { Link } from "react-router";

const Sidebar = () => {
  const menuItems = [
    { label: "Users", path: "/users" },
    { label: "Tasks", path: "/tasks" },
    { label: "Messages", path: "/messages" },
  ];

  return (
    <>
      <div className="flex flex-col w-56 h-screen border-r sticky top-0 bg-white">
        {/* Header */}
        <div className="flex items-center justify-center h-16 sticky top-0 z-1000 ">
          <Link to="/">
            <h1 className="text-3xl font-bold text-center my-3 text-indigo-500">
              EMS
            </h1>
          </Link>
        </div>

        {/* Tree view scrollable */}
        <div className="w-full scrollbar-hidden overflow-y-auto">
          <div className="flex flex-col mt-5">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="px-5 py-2 cursor-pointer hover:bg-gray-200"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
