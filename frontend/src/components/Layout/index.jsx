import styles from "./styles.module.scss";
import logoImg from "@assets/landing/logo.png";
import { useUser } from "../../api/useUser";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
    const [user] = useUser();

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    if (!user) return null;

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <header className={styles.header}>
                    <div className={styles.left}>
                        <img src={logoImg} alt="" />
                        <a href="">about us</a>
                        <a href="">FAQ</a>
                        <a href="">subscription</a>
                    </div>
                    <div className={styles.right} onClick={handleLogout}>
                        {user.name}
                        <img
                            src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
                            alt=""
                            className={styles.avatar}
                        />
                    </div>
                </header>
                <main className={styles.main}>{children}</main>
            </div>

            <div className={styles.overlay} />
        </div>
    );
};

export default Layout;
