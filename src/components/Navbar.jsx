import { FaUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { logout } from "../apis/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// components/Navbar.tsx
export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response) {
        toast.success("Successfully logged out");
        navigate("/signin");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <header className="bg-inherit shadow-sm w-full p-4 flex justify-end items-center">
      <div className="dropdown dropdown-bottom dropdown-end">
        <div tabIndex={0}>
          <FaUser className="text-white h-5 w-5" />
        </div>

        <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-44 p-2 shadow">
          <li className="mb-1 hover:text-rose-700">
            <button
              className="text-sm flex items-center gap-1 w-full"
              onClick={handleLogout}
            >
              <IoIosLogOut /> Logout{" "}
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
