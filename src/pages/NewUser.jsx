import Layout from "../components/Layout";
import NewCustomerForm from "../components/Customers/NewUserForm";
import Heading from "../components/common/Heading";

const NewUser = () => {
  return (
    <Layout>
      <div className="mx-auto bg-white p-2 border shadow-inner rounded-lg h-[calc(100vh-80px)] overflow-y-auto">
        <div className="bg-white p-4 shadow-inner rounded-lg h-[calc(100vh-100px)] border">
          <Heading title="Add New Customer" />
          <NewCustomerForm />
        </div>
      </div>
    </Layout>
  );
};

export default NewUser;
