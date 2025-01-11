import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setCustomer } from "../redux/slices/customerSlice";
import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa";
import { IoOpen } from "react-icons/io5";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Modal from "./common/Modal";

const CustomerActions = ({ getCustomers, customer }) => {
console.log("customer", customer);
  const [modal, setModal] = useState(false);
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
    <>
      <div
        className="dropdown dropdown-end"
        onClick={() => handleSetCustomer(customer)}
      >
        <div tabIndex={0} role="button" className="btn btn-sm m-1">
          <HiOutlineDotsVertical className="text-gray-500 cursor-pointer" />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-32 p-2 shadow"
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
          <li className="hover:text-rose-600" onClick={() => setModal(true)}>
            <Link>
              <FaTrash /> Delete
            </Link>
          </li>
        </ul>
      </div>

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
    </>
  );
};

CustomerActions.propTypes = {
  customer: PropTypes.object,
  getCustomers: PropTypes.func,
};
export default CustomerActions;
