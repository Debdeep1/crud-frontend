import Heading from "../components/common/Heading";
import Layout from "../components/Layout";
import BillingsForm from "../components/Billings/BillingsForm";

const Billings = () => {
  // Example data for demonstration; you can replace this with dynamic data.
  const billingData = [
    { customer: "John Doe", month: "October 2024", amount: 500 },
    { customer: "Jane Smith", month: "September 2024", amount: 300 },
  ];

  return (
    <Layout>
      <div className="mx-auto bg-white p-2 shadow-md border rounded-lg h-[calc(100vh-80px)] overflow-y-auto">
        <div className="mx-auto bg-white p-4 shadow-inner border rounded-lg h-[calc(100vh-100px)] overflow-y-auto">
          <Heading title="Billings" isFilter={true} />

          {/* Total Amount */}
          <div className="text-2xl font-semibold my-2 text-center">
            Total Amount: $0.00 {/* Update dynamically */}
          </div>

          {/* Billing Form */}
          <BillingsForm />

          <div className="bg-white p-2 shadow-inner rounded-lg">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th className="p-2 uppercase">Customer</th>
                  <th className="p-2 uppercase">Month</th>
                  <th className="p-2 uppercase">Amount</th>
                </tr>
              </thead>
              <tbody>
                {billingData.length > 0 ? (
                  billingData.map((record, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{record.customer}</td>
                      <td className="p-2">{record.month}</td>
                      <td className="p-2">${record.amount}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="p-2 text-center">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Billings;
