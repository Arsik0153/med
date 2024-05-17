import { ScrollRestoration } from 'react-router-dom';
import Footer from '../landing/Footer';
import Header from '../landing/Header';
import Subscription from '../landing/Subscription';
import styles from './styles.module.scss';

const Membership = () => {
    return (
        <div>
            <ScrollRestoration />
            <div className={styles.wrapper}>
                <div className={styles.overlay}></div>
                <Header />
                <div className={`${styles.hero} container`}>
                    <h1>
                        Unlock Your <span>Full Health Potential</span> with a
                        Membership
                    </h1>
                    <p>
                        Welcome to MedWise , your trusted partner in optimizing
                        your health journey. Our membership program offers
                        exclusive benefits tailored to empower you on your path
                        to wellness. Take charge of your health today and join
                        our community of like-minded individuals dedicated to
                        living healthier lives.
                    </p>
                </div>
            </div>
            <div className={`${styles.why} container`}>
                <div className={styles.bullet}>
                    <h3>Personalized Health Insights</h3>
                    <p>
                        Gain access to personalized health analyses based on
                        your unique profile, empowering you to make informed
                        decisions about your well-being.
                    </p>
                </div>
                <div className={styles.bullet}>
                    <h3>Comprehensive Reports</h3>
                    <p>
                        Receive in-depth reports on various aspects of your
                        health, including fitness levels, nutritional status,
                        stress management, and more.
                    </p>
                </div>
                <div className={styles.bullet}>
                    <h3>Expert Guidance</h3>
                    <p>
                        Benefit from expert guidance and recommendations from
                        our team of experienced health professionals, helping
                        you navigate your health journey with confidence.
                    </p>
                </div>
                <div className={styles.bullet}>
                    <h3>Exclusive Resources</h3>
                    <p>
                        Enjoy exclusive access to a wealth of resources,
                        including articles, videos, and tools designed to
                        support your health goals and enhance your knowledge.
                    </p>
                </div>
                <div className={styles.bullet}>
                    <h3>Community Support</h3>
                    <p>
                        Connect with a supportive community of members who share
                        your health goals, exchange insights, and motivate each
                        other to stay committed to healthier living.
                    </p>
                </div>
            </div>
            <Subscription />
            <Footer />
        </div>
    );
};

export default Membership;
