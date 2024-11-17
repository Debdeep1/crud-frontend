import { useState } from "react";
import Layout from "../Layout";
import Heading from "../common/Heading";
import { toast } from "react-toastify";

const Zoneform = () => {
  const [formData, setFormData] = useState({
    name: "",
    zonalNumber: "",
    zonalLandmark: "",
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
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/zones/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if(!response.ok){
        toast.error("Something went wrong");
        throw new Error(data.message || "Something went wrong");
      }else{
        toast.success("Zone added successfully!");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  return (
    <Layout>
      <div className="bg-white p-2 shadow-md rounded-lg h-[calc(100vh-80px)] border">
        <div className="bg-white p-4 shadow-inner rounded-lg h-[calc(100vh-100px)] border">
          <Heading title="Create Zone" />
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
                placeholder="Enter name of the zone"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="zonalNumber"
              >
                Zonal Number
              </label>
              <input
                type="text"
                id="zonalNumber"
                name="zonalNumber"
                value={formData.zonalNumber}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Enter zonal number"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="zonalLandmark"
              >
                Zonal Landmark
              </label>
              <input
                type="text"
                id="zonalLandmark"
                name="zonalLandmark"
                value={formData.zonalLandmark}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Enter landmark "
                required
              />
            </div>

            <div className="flex justify-end">
              <button type="submit" className="btn btn-primary">
                Add Zone
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Zoneform;
