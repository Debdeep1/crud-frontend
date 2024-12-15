import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { IoOpen } from "react-icons/io5";
import { setCustomer } from "../../redux/slices/customerSlice";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Modal from "../common/Modal";
import PropTypes from "prop-types";

export default function CustomerTable({ getCustomers }) {
  // Fetch customer data from the API
  const customers = useSelector((state) => state.customers.customers);
  const customer = useSelector((state) => state.customers.customer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);

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

  const handleSetCustomer = (customer) => {
    dispatch(setCustomer(customer));
  };
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/customers/delete/${
          customer._id
        }`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error("Something went wrong");
        throw new Error(data.message || "Something went wrong");
      } else {
        toast.success("Customer deleted successfully!");
        navigate("/");
        getCustomers();
      }
      setModal(false);
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };
  return (
    <div className="bg-white p-4 shadow-inner rounded-lg overflow-x-auto">
    <table className="table w-full text-sm md:text-base">
      <thead>
        <tr>
          <th className="p-2 text-left">NAME</th>
          <th className="p-2 text-left hidden md:table-cell">SETUPBOX ID</th>
          <th className="p-2 text-left hidden sm:table-cell">PHONE NUMBER</th>
          <th className="p-2 text-left hidden lg:table-cell">ZONE</th>
          <th className="p-2 text-left">AMOUNT</th>
          <th className="p-2 text-left">Actions</th>
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
              <td className="p-2 hidden md:table-cell">{customer.setupBoxNo}</td>
              <td className="p-2 hidden sm:table-cell">{customer.mobileNo}</td>
              <td className="p-2 hidden lg:table-cell">{customer.zone}</td>
              <td className="p-2">{customer.amt}</td>
              <td className="p-2">
                <div
                  className="dropdown"
                  onClick={() => handleSetCustomer(customer)}
                >
                  <div tabIndex={0} role="button" className="btn btn-sm m-1">
                    <HiOutlineDotsVertical className="text-gray-500 cursor-pointer" />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-44 p-2 shadow"
                  >
                    <li
                      className="mb-1 hover:text-sky-700"
                      onClick={() => openCustomer(customer)}
                    >
                      <Link>
                        <IoOpen className="w-5 h-5" />
                        Open
                      </Link>
                    </li>
                    <li
                      className="hover:text-rose-600"
                      onClick={() => setModal(true)}
                    >
                      <Link>
                        <FaTrash /> Delete
                      </Link>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
    {modal && (
      <Modal
        isOpen={modal}
        onClose={() => setModal(false)}
        title="Delete Customer"
        desp="Are you sure you want to delete this customer?"
        isDelete={true}
        onClick={handleDelete}
      />
    )}
  </div>
  );
}

CustomerTable.propTypes = {
  getCustomers: PropTypes.func.isRequired,
}
