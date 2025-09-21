import { Outlet } from "react-router";
import Header from "../components/layouts/header";
import Sidebar from "../components/layouts/sidebar";

const MainLayout = () => {
  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex flex-col flex-1">
          <Header />

          <div className="flex flex-1 px-10 pt-5">
            <div className="w-full">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
