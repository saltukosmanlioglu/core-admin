import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/`,
  timeout: 15000,
});

export default instance;