import axios from 'axios';


const apiClient = axios.create({
    baseURL: 'https://cinemaguide.skillbox.cc',
    withCredentials: true,
});

export default apiClient;


