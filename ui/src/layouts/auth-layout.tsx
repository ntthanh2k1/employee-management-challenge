import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-items-start min-h-screen pt-12">
        <h1 className="text-3xl font-bold mb-12">Employee Management</h1>

        <div className="flex flex-col items-center justify-center w-96 px-10 py-3 border rounded">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
