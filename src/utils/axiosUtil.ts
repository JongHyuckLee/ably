import axios from "axios";

export const customAxios = (token?: string) => {
  const headers = { "Content-Type": "application/json" };

  if (token) {
    Object.assign(headers, {
      Authorization: `Bearer ${token}`,
    });
  }
  return axios.create({
    baseURL: "https://ably-frontend-assignment-server.vercel.app/",
    timeout: 3000,
    headers,
  });
};
