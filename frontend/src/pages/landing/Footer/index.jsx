import styles from './styles.module.scss';

const Footer = () => {
    return (
        <div className={styles.wrapper}>
            <div className="container">
                <div className={styles.top}>
                    <div className={styles.left}>
                        <ul>
                            <a href="">About us</a>
                            <a href="">Membership</a>
                            <a href="">Articles</a>
                            <a href="">Recorces</a>
                        </ul>
                    </div>
                    <div className={styles.right}>Contact us</div>
                </div>
                <div className={styles.top} style={{ marginTop: 50 }}>
                    <div className={styles.left}>Copyright © 2024 IITU</div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
