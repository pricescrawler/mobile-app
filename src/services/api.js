import axios from "axios";

const source = axios.CancelToken.source();

export const baseURL="https://content-api.prices-crawler.duckdns.org/api/v1/";

const api = axios.create({
    baseURL:baseURL,

    cancelToken: source.token
});

export default api;