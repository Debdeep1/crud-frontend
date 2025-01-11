import PropTypes from "prop-types";
import { FaPlus } from "react-icons/fa";
import { IoChevronBackSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { setZone } from "../../redux/slices/zoneSlice";
import { setCustomer } from "../../redux/slices/customerSlice";
import { useDispatch, useSelector } from "react-redux";
import { setPlan } from "../../redux/slices/planSlice";
import { useEffect, useState } from "react";
import SearchDropdown from "../common/SearchDropdown";

const Heading = ({
  title,
  isFilter = false,
  isZone = false,
  isPlan = false,
  onFilterApply, // Callback function to handle filter apply
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleBack = () => {
    navigate(-1);
    dispatch(setCustomer({}));
    dispatch(setZone({}));
    dispatch(setPlan({}));
  };

  // Get the first and last day of the current month by default
  const currentDate = new Date();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  )
    .toISOString()
    .split("T")[0];
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  )
    .toISOString()
    .split("T")[0];

  // State for date inputs
  const [startDate, setStartDate] = useState(firstDayOfMonth);
  const [endDate, setEndDate] = useState(lastDayOfMonth);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const customers = useSelector((state) => state.customers.customers);

  const handleFilterApply = () => {
    if (onFilterApply) {
      const selectedCustomer = customers.find(
        (customer) =>
          `${customer.firstName} ${customer.lastName}` === searchTerm
      );
      onFilterApply(
        startDate,
        endDate,
        selectedCustomer ? selectedCustomer._id : ""
      );
    }
  };

  useEffect(() => {
    const url = location.pathname;
    if (["/billings", "/customers", "/zones", "/plans"].includes(url)) {
      dispatch(setCustomer({}));
      dispatch(setZone({}));
      dispatch(setPlan({}));
    }
  }, [location.pathname, dispatch]);

  useEffect(() => {
    setFilteredCustomers(customers);
  }, [customers]);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filter customers based on the search term
    const filtered = customers.filter((customer) =>
      `${customer.firstName} ${customer.lastName}`
        .toLowerCase()
        .includes(term.toLowerCase())
    );
    setFilteredCustomers(filtered);
  };

  const handleCustomerSelect = (customer) => {
    setSearchTerm(`${customer.firstName} ${customer.lastName}`);
    setFilteredCustomers([]);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-6 md:gap-8">
      <div className="flex items-center gap-2 w-full sm:w-auto mb-6">
        <button
          onClick={handleBack}
          className="tooltip tooltip-bottom"
          data-tip="Back"
        >
          <IoChevronBackSharp />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold">{title}</h1>
      </div>

      {/* Date Range Selector */}
      {isFilter && (
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 w-full sm:w-auto">
          <input
            type="date"
            className="border rounded p-2 w-full sm:w-auto"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="border rounded p-2 w-full sm:w-auto"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <div>
            <SearchDropdown
              placeholder="Select a customer"
              value={searchTerm}
              handleChange={handleSearchChange}
              options={filteredCustomers}
              onSelect={handleCustomerSelect}
            />
          </div>

          <button
            className="btn btn-primary w-full sm:w-auto"
            onClick={handleFilterApply}
          >
            Apply Filter
          </button>
        </div>
      )}

      {/* Zone or Plan new form */}
      {(isZone || isPlan) && (
        <div className="mb-4 w-full sm:w-auto">
          <button
            className="btn btn-primary w-full sm:w-auto"
            onClick={() =>
              isZone
                ? navigate("/new_zone")
                : isPlan
                ? navigate("/new_plan")
                : navigate("/new_customer")
            }
          >
            <FaPlus /> New
          </button>
        </div>
      )}
    </div>
  );
};

Heading.propTypes = {
  title: PropTypes.string.isRequired,
  isFilter: PropTypes.bool,
  isZone: PropTypes.bool,
  isPlan: PropTypes.bool,
  onFilterApply: PropTypes.func, // Callback function to handle filter apply
};

export default Heading;
