import axios from "axios";
import { refreshTokenAxiosInterceptors } from "./interceptors/refreshTokenInterceptor";
const BASE_URL = import.meta.env.VITE_SOCKET_SERVER_URL;
console.log('BaseUrl:', BASE_URL);

const Api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,

});
refreshTokenAxiosInterceptors(Api);
export default Api;
