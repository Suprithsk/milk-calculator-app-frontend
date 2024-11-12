import { useState } from 'react';
import styles from './Register.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import { signup } from '../../apis/authApi';


function Register() {
    const navigate= useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: ''
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
            const response = await signup(formData);
            console.log(response);
            navigate('/signin')
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.register_page}>
            <form className={styles.register_form} onSubmit={handleSubmit}>
                <h2>Register</h2>
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
                    <div className={styles.form_group}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.submit_button}>Register</button>
                    <div className={styles.existing_user}>
                        <p>Already have an account?</p>
                        <Link to='/signin' className={styles.signin_link}>Sign In</Link>
                    </div>
                </div>
                
            </form>
        </div>

    );
}

export default Register;