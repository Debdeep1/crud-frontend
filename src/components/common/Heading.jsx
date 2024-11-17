import PropTypes from "prop-types";
import { IoChevronBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Heading = ({ title, isFilter = false, isZone = false }) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
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
      {isZone && (
        <div className="mb-4">
          <button className="btn btn-primary" onClick={() => navigate("/new_zone")}>New Zone</button>
        </div>
      )}
    </div>
  );
};

Heading.propTypes = {
  title: PropTypes.string.isRequired,
  isFilter: PropTypes.bool,
  isZone: PropTypes.bool,
};
export default Heading;
