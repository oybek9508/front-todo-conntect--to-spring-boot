import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { retrieveHelloWorldPathVariable } from './api/HelloWorldApiService';
import { useAuth } from './security/AuthContext';

function WelcomeComponent() {
    const { username } = useParams();
    const [message, setMessage] = useState(null);
    const authContext = useAuth();
    const { token } = authContext;

    // const callHelloWorldRestApi = async () => {
    //     try {
    //         const res = await retrieveHelloWorldBean();
    //         setMessage(res.data);
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };

    const callHelloWorldPathVariable = async () => {
        try {
            if (!!username) {
                const res = await retrieveHelloWorldPathVariable(username, token);
                setMessage(res.data.message);
            } else {
                console.log('username is null');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='WelcomeComponent'>
            <h1>Welcome {username}</h1>
            <div>
                Manage your todos - <Link to='/todos'>Go here</Link>
            </div>
            <div>
                <button className='btn btn-success m-5' onClick={callHelloWorldPathVariable}>
                    Call Hello World
                </button>
            </div>
            <div className='text-info'>{message}</div>
        </div>
    );
}

export default WelcomeComponent;
