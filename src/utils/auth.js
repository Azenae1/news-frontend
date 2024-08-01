import { baseUrl, headers, handleResponse } from "./api";

export const signUp = async (email, password, name) => {
  const res = await fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  });
  return handleResponse(res);
};

export const signIn = async (email, password) => {
  const res = await fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      email,
      password,
    }),
  });
  return handleResponse(res);
};

export const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to check token");
    }
    return res.json();
  });
};

//Simulation

// export const signIn = (email, password) => {
//   return new Promise((resolve, reject) => {
//     resolve({ token: "a fake token" });
//   });
// };

// export const checkToken = (token) => {
//   return new Promise((resolve, reject) => {
//     resolve({
//       data: { name: "fake user", email: "fake@example,com", id: "fake-id" },
//     });
//   });
// };

// export const signUp = (email, password, name) => {
//   return new Promise((resolve, reject) => {
//     resolve({
//       data: { name: "fake user", email: "fake@example.com", id: "fake-id" },
//     });
//   });
// };
