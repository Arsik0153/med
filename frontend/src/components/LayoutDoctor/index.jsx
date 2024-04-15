import styles from "./styles.module.scss";
import logoImg from "@assets/landing/logo.png";
import { useDoctor } from "../../api/useDoctor";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
    const [user] = useDoctor();
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
                        <a href="">Main</a>
                        <a href="">Profile</a>
                        <a href="">Articles</a>
                    </div>
                    <div className={styles.right} onClick={handleLogout}>
                        <div className={styles.profile}>
                            <span>{user.name}</span>
                            <span>{user.specialization_type}</span>
                        </div>
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
