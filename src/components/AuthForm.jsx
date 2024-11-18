import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AuthForm({ type }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (type === "signup" && formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    const apiUrl =
      type === "signin"
        ? `${import.meta.env.VITE_REACT_APP_API_URL}/auth/signin`
        : `${import.meta.env.VITE_REACT_APP_API_URL}/auth/signup`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error("Something went wrong");
        throw new Error(data.message || "Something went wrong");
      }

      toast.success(
        `${type === "signin" ? "Signed in" : "Signed up"} successfully!`
      );
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message || "Something went wrong");
    }
  };

  return (
    <div className="mx-auto bg-white p-2 shadow-sm rounded-lg w-[500px] border">
      <div className="mx-auto bg-white p-8 shadow-inner rounded-lg border">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-medium mb-2 ">
            {type === "signin" ? "Welcome Back" : "Create Your Account"}
          </h1>
          <span className="text-gray-400 font-light">
            {type === "signin"
              ? "Enter your credentials to access account"
              : "Enter your details to create an account"}
          </span>
        </div>

        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-600 text-sm font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <div className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="grow"
                placeholder="abc@example.com"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-600 text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="grow"
                placeholder="********"
                required
              />
            </div>
          </div>

          {type === "signup" && (
            <div className="mb-4">
              <label
                className="block text-gray-600 text-sm font-medium mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <div className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="grow"
                  placeholder="Enter the password again"
                  required
                />
              </div>
            </div>
          )}

          <button type="submit" className="btn btn-primary w-full">
            {type === "signin" ? "Login" : "Sign Up"}
          </button>

          <div className="text-sm mt-4">
            {type === "signin" ? "Not a user? " : "Already a user? "}
            <a
              href={type === "signin" ? "/signup" : "/signin"}
              className="text-blue-500 hover:text-blue-600"
            >
              {type === "signin" ? "Sign Up" : "Login"}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
AuthForm.propTypes = {
  type: PropTypes.string.isRequired,
};
