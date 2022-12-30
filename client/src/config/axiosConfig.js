/* eslint-disable no-undef */
import axios from 'axios';

const baseURL = process.env.REACT_APP_SERVER_BASE_URL;
const instance = axios.create({
    baseURL: `${baseURL}`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;
