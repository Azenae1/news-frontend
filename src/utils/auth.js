import { baseUrl, headers, handleResponse } from "./api";

export const signUp = async (name, password, email) => {
  const res = await fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      name: "Yury",
      password: "123456",
      email: "test@mail.com",
    }),
  });
  return handleResponse(res);
};

export const signIn = async (email, password) => {
  const res = await fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      email: "test@mail.com",
      password: "123456",
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
  });
};
