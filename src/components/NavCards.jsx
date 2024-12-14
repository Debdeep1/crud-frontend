import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// components/Card.tsx
export default function NavCards({ link, icon, title, value }) {
  return (
    <Link
      to={link}
      className="bg-white p-4 shadow-inner border rounded-lg flex items-center space-x-4 sm:space-x-6 md:space-x-8"
    >
      <span className="text-xl sm:text-2xl text-sky-600">{icon}</span>
      <div>
        <h2 className="text-base sm:text-lg font-semibold text-gray-700">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500">{value}</p>
      </div>
    </Link>
  );
}

NavCards.propTypes = {
  link: PropTypes.string.isRequired,
  icon: PropTypes.object,
  title: PropTypes.string.isRequired,
  value: PropTypes.string,
};
