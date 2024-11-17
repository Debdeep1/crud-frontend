import { useState } from "react";
import Layout from "../Layout";
import Heading from "../common/Heading";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Planform = () => {
  const location = useLocation();

  const plan = useSelector((state) => state.plans.plan);
  const [formData, setFormData] = useState({
    name: plan.name || "",
    planNumber: plan.planNumber || "",
    price: plan.price || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const apiUrl = location.pathname.includes(plan._id)
      ? `${import.meta.env.VITE_REACT_APP_API_URL}/plans/update/${plan._id}`
      : `${import.meta.env.VITE_REACT_APP_API_URL}/plans/add`;
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error("Something went wrong");
        throw new Error(data.message || "Something went wrong");
      } else {
        if (location.pathname.includes(plan._id)) {
          toast.success("Plan updated successfully!");
        } else {
          toast.success("Plan created successfully!");
          setFormData({
            name: "",
            planNumber: "",
            price: "",
          });
        }
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  return (
    <Layout>
      <div className="bg-white p-2 shadow-md rounded-lg h-[calc(100vh-80px)] border">
        <div className="bg-white p-4 shadow-inner rounded-lg h-[calc(100vh-100px)] border">
          <Heading title="Create Plan" />
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Enter name of the plan eg:Silver, Gold"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="planNumber"
              >
                Plan Number
              </label>
              <input
                type="text"
                id="planNumber"
                name="planNumber"
                value={formData.planNumber}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Enter plan number"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="price"
              >
                Price
              </label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Enter price"
                required
              />
            </div>

            <div className="flex justify-end">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Planform;
