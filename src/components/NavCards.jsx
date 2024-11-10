import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// components/Card.tsx
export default function NavCards({ link, icon, title, value }) {
  return (
    <Link
      to={link}
      className="bg-white p-4 shadow-inner border rounded-lg flex items-center space-x-4"
    >
      <span className="text-3xl">{icon}</span>
      <div>
        <h2 className="text-lg font-bold ">{title}</h2>
        <p className="text-sm text-gray-500">{value}</p>
      </div>
    </Link>
  );
}

NavCards.propTypes = {
  link: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
