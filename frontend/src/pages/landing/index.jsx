import styles from './styles.module.scss';
import Header from './Header';
import Hero from './Hero';
import Whatis from './Whatis';
import Features from './Features';
import Embark from './Embark';
import Subscription from './Subscription';
import Footer from './Footer';

const LandingPage = () => {
    return (
        <div>
            <div className={styles.wrapper}>
                <div className={styles.overlay}></div>
                <Header />
                <Hero />
            </div>
            <Whatis />
            <Features />
            <Embark />
            <Subscription />
            <Footer />
        </div>
    );
};

export default LandingPage;
