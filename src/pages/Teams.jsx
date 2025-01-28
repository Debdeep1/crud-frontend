import Heading from "../components/common/Heading";
import Layout from "../components/Layout";
const Teams = () => {
  return (
    <Layout>
      <div className="bg-white p-2 shadow-md rounded-lg h-[calc(100vh-80px)] border">
        <div className="mx-auto bg-white p-4 shadow-inner border rounded-lg h-[calc(100vh-100px)] overflow-y-auto">
          <Heading title="Manage Teams" isFilter={false} />
        </div>
      </div>
    </Layout>
  );
};

export default Teams;
