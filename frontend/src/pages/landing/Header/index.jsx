import styles from "./styles.module.scss";
import logo from "@assets/landing/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <>
            <div className={`${styles.container} container`}>
                <div className={styles.left}>
                    <img src={logo} className={styles.logo} />
                    <ul>
                        <a href="">About us</a>
                        <a href="">Membership</a>
                        <a href="">Articles</a>
                        <a href="">Recorces</a>
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
