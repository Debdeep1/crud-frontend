import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";

const BillingsForm = () => {
  const [formData, setFormData] = useState({
    customer: "",
    setupBoxNo: "",
    month: "",
    amount: "",
    mode: "",
  });
  const [customers, setCustomers] = useState([]);
  const dispatch = useDispatch();

  // Fetch customers for the dropdown from the /api/billings/filter API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/billings/filter`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch customers");
        }
        setCustomers(data); // Update state with fetched customers
      } catch (error) {
        console.error("Error fetching customers:", error);
        toast.error("Failed to fetch customers");
      }
    };

    fetchCustomers();
  }, []);

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
        customer: "",
        setupBoxNo: "",
        month: "",
        amount: "",
        mode: "",
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
          <select
            className="input input-bordered p-2 w-full"
            onChange={handleChange}
            name="customer"
            value={formData.customer}
          >
            <option value="">Select Customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full my-auto">
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter setupbox number"
            name="setupBoxNo"
            value={formData.setupBoxNo}
            onChange={handleChange}
          />
        </div>
        <div className="w-full my-auto">
          <input
            type="date"
            className="input input-bordered p-2 w-full"
            placeholder="Select month"
            name="month"
            value={formData.month}
            onChange={handleChange}
          />
        </div>
        <div className="w-full my-auto">
          <input
            type="number"
            className="input input-bordered p-2 w-full"
            value={formData.amount}
            name="amount"
            placeholder="Amount"
            onChange={handleChange}
          />
        </div>
        <div className="w-full my-auto">
          <select
            className="input input-bordered p-2 w-full"
            name="mode"
            value={formData.mode}
            onChange={handleChange}
          >
            <option value="">Select Mode</option>
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


// import { useState } from "react";
// import { FaPlus } from "react-icons/fa";

// const BillingsForm = () => {
//   const [formData, setFormData] = useState({
//     customer: "",
//     setupBoxNo: "",
//     month: "",
//     amount: "",
//     mode: "",
//   });
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//   };
//   return (
//     <div>
//       <form
//         className="bg-base-200/60 p-2 flex items-center w-full border rounded-lg shadow-inner mb-3 gap-2"
//         onSubmit={handleSubmit}
//       >
//         <div className="w-full my-auto">
//           <select
//             className="input  input-bordered p-2 w-full"
//             onChange={handleChange}
//             name="customer"
//             value={formData.customer}
//           >
//             <option value="">Select Customer</option>
//             {/* Add options dynamically */}
//           </select>
//         </div>
//         <div className="w-full my-auto">
//           <input
//             type="text"
//             className="input  input-bordered w-full"
//             placeholder="Enter setupbox number"
//             name="setupBoxNo"
//             value={formData.setupBoxNo}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="w-full my-auto">
//           <input
//             type="date"
//             className="input  input-bordered  p-2 w-full"
//             placeholder="Select month"
//             name="month"
//             value={formData.month}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="w-full my-auto">
//           <input
//             type="number"
//             className="input  input-bordered  p-2 w-full"
//             value={formData.amount}
//             name="amount"
//             placeholder="Amount"
//             onChange={handleChange}
//           />
//         </div>
//         <div className="w-full my-auto">
//           <select
//             className="input  input-bordered  p-2 w-full"
//             name="mode"
//             value={formData.mode}
//             onChange={handleChange}
//           >
//             <option value="cash">CASH</option>
//             <option value="online">ONLINE</option>
//           </select>
//         </div>
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//           <FaPlus />
//         </button>
//       </form>
//     </div>
//   );
// };

// export default BillingsForm;
