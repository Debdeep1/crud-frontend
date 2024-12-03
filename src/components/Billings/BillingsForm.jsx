import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import Select from "react-select/base";
import makeAnimated from "react-select/animated";

const BillingsForm = () => {
  const animatedComponents = makeAnimated();
  const [formData, setFormData] = useState({
    customerName: "",
    setupBoxNumber: "",
    date: "",
    amt: "",
    deposit: "",
    takenBy: "kaka",
  });
  const customers = useSelector((state) => state.customers.customers);
  const customerNames = customers.map((customer) => ({
    value: customer.firstName + " " + customer.lastName,
    label: customer.firstName + " " + customer.lastName,
  }));

  console.log("CustomerNames", customerNames);
  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit form data to the /api/billings/add API
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
      setFormData({
        customerName: "",
        setupBoxNumber: "",
        date: "",
        amt: "",
        deposit: "",
        takenBy: "",
      });
    } catch (error) {
      console.error("Error adding billing data:", error);
      toast.error("Failed to add billing data");
    }
  };
  return (
    <div>
      <form
        className="bg-base-200/60 p-2 flex items-center w-full border rounded-lg shadow-inner mb-3 gap-2"
        onSubmit={handleSubmit}
      >
        <div className="w-full my-auto">
          {/* <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            defaultValue={[]}
            options={customerNames}
          /> */}

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
        <div className="w-full my-auto">
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter setupbox number"
            name="setupBoxNumber"
            value={formData.setupBoxNumber}
            onChange={handleChange}
          />
        </div>
        <div className="w-full my-auto">
          <input
            type="date"
            className="input input-bordered p-2 w-full"
            placeholder="Select date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div className="w-full my-auto">
          <input
            type="number"
            className="input input-bordered p-2 w-full"
            value={formData.amt}
            name="amt"
            placeholder="Amount"
            onChange={handleChange}
          />
        </div>
        <div className="w-full my-auto">
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
        <div className="w-full my-auto">
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
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          <FaPlus />
        </button>
      </form>
    </div>
  );
};

export default BillingsForm;
