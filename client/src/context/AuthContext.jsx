import { createContext, useContext, useState, useEffect } from 'react';
import API from '../api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            API.get('/auth/me')
                .then(res => setAdmin(res.data))
                .catch(() => {
                    localStorage.removeItem('adminToken');
                    setAdmin(null);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        const res = await API.post('/auth/login', { email, password });
        localStorage.setItem('adminToken', res.data.token);
        setAdmin(res.data);
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        setAdmin(null);
    };

    return (
        <AuthContext.Provider value={{ admin, loading, login, logout, isAuthenticated: !!admin }}>
            {children}
        </AuthContext.Provider>
    );
};
