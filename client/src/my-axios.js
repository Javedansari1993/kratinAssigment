import axios from "axios";

const baseUrl = process.env.BASE_URL || "http://localhost:5000/"

// "https://apponitment-app.vercel.app/"

const myAxios = axios.create({
    baseURL: baseUrl
  });


export default myAxios