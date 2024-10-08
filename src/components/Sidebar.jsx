// components/Sidebar.tsx

import { Link } from "react-router-dom";

const navItems = [
  { name: "All Users", href: "/" },
  { name: "New User", href: "/new_user" },
  { name: "Find Users", href: "/find_users" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-3xl font-bold mb-8">Tools</h2>
      <nav>
        <ul>
          {navItems.map((item, index) => (
            <li key={index} className="mb-6">
              <a href={item.href} className="text-xl text-gray-300 hover:text-white">
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
