import { useEffect, useState } from 'react';
import AuthContext from './authContext';
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom';


export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null);
    const [loading, setLoading] = useState(true);

    const BASE_TOKEN_ENDPOINT = 'http://localhost:8000/auth/token/';

    useEffect(() => {
        let interval = setInterval(() => {
            if (authTokens) {
                updateToken();
            }
        }, 1000 * 60 * 4);
        return () => clearInterval(interval);
    }, [loading, authTokens]);

    let loginUser = async (e) => {
        e.preventDefault();
        fetch(BASE_TOKEN_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': e.target.username.value,
                'password': e.target.password.value,
            })

        }).then(response => {
                if (response.ok) {
                    return response.json()
                    
                }
                else {
                    throw new Error(response.status)   
                }
            }).then(json => {
                setAuthTokens(json);
                setUser(jwt_decode(json.access));
                localStorage.setItem('authTokens', JSON.stringify(json));
                navigate('/');
            });
    };

    let logoutUser = () => {
        console.log("logging out")
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        navigate('/login')
    }

    let updateToken = async () => {
        fetch(BASE_TOKEN_ENDPOINT + 'refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'refresh': authTokens.refresh,
            })
        })
            .then(response => {
                if (!response.ok) {
                    logoutUser()
                }
                else {
                    return response.json()
                }
            })
            .then(json => {
                setAuthTokens(json);
                setUser(jwt_decode(json.access));
                localStorage.setItem('authTokens', JSON.stringify(json));
            });
    }

    let contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser, 
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}