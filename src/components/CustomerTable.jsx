import { useSelector } from "react-redux";

export default function CustomerTable() {
  // Fetch customer data from the API
  const customers = useSelector((state) => state.customers.customers);
  console.log("Customers::", customers);
  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="p-2">NAME</th>
            <th className="p-2">SETUPBOX ID</th>
            <th className="p-2">PHONE NUMBER</th>
            <th className="p-2">ACTIVE</th>
            <th className="p-2">ZONE</th>
            <th className="p-2">AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 &&
            customers.map((customer, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">
                  <p className="font-semibold">
                    {customer.firstName} {customer.lastName}
                  </p>
                </td>
                <td className="p-2">{customer.setupBoxNo}</td>
                <td className="p-2">{customer.mobileNo}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      customer.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {customer.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="p-2">{customer.zone}</td>
                <td className="p-2">{customer.amt}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
