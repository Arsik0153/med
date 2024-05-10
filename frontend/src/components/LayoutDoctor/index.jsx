import styles from './styles.module.scss';
import logoImg from '@assets/landing/logo.png';
import { useDoctor } from '../../api/useDoctor';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useOutsideClick } from '../../utils/useOutsideClick';

const Layout = ({ children }) => {
    const [user] = useDoctor();
    const navigate = useNavigate();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const ref = useOutsideClick(() => {
        setDropdownVisible(false);
    });

    const handleLogout = () => {
        localStorage.removeItem('TOKEN');
        navigate('/');
    };

    if (!user) return null;

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <header className={styles.header}>
                    <div className={styles.left}>
                        <img src={logoImg} alt="" />
                        <a href="" className={styles.innerLink}>
                            Main
                        </a>
                        <a href="" className={styles.innerLink}>
                            Profile
                        </a>
                        <a href="" className={styles.innerLink}>
                            Articles
                        </a>
                    </div>
                    <div
                        className={styles.right}
                        onClick={() => setDropdownVisible(!dropdownVisible)}
                        ref={ref}
                    >
                        <div className={styles.profile}>
                            <span>{user.name}</span>
                            <span>{user.specialization_type}</span>
                        </div>
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
