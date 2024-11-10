import { useEffect } from "react";
import Layout from "../components/Layout";
import NavCards from "../components/NavCards";
import CustomerTable from "../components/CustomerTable";
import { useDispatch } from "react-redux";
import { addCustomers } from "../redux/slices/customerSlice";
import { toast } from "react-toastify";

const Dashboard = () => {
  const dispatch = useDispatch();

  const fetchCustomers = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/customers/all`
      );
      if (response.ok) {
        const data = await response.json();
        dispatch(addCustomers(data));
      }
      else {
        toast.error("Failed to fetch customers")
      }
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);
  return (
    <Layout>
      <div className="h-[calc(100vh-80px)] bg-white overflow-y-auto rounded-lg shadow-md border p-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <NavCards link="/new_user" icon="👤" title="New Users" value="8,267" />
          <NavCards link="/find_users" icon="📦" title="Find Users" value="" />
        </div>
        <CustomerTable />
      </div>
    </Layout>
  );
};

export default Dashboard;
