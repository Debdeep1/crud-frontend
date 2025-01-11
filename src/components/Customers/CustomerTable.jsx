import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import CustomerActions from "../CustomerActions";

export default function CustomerTable({ getCustomers }) {
  // Fetch customer data from the API
  const customers = useSelector((state) => state.customers.customers);
  return (
    <div className="bg-white p-4 shadow-inner rounded-lg overflow-y-auto h-[calc(100vh-220px)]">
      <table className="table w-full text-sm md:text-base">
        <thead>
          <tr>
            <th className="p-2 text-left">NAME</th>
            <th className="p-2 text-left hidden md:table-cell">STB</th>
            <th className="p-2 text-left hidden sm:table-cell">PHONE NUMBER</th>
            <th className="p-2 text-left hidden lg:table-cell">LANDMARK</th>
            <th className="p-2 text-left hidden lg:table-cell">ZONE</th>
            <th className="p-2 text-left">AMOUNT</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 &&
            customers.map((customer, index) => (
              <tr key={index} className="hover">
                <td className="p-2">
                  <p className="font-semibold">
                    {customer.firstName} {customer.lastName}
                  </p>
                </td>
                <td className="p-2 hidden md:table-cell">
                  {customer.setupBoxNo}
                </td>
                <td className="p-2 hidden sm:table-cell">
                  {customer.mobileNo}
                </td>
                <td className="p-2 hidden lg:table-cell">
                  {customer.zone.zonalLandmark +
                    " ** " +
                    customer.zone.zonalNumber}
                </td>
                <td className="p-2 hidden sm:table-cell">
                  {customer.zone.name}
                </td>
                <td className="p-2">{customer.amt}</td>
                <td className="p-2">
                  <CustomerActions getCustomers={getCustomers} customer={customer}/>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

CustomerTable.propTypes = {
  getCustomers: PropTypes.func.isRequired,
};
