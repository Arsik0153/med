import styles from './styles.module.scss';
import healthCareImg from '@assets/healthcare.svg';

const AboutUs = () => {
    return (
        <div className="container" id="aboutus">
            <div className={styles.card}>
                <div className={styles.text}>
                    <h1>About us</h1>
                    <p>
                        Our website is dedicated to providing top-quality
                        healthcare services to our valued clients. We offer a
                        range of medical services to help you monitor and
                        maintain your health. From routine check-ups and
                        preventative care to specialized treatment plans, our
                        goal is to ensure that every patient receives
                        personalized and comprehensive care.
                        <br /> <br />
                        Our online platform allows you to easily schedule
                        appointments with our doctors, access your medical
                        records, and even request prescription refills. Our
                        state-of-the-art facilities are equipped with the latest
                        technology to provide accurate and efficient check-up
                        analysis.
                        <br /> <br />
                        At our clinic, we prioritize patient comfort and safety,
                        and our team of medical professionals are committed to
                        delivering compassionate care and support to all of our
                        clients. We strive to create a welcoming and inclusive
                        environment for everyone who walks through our doors.
                        <br /> <br />
                        Trust us with your healthcare needs and let us help you
                        live a healthier, happier life.
                    </p>
                </div>
                <div>
                    <img src={healthCareImg} alt="" />
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
