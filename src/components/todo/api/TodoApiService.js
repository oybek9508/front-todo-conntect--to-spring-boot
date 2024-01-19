import { apiClient } from './ApiClient';

export const retrieveAllTodosForUsernameApi = (username) =>
    apiClient.get(`/users/${username}/todos`, {
        // headers: {
        //     Authorization: 'Basic b3liZWs6b3liZWs=',
        // },
    });

export const deleteTodoApi = (username, id) =>
    apiClient.delete(`/users/${username}/todos/${id}`, {
        // headers: {
        //     Authorization: 'Basic b3liZWs6b3liZWs=',
        // },
    });

export const retrieveTodoApi = (username, id) => apiClient.get(`/users/${username}/todos/${id}`);

export const updateTodoApi = (username, id, todo) => apiClient.put(`/users/${username}/todos/${id}`, todo);

export const createTodoApi = (username, todo) => apiClient.post(`/users/${username}/todos`, todo);
