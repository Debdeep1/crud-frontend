import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const BillingsForm = ({ onBillingAdded }) => {
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  const [formData, setFormData] = useState({
    customerName: "",
    setupBoxNumber: "",
    date: getCurrentDate(), // Set the default date to current date
    amt: "",
    deposit: "",
    takenBy: "kaka",
  });
  const [filteredSetupBoxes, setFilteredSetupBoxes] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const customers = useSelector((state) => state.customers.customers);
  console.log("Customers", customers)

  const customerToSetupBox = Object.fromEntries(
    customers.map((customer) => [
      `${customer.firstName} ${customer.lastName}`,
      customer.setupBoxNo,
    ])
  );

  const setupBoxToCustomer = Object.fromEntries(
    customers.map((customer) => [
      customer.setupBoxNo,
      `${customer.firstName} ${customer.lastName}`,
    ])
  );
  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedData = { ...formData, [name]: value };

    if (name === "customerName" && value in customerToSetupBox) {
      updatedData.setupBoxNumber = customerToSetupBox[value];
    } else if (name === "setupBoxNumber" && value in setupBoxToCustomer) {
      updatedData.customerName = setupBoxToCustomer[value];
    }
    setFormData(updatedData);
  };

 const handleSetupBoxSelect = (setupBoxNumber, customerName) => {
    setFormData({
      ...formData,
      setupBoxNumber,
      customerName,
    });
    setShowDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/billings/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to add billing data");
      }
      toast.success("Billing data added successfully!");
      if (onBillingAdded) {
        onBillingAdded(data); 
      }
      setFormData({
        customerName: "",
        setupBoxNumber: "",
        date: getCurrentDate(), // Reset the date to current date after form submission
        amt: "",
        deposit: "",
        takenBy: "kaka",
      });
    } catch (error) {
      console.error("Error adding billing data:", error);
      toast.error("Failed to add billing data");
    }
  };

  return (
    <div>
      <form
        className="bg-base-200/60 p-4 flex flex-wrap items-center w-full border rounded-lg shadow-inner mb-3 gap-4"
        onSubmit={handleSubmit}
      >
        <div className="w-full sm:w-1/2 lg:w-1/4 my-2">
          <select
            className="input input-bordered p-2 w-full"
            onChange={handleChange}
            name="customerName"
            value={formData.customerName}
          >
            <option value="">Select Customer</option>
            {customers.map((customer) => (
              <option
                key={customer._id}
                value={customer.firstName + " " + customer.lastName}
              >
                {customer.firstName + " " + customer.lastName}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full sm:w-1/2 lg:w-1/4 my-2 relative">
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter setup box number"
            name="setupBoxNumber"
            value={formData.setupBoxNumber}
            onChange={handleChange}
            onFocus={() => setShowDropdown(filteredSetupBoxes.length > 0)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          />
          {showDropdown && (
            <ul className="absolute z-10 bg-white border rounded-md shadow w-full max-h-40 overflow-auto">
              {filteredSetupBoxes.map((customer) => (
                <li
                  key={customer._id}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() =>
                    handleSetupBoxSelect(
                      customer.setupBoxNumber,
                      `${customer.firstName} ${customer.lastName}`
                    )
                  }
                >
                  {customer.setupBoxNumber}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="w-full sm:w-1/2 lg:w-1/4 my-2">
          <input
            type="date"
            className="input input-bordered p-2 w-full"
            placeholder="Select date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div className="w-full sm:w-1/2 lg:w-1/4 my-2">
          <input
            type="number"
            className="input input-bordered p-2 w-full"
            value={formData.amt}
            name="amt"
            placeholder="Amount"
            onChange={handleChange}
          />
        </div>

        <div className="w-full sm:w-1/2 lg:w-1/4 my-2">
          <select
            className="input input-bordered p-2 w-full"
            name="deposit"
            value={formData.deposit}
            onChange={handleChange}
          >
            <option value="">Select Mode</option>
            <option value="CASH">CASH</option>
            <option value="ONLINE">ONLINE</option>
          </select>
        </div>

        <div className="w-full sm:w-1/2 lg:w-1/4 my-2">
          <select
            className="input input-bordered p-2 w-full uppercase"
            name="takenBy"
            value={formData.takenBy}
            onChange={handleChange}
          >
            <option value="kaka">Kaka</option>
            <option value="madan">Madan</option>
            <option value="robin">Robin</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-4 sm:ml-2"
        >
          <FaPlus />
        </button>
      </form>
    </div>
  );
};

export default BillingsForm;
