import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addCustomers } from "../../redux/slices/customerSlice";
import Heading from "../common/Heading";
import { fetchZones } from "../../apis/zones";
import { addZones } from "../../redux/slices/zoneSlice";
import { fetchCustomers } from "../../apis/customer";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { IoOpen } from "react-icons/io5";
import { HiOutlineDotsVertical } from "react-icons/hi";
import CustomerActions from "../CustomerActions";

export default function FindUsers() {
  const [filters, setFilters] = useState({
    name: "",
    setupBoxNo: "",
    status: "",
    zone: "",
    mobileNo: "",
  });

  const customers = useSelector((state) => state.customers.customers);
  const zones = useSelector((state) => state.zones.zones);
  const [filteredCustomerSearch, setFilteredCustomerSearch] = useState([]);

  console.log("customers", customers);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });

    // Perform client-side filtering for name search
    if (name === "name" && value.trim() !== "") {
      const results =
        customers &&
        customers.filter((customer) =>
          `${customer.firstName} ${customer.lastName}`
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      setFilteredCustomerSearch(results);
    } else {
      setFilteredCustomerSearch([]);
    }
  };

  const getZones = async () => {
    try {
      const response = await fetchZones();
      dispatch(addZones(response));
    } catch (error) {
      console.error("Error fetching zones:", error);
    }
  };

  const getCustomers = async () => {
    try {
      const response = await fetchCustomers();
      dispatch(addCustomers(response));
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    if (zones.length == 0) getZones();
    if (customers.length == 0) getCustomers();
  }, []);

  // Function to fetch filtered customers from the backend
  const fetchFilteredCustomers = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/customers/filterCustomers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filters),
        }
      );

      if (response.ok) {
        const data = await response.json();
        dispatch(addCustomers(data));
      } else {
        toast.error("Failed to fetch filtered customers");
      }
    } catch (error) {
      console.error("Error fetching filtered customers:", error);
    }
  };

  useEffect(() => {
    fetchFilteredCustomers();
  }, [filters]);

  return (
    <div className="mx-auto bg-white p-4 shadow-inner border rounded-lg h-[calc(100vh-100px)] overflow-y-auto">
      <Heading title="Find Customers" />

      {/* Filter Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="label">
            <span className="label-text text-sm">Name</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={filters.name}
            onChange={handleChange}
            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search by name"
          />
          {filters.name && filteredCustomerSearch.length > 0 && (
            <ul className="absolute z-10 bg-white border rounded-lg w-full mt-1 max-h-40 overflow-y-auto">
              {filteredCustomerSearch.map((customer, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setFilters({
                      ...filters,
                      name: `${customer.firstName} ${customer.lastName}`,
                    });
                    setFilteredCustomerSearch([]);
                  }}
                >
                  {customer.firstName} {customer.lastName}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label className="label">
            <span className="label-text text-sm">STB</span>
          </label>
          <input
            type="text"
            id="setupBoxNo"
            name="setupBoxNo"
            value={filters.setupBoxNo}
            onChange={handleChange}
            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search by setup box number"
          />
        </div>

        {/* <div>
          <label className="label">
            <span className="label-text text-sm">Status</span>
          </label>
          <select
            id="status"
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div> */}
        <div>
          <label className="label">
            <span className="label-text text-sm">Landmark</span>
          </label>
          <select
            id="zone"
            name="zone"
            value={filters.zone}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="">Select a Zone</option>
            {zones &&
              zones.map((zone) => (
                <option key={zone._id} value={zone._id}>
                  {zone.zonalLandmark + " ** " + zone.zonalNumber}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="label">
            <span className="label-text text-sm">Phone Number</span>
          </label>
          <input
            type="text"
            id="mobileNo"
            name="mobileNo"
            value={filters.mobileNo}
            onChange={handleChange}
            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search by phone number"
          />
        </div>
      </div>

      {/* Filtered Users Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th className="p-2 uppercase">NAME</th>
              <th className="p-2 uppercase">Setupbox No</th>
              {/* <th className="p-2 uppercase">STATUS</th> */}
              <th className="p-2 uppercase">Landmark</th>
              <th className="p-2 uppercase">Zone</th>
              <th className="p-2 uppercase">Phone No</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((user, index) => (
                <tr key={index} className="hover">
                  <td className="p-2">
                    {user.firstName + " " + user.lastName}
                  </td>
                  <td className="p-2">{user.setupBoxNo}</td>
                  {/* <td className="p-2">
                    <span
                      className={`badge badge-outline ${
                        user.status === "Active"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {user.isActive}
                    </span>
                  </td> */}
                  <td className="p-2">
                    {user.zone.zonalLandmark + " ** " + user.zone.zonalNumber}
                  </td>
                  <td className="p-2">{user.zone.name}</td>
                  <td className="p-2">{user.mobileNo}</td>
                  <td className="p-2">
                    <CustomerActions getCustomers={getCustomers}  customer={user}/>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
