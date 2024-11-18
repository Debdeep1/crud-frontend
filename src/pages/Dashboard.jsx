import { useEffect, useMemo } from "react";

import NavCards from "../components/NavCards";

import { useDispatch, useSelector } from "react-redux";
import { addCustomers } from "../redux/slices/customerSlice";
import { toast } from "react-toastify";
import { FaDollarSign, FaMapMarkedAlt, FaUsers } from "react-icons/fa";
import { RiUserSearchFill } from "react-icons/ri";
import Layout from "../components/Layout";
import CustomerTable from "../components/Customers/CustomerTable";

const Dashboard = () => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers.customers);

  const navCards = useMemo(
    () => [
      {
        link: "/new_user",
        icon: <FaUsers />,
        title: "New Customer",
        value: JSON.stringify(customers.length),
      },
      {
        link: "/find_users",
        icon: <RiUserSearchFill color="#A64D79"/>,
        title: "Find Customers",
        value: "",
      },
      {
        link: "/zones",
        icon: <FaMapMarkedAlt color="#FF9D3D" />,
        title: "Zones",
        value: "",
      },
      {
        link: "/plans",
        icon: <FaDollarSign color="#88C273" />,
        title: "Plans",
        value: "",
      },
    ],
    []
  );

  const fetchCustomers = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/customers/all`
      );
      if (response.ok) {
        const data = await response.json();
        dispatch(addCustomers(data));
      } else {
        toast.error("Failed to fetch customers");
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
        {
          navCards.map((card, index) => (
            <NavCards
              key={index}
              link={card.link}
              icon={card.icon}
              title={card.title}
              value={card.value}
            />
          ))
        }
        </div>
        <CustomerTable />
      </div>
    </Layout>
  );
};

export default Dashboard;
