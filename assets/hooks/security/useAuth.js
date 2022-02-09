import axios from "axios";
import { useState } from "react";

const useAuth = () => {
    const [userState, setUserState] = useState(() => {
        const savedUser = localStorage.getItem('user');
        const connectedUser = JSON.parse(savedUser);
        let initialState = {};
        if (connectedUser) {
            initialState = {
                userConnected: true,
                userData: connectedUser
            }
        } else {
            initialState = {
                userConnected: false,
                userData: undefined
            }
        }
        return initialState;
    });

    function isGranted(role) {
        if (userState.userConnected) {
            if (userState.userData.roles.includes(role)) {
                return true;
            }
        }
        return false;
    }

    async function login(credentials) {
        const result = await axios.post('http://localhost:8000/api/login_check', credentials);
        localStorage.setItem('user', JSON.stringify(result.data));
        setUserState({
            userConnected: true,
            userData: result.data
        });
    }

    function logout() {
        localStorage.removeItem('user');
        setUserState({
            userConnected: false,
            userData: undefined
        });
    }

    return [userState, login, logout, isGranted];
}


export default useAuth;