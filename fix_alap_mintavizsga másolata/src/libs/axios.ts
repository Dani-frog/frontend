import axios from 'axios'

const axiosClient = axios.create({
  baseURL: "http://172.22.1.219",
  headers: {
    identifier: "toth.daniel", //Mindekinek a saját Kréta azonosítója
  }
});

  export default axiosClient