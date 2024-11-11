import { useState } from "react";
import Heading from "../components/Heading";
import Layout from "../components/Layout";

const Zone = () => {
  const [formData, setFormData] = useState({
    zoneName: "",
    zoneNumber: "",
    zonalLandmark: "",
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
          <Heading title="Create Zones" />

          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="zoneName"
              >
                Name
              </label>
              <input
                type="text"
                id="zoneName"
                name="zoneName"
                value={formData.zoneName}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Enter name of the zone"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="zoneNumber"
              >
                Zonal Number
              </label>
              <input
                type="text"
                id="zoneNumber"
                name="zoneNumber"
                value={formData.zoneNumber}
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

export default Zone;