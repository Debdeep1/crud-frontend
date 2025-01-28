export const addBillingApi = async (billingData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/billings/add`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(billingData),
      }
    );
    const data = await response.json();

    if (!response.ok) {
      return null;
    }
    return data;
  } catch (error) {
    console.error("Error adding billing data:", error);
  }
};

export const fetchBillingObjectApi = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/billings/find/${id}`,
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
      return null;
    }
    return data;
  } catch (error) {
    console.error("Error fetching customers:", error);
  }
};
