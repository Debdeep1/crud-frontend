import Heading from "../components/common/Heading";
import Layout from "../components/Layout";
import BillingsForm from "../components/Billings/BillingsForm";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchFilteredCustomers } from "../apis/customer";
import { formatDate } from "../utlis";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Modal from "../components/common/Modal";
import Drawer from "../components/common/Drawer";
import { fetchBillingObjectApi } from "../apis/billing";

const Billings = () => {
  const user = useSelector((state) => state.user.user);
  const role = user.role;
  const [filterCustomers, setFilterCustomers] = useState([]);
  const [modal, setModal] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [showDrawer, setShowDrawer] = useState(false);
  const [billingObject, setBillingObject] = useState({});

  // Fetch filtered customers
  const fetchFilterCustomers = useCallback(
    async (startDate, endDate, customerField) => {
      try {
        const response = await fetchFilteredCustomers(
          startDate,
          endDate,
          customerField
        );
        const sortedData = response.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setFilterCustomers(sortedData);
      } catch (error) {
        console.error("Error fetching filtered customers:", error);
      }
    },
    []
  );

  // Fetch customers on initial render
  useEffect(() => {
    fetchFilterCustomers();
  }, [fetchFilterCustomers]);

  const setDeleteModal = (id) => {
    setModal(true);
    setCustomerId(id);
  };
  // Handle delete action
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/billings/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error("Something went wrong");
        throw new Error(data.message || "Something went wrong");
      } else {
        toast.success("Billing deleted successfully!");
        fetchFilterCustomers();
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
      toast.error("Something went wrong");
    }
  };
  // Handle new billing addition
  const handleNewBilling = (newBilling) => {
    setFilterCustomers((prev) => {
      const updatedList = [...prev, newBilling];
      return updatedList.sort((a, b) => new Date(a.date) - new Date(b.date));
    });
  };
  const billingData = filterCustomers;
  console.log("billing data", billingData);

  // Fetch billing object
  const fetchBillingObject = async (id) => {
    try {
      const response = await fetchBillingObjectApi(id);
      console.log("Billing object", response);
      setBillingObject(response);
    } catch (error) {
      console.error("Error fetching billing object:", error);
    }
  };

  return (
    <Layout>
      <div className="mx-auto bg-white p-2 shadow-md border rounded-lg h-[calc(100vh-80px)] overflow-y-auto">
        <div className="mx-auto bg-white p-4 shadow-inner border rounded-lg h-[calc(100vh-100px)] overflow-y-auto">
          <Heading
            title="Billings"
            isFilter={true}
            onFilterApply={(startDate, endDate, customerField) => {
              fetchFilterCustomers(startDate, endDate, customerField);
            }}
          />

          {/* Total Amount */}
          <div className="text-2xl font-semibold my-2 text-center">
            Total Amount: Rs.{" "}
            {billingData
              ? billingData
                  .reduce((acc, item) => acc + (item.amt || 0), 0)
                  .toFixed(2)
              : "0.00"}
          </div>

          {/* Billing Form */}
          <BillingsForm onBillingAdded={handleNewBilling} />

          {/* Billing Data Table */}
          <div className="bg-white p-2 shadow-inner rounded-lg">
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th className="p-2 uppercase">Customer</th>
                    <th className="p-2 uppercase">STB</th>
                    <th className="p-2 uppercase">Month</th>
                    <th className="p-2 uppercase">Amount</th>
                    {role === "admin" && (
                      <th className="p-2 uppercase text-center">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {billingData.length > 0 ? (
                    billingData.map((record, index) => (
                      <tr key={index} className="border-b">
                        <td
                          className="p-2 hover:underline cursor-pointer"
                          onClick={() => {
                            fetchBillingObject(record._id);
                            setShowDrawer(true);
                          }}
                        >
                          {record.customer?.firstName +
                            " " +
                            record.customer?.lastName}
                        </td>
                        <td className="p-2">{record.setupBoxNumber}</td>
                        <td className="p-2">{formatDate(record.date)}</td>
                        <td className="p-2">Rs. {record.amt}</td>
                        {role === "admin" && (
                          <td className="p-1 text-center">
                            <button
                              className="btn btn-sm btn-error text-white"
                              onClick={() => setDeleteModal(record._id)}
                            >
                              <FaTrash className="w-3 h-3" />
                            </button>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-2 text-center">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {modal && (
        <Modal
          isOpen={modal}
          onClose={() => setModal(false)}
          title="Delete Billing"
          desp="Are you sure you want to delete this billing?"
          isDelete={true}
          onClick={() => {
            handleDelete(customerId);
            setModal(false);
          }}
        />
      )}

      {showDrawer && (
        <Drawer
          open={showDrawer}
          onClose={() => setShowDrawer(false)}
          details={billingObject}
        />
      )}
    </Layout>
  );
};

export default Billings;
