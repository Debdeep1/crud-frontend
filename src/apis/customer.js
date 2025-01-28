export const fetchCustomers = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/customers/all`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching customers:", error);
  }
};

export const getSingleCustomer = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/customers/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }
    return data;
  } catch (error) {
    console.error("Error fetching customers:", error);
  }
};
export const fetchFilteredCustomers = async (
  startDate,
  endDate,
  customerField
) => {
  try {
    // Construct the query parameters
    const params = new URLSearchParams();
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    if (customerField) params.append("customerId", customerField);

    const response = await fetch(
      `${
        import.meta.env.VITE_REACT_APP_API_URL
      }/billings/filter?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch filtered customers");
    }

    return data;
  } catch (error) {
    console.error("Error fetching filtered customers:", error);
  }
};
