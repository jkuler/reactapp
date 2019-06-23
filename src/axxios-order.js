import axios from 'axios';

const axiosOrder = axios.create({
    baseURL: 'https://reactstart-d077d.firebaseio.com/'
})

export default axiosOrder;