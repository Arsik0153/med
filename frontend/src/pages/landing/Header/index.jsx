import styles from './styles.module.scss';
import logo from '@assets/landing/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <div className={`${styles.container} container`}>
                <div className={styles.left}>
                    <Link to="/">
                        <img src={logo} className={styles.logo} />
                    </Link>
                    <ul>
                        <a href="/#dha">What is DHA</a>
                        <a href="/#features">Features</a>
                        <a href="/#aboutus">About us</a>
                        <a href="/#pricing">Pricing</a>
                    </ul>
                </div>
                <div className={styles.controls}>
                    <Link to="/login">
                        <button className={styles.inverted}>Log in</button>
                    </Link>
                    <Link to="/signup">
                        <button>Sign up</button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Header;
