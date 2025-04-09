import axios from 'axios';

// axios 인스턴스
const serverDomain = 'https://port-0-learningmate-server-5r422alqajqbni.sel4.cloudtype.app';
const localDomain = 'http://localhost:8000';

const api = axios.create({
  baseURL: localDomain,
});

export default api;

// 배포 도메인 https://port-0-learningmate-server-5r422alqajqbni.sel4.cloudtype.app
