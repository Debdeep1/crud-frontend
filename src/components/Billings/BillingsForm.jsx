import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const BillingsForm = () => {
  const [formData, setFormData] = useState({
    customer: "",
    setupBoxNo: "",
    month: "",
    amount: "",
    mode: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div>
      <form
        className="bg-base-200/60 p-2 flex items-center w-full border rounded-lg shadow-inner mb-3 gap-2"
        onSubmit={handleSubmit}
      >
        <div className="w-full my-auto">
          <select
            className="input  input-bordered p-2 w-full"
            onChange={handleChange}
            name="customer"
            value={formData.customer}
          >
            <option value="">Select Customer</option>
            {/* Add options dynamically */}
          </select>
        </div>
        <div className="w-full my-auto">
          <input
            type="text"
            className="input  input-bordered w-full"
            placeholder="Enter setupbox number"
            name="setupBoxNo"
            value={formData.setupBoxNo}
            onChange={handleChange}
          />
        </div>
        <div className="w-full my-auto">
          <input
            type="date"
            className="input  input-bordered  p-2 w-full"
            placeholder="Select month"
            name="month"
            value={formData.month}
            onChange={handleChange}
          />
        </div>
        <div className="w-full my-auto">
          <input
            type="number"
            className="input  input-bordered  p-2 w-full"
            value={formData.amount}
            name="amount"
            placeholder="Amount"
            onChange={handleChange}
          />
        </div>
        <div className="w-full my-auto">
          <select
            className="input  input-bordered  p-2 w-full"
            name="mode"
            value={formData.mode}
            onChange={handleChange}
          >
            <option value="cash">CASH</option>
            <option value="online">ONLINE</option>
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
