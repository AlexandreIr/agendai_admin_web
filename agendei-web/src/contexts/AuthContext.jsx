/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

const AuthProvider = ({ children}) =>{
    const [user, setUser] = useState()
    const navigate = useNavigate();

    useEffect(()=>{
        const userData = localStorage.getItem('user')
        if(userData){
            setUser(JSON.parse(userData))
        } else {
            navigate('/');
        }
    },[navigate]);

    const login = (userData) =>{
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/appointments');
    }

    const logout = () =>{
        setUser(null);
        localStorage.removeItem('user');
        navigate('/');
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth }