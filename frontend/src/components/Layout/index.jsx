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
        window.location.reload();
    };

    if (!user) return null;
    const avatarUrl =
        user.gender === 'male'
            ? 'https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg'
            : 'https://as1.ftcdn.net/v2/jpg/04/02/27/22/1000_F_402272249_4sGcMQdpo4SL8JGG9q1Ep3PvVuIoOvOJ.jpg';

    const plan = user.subscription?.plan || 'Basic';

    const capitalizedPlan = plan.charAt(0).toUpperCase() + plan.slice(1);

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <header className={styles.header}>
                    <div className={styles.left}>
                        <Link to="/cabinet">
                            <img src={logoImg} alt="" />
                        </Link>
                        <Link to="/about-us" className={styles.innerLink}>
                            About us
                        </Link>
                        <a href="" className={styles.innerLink}>
                            FAQ
                        </a>
                        <Link
                            to="/cabinet/settings"
                            className={styles.innerLink}
                        >
                            Settings
                        </Link>
                    </div>
                    <div
                        className={styles.right}
                        onClick={() => setDropdownVisible(!dropdownVisible)}
                        ref={ref}
                    >
                        <div className={styles.profile}>
                            <span>{user.name}</span>
                            <span>{capitalizedPlan} plan</span>
                        </div>
                        <img src={avatarUrl} alt="" className={styles.avatar} />
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
