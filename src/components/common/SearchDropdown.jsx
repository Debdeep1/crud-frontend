import PropTypes from "prop-types";

const SearchDropdown = ({
  label,
  placeholder,
  value,
  handleChange,
  options,
  onSelect,
}) => {
  return (
    <div className="relative w-full">
      {label && (
        <label className="label">
          <span className="label-text text-sm capitalize">{label}</span>
        </label>
      )}

      <input
        type="text"
        id="name"
        name="name"
        value={value}
        onChange={handleChange}
        className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
      />
      {value && options.length > 0 && (
        <ul className="absolute z-10 bg-white border rounded-lg min-w-lg max-w-xl mt-1 max-h-96 overflow-y-auto">
          {options.map((customer, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => onSelect(customer)}
            >
              {customer.firstName} {customer.lastName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

SearchDropdown.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};
export default SearchDropdown;
