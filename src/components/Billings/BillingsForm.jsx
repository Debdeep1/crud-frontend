import { FaPlus } from "react-icons/fa";

const BillingsForm = () => {
  return (
    <div>
      <form className="bg-gray-50 p-2 flex items-center w-full rounded-lg shadow mb-3 gap-2">
        <div className="mb-4 w-full">
          <label className="block text-gray-700">Customer</label>
          <select className="border rounded p-2 w-full">
            <option value="">Select Customer</option>
            {/* Add options dynamically */}
          </select>
        </div>
        <div className="mb-4 w-full">
          <label className="block text-gray-700">Setupbox No</label>
          <input
            type="text"
            className="border rounded p-2 w-full"
            placeholder="Enter setupbox number"
          />
        </div>
        <div className="mb-4 w-full">
          <label className="block text-gray-700">Month</label>
          <input
            type="date"
            className="border rounded p-2 w-full"
            placeholder="Select month"
          />
        </div>
        <div className="mb-4 w-full">
          <label className="block text-gray-700">Amount</label>
          <input type="number" className="border rounded p-2 w-full" />
        </div>
        <button
          type="submit w-full"
          className="bg-blue-500 text-white p-2 rounded"
        >
          <FaPlus />
        </button>
      </form>
    </div>
  );
};

export default BillingsForm;
