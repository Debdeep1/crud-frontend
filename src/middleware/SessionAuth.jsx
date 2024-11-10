import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const SessionAuth = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);

  const fetchRefreshToken = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/auth/refresh`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        console.log("Token refreshed successfully");
        return true;
      } else {
        console.error("Failed to refresh token:", response.statusText);
        return false;
      }
    } catch (error) {
      console.error("Error during token refresh:", error);
      return false;
    }
  };

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/auth/validate-token`,
          {
            method: "GET",
            credentials: "include", // Ensures cookies are sent
          }
        );
        if (response.ok) {
          setAuthenticated(true);
        } else if (response.status === 401) {
          const refreshSuccess = await fetchRefreshToken();
          if (refreshSuccess) {
            const retryResponse = await fetch(
              `${import.meta.env.VITE_REACT_APP_API_URL}/auth/validate-token`,
              {
                method: "GET",
                credentials: "include",
              }
            );
            setAuthenticated(retryResponse.ok);
          } else {
            setAuthenticated(false);
            setSessionExpired(true);
          }
        }
      } catch (error) {
        setAuthenticated(false);
        console.error("Error validating token:", error);
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    return <Navigate to="/signin" />;
  }
  if (sessionExpired) {
    return (
      <div className="modal">
        <div className="modal-content">
          <h2>Session Expired</h2>
          <p>Your session has expired. Please log in again.</p>
          <button onClick={() => (window.location.href = "/signin")}>
            Login
          </button>
        </div>
      </div>
    );
  }

  return <div>{children}</div>;
};

SessionAuth.propTypes = {
  children: PropTypes.node.isRequired,
};
export default SessionAuth;
