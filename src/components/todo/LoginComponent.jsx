import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './security/AuthContext';

const LoginComponent = () => {
    const [username, setUsername] = useState('oybek');

    const [password, setPassword] = useState('');

    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const navigate = useNavigate();

    const authContext = useAuth();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async () => {
        if (await authContext.login(username, password)) {
            navigate(`/welcome/${username}`);
        } else {
            setShowErrorMessage(true);
        }
    };

    return (
        <div className='Login'>
            <h1>Time to Login!</h1>
            {showErrorMessage && (
                <div className='errorMessage'>Authentication Failed. Please check your credentials.</div>
            )}
            <div className='LoginForm'>
                <div>
                    <label>User Name:</label>
                    <input type='text' name='username' value={username} onChange={handleUsernameChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type='password' name='password' value={password} onChange={handlePasswordChange} />
                </div>
                <div>
                    <button type='button' name='login' onClick={handleSubmit}>
                        login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
