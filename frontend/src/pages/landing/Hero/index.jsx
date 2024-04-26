import styles from './styles.module.scss';
import heroImg from '@assets/landing/hero.png';

const Hero = () => {
    return (
        <div className={`${styles.container} container`}>
            <div className={styles.left}>
                <h1 className={styles.heading}>
                    Take Care of <br />
                    <span>Your</span> Health Here
                </h1>
                <p className={styles.text}>
                    Welcome to the world of digital healthcare analysis! We are
                    thrilled to have you on board as a Digital Healthcare
                    Analyst, and we believe that you are about to embark on an
                    exciting journey of innovation and impact.
                </p>
                <button className={styles.button}>Get started</button>
            </div>
            <div className={styles.right}>
                <img src={heroImg} alt="" />
            </div>
        </div>
    );
};

export default Hero;
