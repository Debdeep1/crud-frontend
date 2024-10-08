// components/UserTable.tsx
export default function UserTable() {
    const users = [
      { name: "John Doe", email: "john@example.com", title: "Software Engineer", status: "Active", role: "Owner" },
      { name: "Oscar Rhys", email: "oscar@example.com", title: "Web Dev", status: "Active", role: "Owner" },
      { name: "George Reece", email: "george@example.com", title: "Software Engineer", status: "Active", role: "Owner" },
      // Add more users here...
    ];
  
    return (
      <div className="bg-white p-4 shadow-md rounded-lg">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="p-2">NAME</th>
              <th className="p-2">TITLE</th>
              <th className="p-2">STATUS</th>
              <th className="p-2">ROLE</th>
              <th className="p-2">EDIT</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-b">
                <td className="p-2 flex items-center space-x-2">
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                </td>
                <td className="p-2">{user.title}</td>
                <td className="p-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">{user.status}</span>
                </td>
                <td className="p-2">{user.role}</td>
                <td className="p-2 text-blue-500">Edit</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  