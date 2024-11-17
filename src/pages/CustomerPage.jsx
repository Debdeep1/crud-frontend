import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import { useState } from "react";
import Heading from "../components/common/Heading";

const CustomerPage = () => {
  const customer = useSelector((state) => state.customers.customer);
  const [isEditing, setIsEditing] = useState(false);

  const handleSetEditing = () => {
    setIsEditing(!isEditing);
  };
  return (
    <Layout>
      <div className="h-[calc(100vh-80px)] bg-white overflow-y-auto rounded-lg shadow-md border p-2">
        <div className="h-[calc(100vh-100px)] bg-white overflow-y-auto rounded-lg shadow-inner border p-6">
          <Heading title="Customer Details" />
          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="setupBoxNo"
              >
                Setupbox No
              </label>
              <input
                type="text"
                id="setupBoxNo"
                name="setupBoxNo"
                value={customer.setupBoxNo}
                // onChange={handleChange}
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Setupbox No"
                required
                disabled={!isEditing}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {" "}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={customer.firstName}
                  //   onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Enter First Name"
                  required
                  disabled={!isEditing}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={customer.lastName}
                  //   onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Enter Last Name"
                  required
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email (Optional)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={customer.email}
                  //   onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Enter Email"
                  disabled={!isEditing}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="mobileNo"
                >
                  Mobile No
                </label>
                <input
                  type="text"
                  id="mobileNo"
                  name="mobileNo"
                  value={customer.mobileNo}
                  //   onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Enter Mobile No"
                  required
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="companyName"
              >
                Company Name (Optional)
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={customer.companyName}
                // onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Enter Company Name"
                disabled={!isEditing}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={customer.address}
                  //   onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Enter Address"
                  required
                  disabled={!isEditing}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="landmark"
                >
                  Landmark
                </label>
                <input
                  type="text"
                  id="landmark"
                  name="landmark"
                  value={customer.landmark}
                  //   onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Enter Landmark"
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="city"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={customer.city}
                  //   onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Enter City"
                  required
                  disabled={!isEditing}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="pincode"
                >
                  Pincode
                </label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={customer.pincode}
                  //   onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Enter Pincode"
                  required
                  disabled={!isEditing}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="zone"
                >
                  Zone
                </label>
                <input
                  type="text"
                  id="zone"
                  name="zone"
                  value={customer.zone}
                  //   onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Enter Zone"
                  required
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="servicePlan"
                >
                  Service Plan
                </label>
                <input
                  type="text"
                  id="servicePlan"
                  name="servicePlan"
                  value={customer.servicePlan}
                  //   onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Enter Service Plan"
                  required
                  disabled={!isEditing}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="amt"
                >
                  Amount (Amt)
                </label>
                <input
                  type="number"
                  id="amt"
                  name="amt"
                  value={customer.amt}
                  //   onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Enter Amount"
                  required
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="remarks"
              >
                Remarks
              </label>
              <textarea
                id="remarks"
                name="remarks"
                value={customer.remarks}
                // onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Enter Remarks"
                disabled={!isEditing}
              />
            </div>

            <div className="flex justify-end">
              {isEditing ? (
                <div>
                  <button
                    type="button"
                    onClick={handleSetEditing}
                    className="bg-blue-500 text-white mr-3 px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    // onClick={handleSetEditing}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleSetEditing}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Edit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerPage;
