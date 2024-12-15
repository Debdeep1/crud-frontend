import { useMemo, useState } from "react";
import { CiMoneyCheck1 } from "react-icons/ci";
import { GoHome } from "react-icons/go";
import { TbUserSearch } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { HiMenuAlt3, HiOutlineX } from "react-icons/hi";

export default function Sidebar() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = useMemo(
    () => [
      { name: "Home", href: "/", icon: <GoHome /> },
      { name: "Billings", href: "/billings", icon: <CiMoneyCheck1 /> },
      { name: "Find Customers", href: "/find_users", icon: <TbUserSearch /> },
    ],
    []
  );

  const activeIndex = navItems.findIndex(
    (item) => item.href === location.pathname
  );

  return (
    <div className="relative">
      {/* Hamburger Menu Button for Small Screens */}
      <button
        className="lg:hidden fixed top-1 left-2 z-30 text-white p-2"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <HiOutlineX size={24} /> : <HiMenuAlt3 size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 z-20 h-screen w-64 bg-slate-700 text-white px-4 py-3 shadow-inner transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <h2 className="text-3xl font-bold mb-8 text-center">CMS</h2>
        <nav>
          <ul>
            {navItems.map((item, index) => (
              <li key={index} className="mb-6">
                <Link
                  to={item.href}
                  className={`w-full pl-4 py-3 transition-all duration-200 ease-in-out 
                    ${
                      activeIndex === index
                        ? "bg-slate-600 text-white shadow-neumorphic"
                        : "bg-slate-700 shadow-neumorphic-inset hover:bg-slate-600"
                    } rounded-xl flex items-center`}
                  onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click
                >
                  <div className="text-xl w-full flex items-center gap-2">
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Content Overlay for Small Screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
