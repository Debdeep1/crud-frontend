import React from "react";
import Layout from "../components/Layout";
import NewCustomerForm from "../components/Customers/NewUserForm";


const NewUser = () => {
  return (
    <Layout>
      <div className="my-auto h-[calc(100vh-80px)] border p-2 bg-white rounded-lg shadow-md">
        <NewCustomerForm />
      </div>
    </Layout>
  );
};

export default NewUser;
