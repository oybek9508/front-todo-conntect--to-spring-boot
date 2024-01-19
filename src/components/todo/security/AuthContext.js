import { createContext, useContext, useState } from 'react';
import { apiClient } from '../api/ApiClient';
import { executeBasicAuthorizationService } from '../api/HelloWorldApiService';

//1: Create a Context
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

//2: Share the created context with other components
export default function AuthProvider({ children }) {
    //3: Put some state in the context
    const [token, setToken] = useState(null);
    const [username, setUsername] = useState(null);
    const [isAuthenticated, setAuthenticated] = useState(false);

    const login = async (username, password) => {
        const baToken = 'Basic ' + window.btoa(username + ':' + password);
        try {
            const res = await executeBasicAuthorizationService(baToken);
            if (res.status === 200) {
                setAuthenticated(true);
                setUsername(username);
                setToken(baToken);

                apiClient.interceptors.request.use((config) => {
                    console.log('intercepting and adding a token');
                    config.defaults.headers.common['Authorization'] = baToken;
                    return config;
                });

                return true;
            } else {
                logout();
                return false;
            }
        } catch (error) {
            console.log('error', error);
            logout();
            return false;
        }
    };

    function logout() {
        setAuthenticated(false);
        setUsername(null);
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, username, token }}>
            {children}
        </AuthContext.Provider>
    );
}
