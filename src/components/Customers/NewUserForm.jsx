"use client";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchZones } from "../../apis/Zones";
import { fetchPlans } from "../../apis/Plans";
import { addZones } from "../../redux/slices/zoneSlice";
import { addPlans } from "../../redux/slices/planSlice";
import PropTypes from "prop-types";

export default function NewCustomerForm({
  isNew = true,
  isEditing = true,
  setIsEditing,
}) {
  const dispatch = useDispatch();
  const getZonesAndPlans = async () => {
    try {
      const zonesResponse = await fetchZones();
      const plansResponse = await fetchPlans();
      dispatch(addZones(zonesResponse));
      dispatch(addPlans(plansResponse));
    } catch (error) {
      console.error("Error fetching zones and plans:", error);
    }
  };
  const zones = useSelector((state) => state.zones.zones);
  const plans = useSelector((state) => state.plans.plans);
  const customer = useSelector((state) => state.customers.customer);
  const [formData, setFormData] = useState({
    setupBoxNo: customer.setupBoxNo || "",
    firstName: customer.firstName || "",
    lastName: customer.lastName || "",
    email: customer.email || "",
    mobileNo: customer.mobileNo || "",
    companyName: customer.companyName || "",
    address: customer.address || "",
    landmark: customer.landmark || "",
    city: customer.city || "",
    pincode: customer.pincode || "",
    zone: customer.zone || "",
    servicePlan: customer.servicePlan || "",
    amt: customer.amt || "",
    remarks: customer.remarks || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "servicePlan") {
      const selectedPlan = plans.find((plan) => plan.name === value);
      setFormData({
        ...formData,
        [name]: value,
        amt: selectedPlan ? selectedPlan.price : "",
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = location.pathname.includes(customer._id)
      ? `${import.meta.env.VITE_REACT_APP_API_URL}/customers/update/${
          customer._id
        }`
      : `${import.meta.env.VITE_REACT_APP_API_URL}/customers/add`;
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        if (response.status == 400) toast.error(response.message);
        else toast.error("Something went wrong");
        throw new Error(data.message || "Something went wrong");
      }

      if (location.pathname.includes(customer._id)) {
        toast.success("Customer updated!");
        setIsEditing(false);
      } else {
        toast.success("Customer created!");
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    getZonesAndPlans();
  }, []);
  return (
    <form onSubmit={handleSubmit}>
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
          value={formData.setupBoxNo}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Enter Setupbox No"
          required
          disabled={!isEditing}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
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
            value={formData.firstName}
            onChange={handleChange}
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
            value={formData.lastName}
            onChange={handleChange}
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
            value={formData.email}
            onChange={handleChange}
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
            value={formData.mobileNo}
            onChange={handleChange}
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
          value={formData.companyName}
          onChange={handleChange}
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
            value={formData.address}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Enter Address"
            required
            disabled={!isEditing}
          />
        </div>

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
            value={formData.city}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Enter City"
            required
            disabled={!isEditing}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
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
            value={formData.pincode}
            onChange={handleChange}
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
          <select
            id="zone"
            name="zone"
            value={formData.zone}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
            disabled={!isEditing}
          >
            <option value="">Select a Zone</option>
            {zones.map((zone) => (
              <option key={zone._id} value={zone.name}>
                {zone.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="landmark"
          >
            Landmark
          </label>

          <select
            id="landmark"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
            disabled={!isEditing}
          >
            <option value="">Select a Zone</option>
            {zones.map((zone) => (
              <option key={zone._id} value={zone.zonalLandmark}>
                {zone.zonalLandmark}
              </option>
            ))}
          </select>
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
          <select
            id="servicePlan"
            name="servicePlan"
            value={formData.servicePlan}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
            disabled={!isEditing}
          >
            <option value="">Select a Service Plan</option>
            {plans.map((plan) => (
              <option key={plan._id} value={plan.name}>
                {plan.name}
              </option>
            ))}
          </select>
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
            value={formData.amt}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Enter Amount"
            required
            disabled
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
          value={formData.remarks}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
          placeholder="Enter Remarks"
          disabled={!isEditing}
        />
      </div>
      <div className="flex justify-end">
        {isNew ? (
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        ) : isEditing ? (
          <>
            <button
              type="button"
              className="btn btn-outline mr-2"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-wide">
              Save
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="btn btn-primary btn-wide"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          </>
        )}
      </div>
    </form>
  );
}

NewCustomerForm.propTypes = {
  isNew: PropTypes.bool,
  isEditing: PropTypes.bool,
  setIsEditing: PropTypes.func,
};
