import { IoLogOutOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../../store/auth/use-auth-store";

const Header = () => {
  const { logout, authUser } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed.", error);
    }
  };
  return (
    <div className="flex w-full h-16 justify-between items-center border-b sticky top-0 z-50 bg-white">
      {/* Left */}
      <div className="flex items-center gap-2 ml-3"></div>

      {/* Right */}
      <div className="flex items-center gap-3 mr-3">
        <div className="flex items-center gap-2 cursor-pointer">
          <Link to="/profile" className="flex items-center gap-2">
            <span className="text-sm">{authUser?.name}</span>
            <div className="w-10 h-10 rounded-full bg-indigo-500"></div>
          </Link>

          <div onClick={handleLogout}>
            <IoLogOutOutline />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
