import PropTypes from "prop-types";
import { useState } from "react";
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
    date: getCurrentDate(),
    amt: "",
    deposit: "",
    takenBy: "kaka",
  });
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [filteredSetupBoxes, setFilteredSetupBoxes] = useState([]);
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [showSetupBoxDropdown, setShowSetupBoxDropdown] = useState(false);

  const customers = useSelector((state) => state.customers.customers);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (name === "customerName") {
      setFilteredCustomers(
        customers.filter((customer) =>
          `${customer.firstName} ${customer.lastName}`
            .toLowerCase()
            .includes(value.toLowerCase())
        )
      );
      setShowCustomerDropdown(true);
    }

    if (name === "setupBoxNumber") {
      setFilteredSetupBoxes(
        customers.filter((customer) =>
          customer.setupBoxNo.toLowerCase().includes(value.toLowerCase())
        )
      );
      setShowSetupBoxDropdown(true);
    }
  };

  const handleCustomerSelect = (customer) => {
    setFormData({
      ...formData,
      customerName: `${customer.firstName} ${customer.lastName}`,
      setupBoxNumber: customer.setupBoxNo,
    });
    setShowCustomerDropdown(false);
  };

  const handleSetupBoxSelect = (customer) => {
    setFormData({
      ...formData,
      setupBoxNumber: customer.setupBoxNo,
      customerName: `${customer.firstName} ${customer.lastName}`,
    });
    setShowSetupBoxDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedCustomer = customers.find(
      (customer) =>
        `${customer.firstName} ${customer.lastName}` === formData.customerName &&
        customer.setupBoxNo === formData.setupBoxNumber
    );

    if (!selectedCustomer) {
      toast.error("Selected customer not found!");
      return;
    }

    const billingData = {
      ...formData,
      customerId: selectedCustomer._id,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/billings/add`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(billingData),
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
        date: getCurrentDate(),
        amt: "",
        deposit: "",
        takenBy: "kaka",
      });
    } catch (error) {
      toast.error("Failed to add billing data");
    }
  };

  return (
    <div>
      <form
        className="bg-base-200/60 p-4 border rounded-lg shadow-inner mb-3"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {/* Customer Name Search Dropdown */}
          <div className="my-2 relative">
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Search customer name"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              onFocus={() => setShowCustomerDropdown(filteredCustomers.length > 0)}
              onBlur={() => setTimeout(() => setShowCustomerDropdown(false), 200)}
            />
            {showCustomerDropdown && (
              <ul className="absolute z-10 bg-white border rounded-md shadow w-full max-h-40 overflow-auto">
                {filteredCustomers.map((customer) => (
                  <li
                    key={customer._id}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleCustomerSelect(customer)}
                  >
                    {customer.firstName} {customer.lastName}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Setup Box Number Search Dropdown */}
          <div className="my-2 relative">
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Search setup box number"
              name="setupBoxNumber"
              value={formData.setupBoxNumber}
              onChange={handleChange}
              onFocus={() => setShowSetupBoxDropdown(filteredSetupBoxes.length > 0)}
              onBlur={() => setTimeout(() => setShowSetupBoxDropdown(false), 200)}
            />
            {showSetupBoxDropdown && (
              <ul className="absolute z-10 bg-white border rounded-md shadow w-full max-h-40 overflow-auto">
                {filteredSetupBoxes.map((customer) => (
                  <li
                    key={customer._id}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSetupBoxSelect(customer)}
                  >
                    {customer.setupBoxNo}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Other form fields */}
          <div className="my-2">
            <input
              type="date"
              className="input input-bordered p-2 w-full"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <div className="my-2">
            <input
              type="number"
              className="input input-bordered p-2 w-full"
              name="amt"
              placeholder="Amount"
              value={formData.amt}
              onChange={handleChange}
            />
          </div>
          <div className="my-2">
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
          <div className="my-2">
            <select
              className="input input-bordered p-2 w-full uppercase"
              name="takenBy"
              value={formData.takenBy}
              onChange={handleChange}
            >
              <option value="kaka">Kaka</option>
              <option value="madan">Madan</option>
              <option value="robin">Robin</option>
              <option value="gopal">Gopal</option>
              <option value="office_1">Office 1</option>
              <option value="office_2">Office 2</option>
              <option value="others">Others</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded mt-4"
          >
            <FaPlus />
          </button>
        </div>
      </form>
    </div>
  );
};

BillingsForm.propTypes = {
  onBillingAdded: PropTypes.func.isRequired,
}
export default BillingsForm;
