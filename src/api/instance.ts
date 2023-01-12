import axios from 'axios';
import apis from './url';

const instance = axios.create({
  baseURL: apis.BASE_URL,
});

export default instance;
