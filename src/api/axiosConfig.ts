import axios from "axios";

const BASE_URL = 'http://localhost:3000';
console.log('BaseUrl:',BASE_URL);
const Api = axios.create({baseURL:BASE_URL})

export default Api; 