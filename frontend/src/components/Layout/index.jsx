import styles from './styles.module.scss';
import logoImg from '@assets/landing/logo.png';
import { useUser } from '../../api/useUser';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useOutsideClick } from '../../utils/useOutsideClick';
import { useQueryClient } from '@tanstack/react-query';

const Layout = ({ children }) => {
    const [user] = useUser();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const ref = useOutsideClick(() => {
        setDropdownVisible(false);
    });

    const handleLogout = () => {
        localStorage.removeItem('TOKEN');
        queryClient.invalidateQueries();
        navigate('/');
    };

    if (!user) return null;

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <header className={styles.header}>
                    <div className={styles.left}>
                        <Link to="/cabinet">
                            <img src={logoImg} alt="" />
                        </Link>
                        <Link to="/about-us" className={styles.innerLink}>
                            about us
                        </Link>
                        <a href="" className={styles.innerLink}>
                            FAQ
                        </a>
                        <a href="" className={styles.innerLink}>
                            subscription
                        </a>
                    </div>
                    <div
                        className={styles.right}
                        onClick={() => setDropdownVisible(!dropdownVisible)}
                        ref={ref}
                    >
                        {user.name}
                        <img
                            src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
                            alt=""
                            className={styles.avatar}
                        />
                        {dropdownVisible && (
                            <ul className={styles.dropdownMenu}>
                                <li>
                                    <button onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        )}
                    </div>
                </header>
                <main className={styles.main}>{children}</main>
            </div>

            <div className={styles.overlay} />
        </div>
    );
};

export default Layout;
