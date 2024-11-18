import Layout from "../components/Layout";
import FindUsers from "../components/Customers/FindUsers";

const FindUser = () => {
  return (
    <Layout>
      <div className="my-auto h-[calc(100vh-80px)] border p-2 bg-white rounded-lg shadow-md">
        <FindUsers />
      </div>
    </Layout>
  );
};

export default FindUser;
