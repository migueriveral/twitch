import {useState} from 'react';
import logo from '../logo.svg';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export default function Auth() {
    const [cookies, setCookie, removeCookie] = useCookies(['user']); 
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(null);

    const handleSubmit = async (endpoint) => {
        if(!isLogin && password !== confirmPassword) {
            setError(true);
        }
        const res = await axios.post(`http://localhost:8000/${endpoint}`, {
            username,
            password
        });

        setCookie('Name', res.data.username);
        setCookie('HashedPassword', res.data.hashedPassword);
        setCookie('UserId', res.data.userId);
        setCookie('AuthToken', res.data.token);

        window.location.reload();
    }

    return (
        <div className="auth-container">
            <div className="auth-container-box">
                <div className="auth-container-form">
                    <input 
                        type="text"
                        id="username"
                        name="username"
                        placeholder="username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input 
                        type="password"
                        id="password-check"
                        name="password-check"
                        placeholder={!isLogin ? "Confirm password" : ""}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={isLogin ? true : false}
                    />
                    {error && <p>Make sure your passwords match</p>}
                    <button 
                        className="standard-button"
                        onClick={() => handleSubmit(isLogin ? 'login' : 'signup')}>{isLogin ? "GO!" : "Sign Up"}
                    </button>
                    <div className="auth-options">
                        <button 
                            style={{ backgroundColor: isLogin ? "#14080E" : "#151a1f"}}
                            onClick={() => setIsLogin(false)}>Sign Up</button>
                        <button 
                            style={{ backgroundColor: isLogin ? "#151a1f" : "#14080E"}}
                            onClick={() => setIsLogin(true)}>Log In</button>
                    </div>
                </div>
            </div>
        </div>
    )
};