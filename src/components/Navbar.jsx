import { FaUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

// components/Navbar.tsx
export default function Navbar() {
  return (
    <header className="bg-inherit shadow-sm w-full p-4 flex justify-end items-center">
      <div className="dropdown dropdown-bottom dropdown-end">
        <div tabIndex={0}>
          <FaUser className="text-white h-5 w-5" />
        </div>

        <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-44 p-2 shadow">
          <li className="mb-1 hover:text-rose-700">
            <span className="text-sm flex items-center gap-1">
              <IoIosLogOut /> Logout{" "}
            </span>
          </li>
        </ul>
      </div>
    </header>
  );
}
