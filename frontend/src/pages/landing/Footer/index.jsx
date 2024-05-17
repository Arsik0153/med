import { Link } from 'react-router-dom';
import logo from '@assets/landing/logo.png';
import styles from './styles.module.scss';
import { useState } from 'react';
import { api } from './../../../api/api';
import { toast } from 'react-hot-toast';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [text, setText] = useState('');

    const handleSubmit = async () => {
        try {
            await api.post('/contacts', {
                email,
                message: text,
            });

            toast.success('Message sent successfully');
            setEmail('');
            setText('');
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong. Please try again later');
        }
    };
    return (
        <div className={styles.wrapper}>
            <div className="container">
                <div className={styles.top}>
                    <div className={styles.left}>
                        <ul>
                            <Link to="/">
                                <img src={logo} alt="" />
                            </Link>
                            <Link to="/membership">Membership</Link>
                            <Link to="/articles">Articles</Link>
                            <Link to="/resources">Resources</Link>
                        </ul>
                    </div>
                </div>
                <div className={styles.contact}>
                    Contact us
                    <input
                        type="email"
                        name="email"
                        placeholder="example@mail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <textarea
                        name="text"
                        placeholder="Text your message"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    ></textarea>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
                <div className={styles.top} style={{ marginTop: 50 }}>
                    <div className={styles.left}>Copyright © 2024 IITU</div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
