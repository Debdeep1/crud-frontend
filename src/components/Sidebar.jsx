// components/Sidebar.tsx

import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const navItems = useMemo(
    () => [
      { name: "All Users", href: "/" },
      { name: "New User", href: "/new_user" },
      { name: "Find Users", href: "/find_users" },
    ],
    []
  );
  const activeIndex = navItems.findIndex(
    (item) => item.href === location.pathname
  );
  return (
    <div className="w-64 bg-slate-700 text-white px-4 py-3 h-screen z-20 shadow-inner">
      <h2 className="text-3xl font-bold mb-8 text-center">Tools</h2>
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
              >
                <span className="text-xl w-full">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
