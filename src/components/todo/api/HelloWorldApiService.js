import { apiClient } from './ApiClient';

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
export const retrieveHelloWorldPathVariable = async (username, token) => {
    try {
        const res = apiClient.get(`/hello-world/path-variable/${username}`, {
            // headers: {
            //     Authorization: token,
            // },
        });
        return res;
    } catch (error) {
        console.log('error', error);
        throw error;
    }
};

export const executeBasicAuthorizationService = async (token) =>
    await apiClient.get('/basicauth', {
        // headers: {
        //     Authorization: token,
        // },
    });
