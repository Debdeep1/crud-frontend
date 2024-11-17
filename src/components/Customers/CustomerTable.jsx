import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { IoOpen } from "react-icons/io5";
import { setCustomer } from "../../redux/slices/customerSlice";

export default function CustomerTable() {
  // Fetch customer data from the API
  const customers = useSelector((state) => state.customers.customers);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openCustomer = async (customer) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/customers/${customer._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log("data", data);
      if (!response.ok) {
        toast.error("Something went wrong");
        throw new Error(data.message || "Something went wrong");
      }
      dispatch(setCustomer(data));
      navigate(`/customers/${customer._id}`);
    } catch (err) {
      console.err("Error message", err);
    }
  };
  return (
    <div className="bg-white p-4 shadow-inner rounded-lg">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th className="p-2">NAME</th>
            <th className="p-2">SETUPBOX ID</th>
            <th className="p-2">PHONE NUMBER</th>
            <th className="p-2">ACTIVE</th>
            <th className="p-2">ZONE</th>
            <th className="p-2">AMOUNT</th>
            <th className="p-2">OPEN</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 &&
            customers.map((customer, index) => (
              <tr key={index} className="hover">
                <td className="p-2">
                  <p className="font-semibold">
                    {customer.firstName} {customer.lastName}
                  </p>
                </td>
                <td className="p-2">{customer.setupBoxNo}</td>
                <td className="p-2">{customer.mobileNo}</td>
                <td className="p-2">
                  <span
                    className={`badge badge-outline ${
                      customer.isActive ? "badge-success" : "badge-error"
                    }`}
                  >
                    {customer.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="p-2">{customer.zone}</td>
                <td className="p-2">{customer.amt}</td>
                <td
                  className="p-2 cursor-pointer text-sky-600"
                  onClick={() => openCustomer(customer)}
                >
                  <IoOpen className="w-5 h-5"/>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
