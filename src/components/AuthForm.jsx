import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AuthForm({ type }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    const apiUrl =
      type === "signin"
        ? `${import.meta.env.VITE_REACT_APP_API_URL}/auth/signin`
        : `${import.meta.env.VITE_REACT_APP_API_URL}/auth/signup` ;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      console.log("API DATA::", data);
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
    <div className="mx-auto bg-white p-8 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">
        {type === "signin" ? "Login" : "Sign Up"}
      </h1>

      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter password"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {type === "signin" ? "Login" : "Sign Up"}
        </button>

        <div className="text-sm mt-4">
          {type === "signin" ? "Not a user? " : "Already a user?"}
          <a
            href={type === "signin" ? "/signup" : "/signin"}
            className="text-blue-500 hover:text-blue-600"
          >
            {type === "signin" ? "Sign Up" : "Login"}
          </a>
        </div>
      </form>
    </div>
  );
}
