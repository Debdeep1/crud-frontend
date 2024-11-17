import PropTypes from "prop-types";
import { FaPlus } from "react-icons/fa";
import { IoChevronBackSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { setZone } from "../../redux/slices/zoneSlice";
import { setCustomer } from "../../redux/slices/customerSlice";
import { useDispatch } from "react-redux";
import { setPlan } from "../../redux/slices/planSlice";
import { useEffect } from "react";

const Heading = ({
  title,
  isFilter = false,
  isZone = false,
  isPlan = false,
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

  useEffect(() => {
    const url = location.pathname;
    if (url === "/billings") {
      dispatch(setCustomer({}));
      dispatch(setZone({}));
      dispatch(setPlan({}));
    }
    if (url === "/customers") {
      dispatch(setCustomer({}));
      dispatch(setZone({}));
      dispatch(setPlan({}));
    }
    if (url === "/zones") {
      dispatch(setCustomer({}));
      dispatch(setZone({}));
      dispatch(setPlan({}));
    }
    if (url === "/plans") {
      dispatch(setCustomer({}));
      dispatch(setZone({}));
      dispatch(setPlan({}));
    }
  }, []);
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={handleBack}
          className="tooltip tooltip-bottom"
          data-tip="Back"
        >
          {" "}
          <IoChevronBackSharp />
        </button>
        <h1 className="text-2xl font-bold ">{title}</h1>
      </div>
      {/* Date Range Selector */}
      {isFilter && (
        <div className="mb-4">
          <input type="date" className="border rounded p-2 mr-2" />
          <input type="date" className="border rounded p-2" />
        </div>
      )}
      {/* Zone new form */}
      {(isZone || isPlan) && (
        <div className="mb-4">
          <button
            className="btn btn-primary"
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
};
export default Heading;
