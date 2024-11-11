import { useState } from "react";
import Heading from "../components/Heading";
import Layout from "../components/Layout";

const Plans = () => {
  const [formData, setFormData] = useState({
    planName: "",
    planNumber: "",
    price: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Layout>
      <div className="bg-white p-2 shadow-md rounded-lg h-[calc(100vh-80px)] border">
        <div className="bg-white p-6 shadow-inner rounded-lg h-[calc(100vh-100px)] border">
          <Heading title="Create Plans" />
          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="planName"
              >
                Name
              </label>
              <input
                type="text"
                id="planName"
                name="planName"
                value={formData.planName}
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
                required
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
                Add Plan
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Plans;
