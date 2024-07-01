import { baseUrl, headers, handleResponse } from "./api";

// export const signUp = async (name, password, email) => {
//   const res = await fetch(`${baseUrl}/signup`, {
//     method: "POST",
//     headers: headers,
//     body: JSON.stringify({
//       name,
//       password,
//       email,
//     }),
//   });
//   return handleResponse(res);
// };

// export const signIn = async (email, password) => {
//   const res = await fetch(`${baseUrl}/signin`, {
//     method: "POST",
//     headers: headers,
//     body: JSON.stringify({
//       email,
//       password,
//     }),
//   });
//   return handleResponse(res);
// };

// export const checkToken = (token) => {
//   return fetch(`${baseUrl}/users/me`, {
//     method: "GET",
//     headers: {
//       ...headers,
//       authorization: `Bearer ${token}`,
//     },
//   });
// };

//Simulation

export const signUp = (email, password) => {
  return new Promise((resolve, reject) => {
    resolve({ token: "a fake token" });
  });
};

export const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    resolve({
      data: { name: "fake user", email: "fake@example,com", id: "fake-id" },
    });
  });
};

export const signIn = (email, password, name) => {
  return new Promise((resolve, reject) => {
    resolve({
      data: { name: "fake user", email: "fake@example.com", id: "fake-id" },
    });
  });
};
