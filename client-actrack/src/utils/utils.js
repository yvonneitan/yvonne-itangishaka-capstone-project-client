// navigation function
export const handleNav = (navigation, path) => {
  navigation(path);
};

// api
const BASE_URL = "http://localhost:8080/api";

export async function fetchData(endpoint, options = {}) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
}
