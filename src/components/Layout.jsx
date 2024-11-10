import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen overflow-hidden bg-slate-100">
      <div className="flex flex-1 overflow-hidden shadow-md">
        <Sidebar />
        <div className="fixed top-0 left-0 right-0 z-10 bg-slate-600 shadow-md">
          <Navbar />
        </div>
        <div className="flex-1 p-2 bg-slate-100 overflow-hidden mt-[64px] h-[calc(100vh-65px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Layout;
