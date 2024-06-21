export const baseUrl = process.env.NODE_ENV === "http://localhost:3001";

export const headers = {
  "Content-Type": "application/json",
};

export const handleResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export function request(baseUrl, options) {
  return fetch(baseUrl, options).then(handleResponse);
}

export const getSavedNews = () => {
  const token = localStorage.getItem("token");

  return request(`${baseUrl}/articles`, {
    method: "GET",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  });
};
