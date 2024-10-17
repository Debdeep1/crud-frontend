import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Card from "../components/Card";
import CustomerTable from "../components/CustomerTable";
import { useDispatch, useSelector } from "react-redux";
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
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card link="/new_user" icon="👤" title="New Users" value="8,267" />
          <Card link="/find_users" icon="📦" title="Find Users" value="" />
        </div>
        <CustomerTable />
      </div>
    </Layout>
  );
};

export default Dashboard;
