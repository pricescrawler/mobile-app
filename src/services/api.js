import axios from "axios";
import Constants from "expo-constants";

const source = axios.CancelToken.source();

export const baseURL=Constants.expoConfig.extra.api.domain+"api/v1/";

const api = axios.create({
    baseURL:baseURL,

    cancelToken: source.token
});

export default api;