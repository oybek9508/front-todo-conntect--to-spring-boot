import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
});

export const retrieveHelloWorldBean = async () => {
    try {
        const res = await apiClient.get('/hello-world-bean');
        return res;
    } catch (error) {
        console.log('error', error);
        throw error;
    }
};

//Response to preflight request doesn't pass access control check => Authorization header
export const retrieveHelloWorldPathVariable = async (username) => {
    try {
        const res = apiClient.get(`/hello-world/path-variable/${username}`);
        return res;
    } catch (error) {
        console.log('error', error);
        throw error;
    }
};
