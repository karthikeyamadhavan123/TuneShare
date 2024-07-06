import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    async function onLogout() {
        let token = localStorage.getItem('userToken')||localStorage.getItem('token');
     
        try {
            let response = await axios.post('http://localhost:5000/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
           
            if(response.status===200){navigate('/login')
                localStorage.removeItem('userToken') ; 
                localStorage.removeItem('token');
                localStorage.removeItem('userId')
                localStorage.removeItem('user_id');
                localStorage.removeItem('username');
                localStorage.removeItem('Username')
            }
        } catch (error) {
            console.error(error.response ? error.response.data : error.message);
        }
    }

    return (
        <div>
            <button onClick={onLogout}>Logout</button>
        </div>
    );
}

export default Logout;
