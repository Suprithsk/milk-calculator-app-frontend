import { useState } from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import { signin } from '../../apis/authApi';

function Login() {
    const navigate=useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
        try {
            const response = await signin(formData);
            console.log(response);
            localStorage.setItem('token', response.data.token)
            navigate('/')
        }catch(e){
            console.log(e)
        }
    };

    return (
        <div className={styles.login_page}>
            <form className={styles.login_form} onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className={styles.form_main}>
                    <div className={styles.form_group}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.submit_button}>Login</button>
                    <div className={styles.existing_user}>
                        <p>New user?</p>
                        <Link to='/signup' className={styles.signin_link}>Sign Up</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;