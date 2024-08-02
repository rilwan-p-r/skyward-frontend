import axios from "axios";

const BASE_URL = 'http://localhost:3000';
console.log('BaseUrl:',BASE_URL);
const Api = axios.create({
    baseURL:BASE_URL,
    withCredentials:true,
})
Api.defaults.headers.post['Content-Type'] = 'multipart/form-data';

export default Api; 