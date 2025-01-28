import PropTypes from "prop-types";

const Drawer = ({ open, onClose, details }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end transition-transform transform ${open ? "translate-x-0" : "translate-x-full"
        }`}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Drawer content */}
      <div className="relative w-80 bg-white shadow-lg h-full flex flex-col p-2">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-2">
          <h2 className="text-lg font-semibold">Billing Details</h2>
          <button className="btn btn-sm btn-circle btn-ghost" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto mt-4">
          {details ? (
            <div className="space-y-4 bg-white p-2 rounded-lg">
              <div className="items-center">
                <p className="font-medium capitalize text-gray-600">Name:</p>
                <span className="text-gray-800 text-sm">
                  {details.customer?.firstName} {details.customer?.lastName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium capitalize text-gray-600">Amount:</span>
                <span className="text-gray-800">{details.amt}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium capitalize text-gray-600">Setup Box ID:</span>
                <span className="text-gray-800">{details.setupBoxNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium capitalize text-gray-600">Mobile No:</span>
                <span className="text-gray-800">{details.customer?.mobileNo?.join(", ")}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium capitalize text-gray-600">Plan:</span>
                <span className="text-gray-800">{details.customer?.servicePlan}</span>
              </div>
              <div className="">
                <p className="font-medium capitalize text-gray-600">Note:</p>
                <span className="text-gray-800">{details.note || "N/A"}</span>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No details available.</p>
          )}
        </div>


        {/* Footer */}
        <div className="mt-4 border-t pt-2">
          <button onClick={onClose} className="w-full btn-primary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

Drawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  details: PropTypes.object,
};

export default Drawer;
