import PropTypes from "prop-types";
import { IoIosClose } from "react-icons/io";

const Modal = ({ isOpen, onClose, title, desp, isDelete = false, onClick }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-lg transform overflow-hidden rounded-lg bg-white py-4 px-6 text-left shadow-xl transition-all">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-medium leading-6 text-gray-900">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="rounded-full p-1 hover:bg-gray-100 transition-colors"
            >
              <IoIosClose className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="text-base text-gray-600">{desp}</div>

          {/* Footer */}
          <div className="mt-4 flex justify-end gap-2">
            <button onClick={onClose} className="btn btn-outline">
              No, Cancel
            </button>
            <button
              onClick={onClick}
              className={`btn ${
                isDelete ? "btn-error text-white" : "btn-primary"
              } `}
            >
              Yes, Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  desp: PropTypes.string.isRequired,
  isDelete: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Modal;
