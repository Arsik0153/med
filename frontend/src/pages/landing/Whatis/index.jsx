import styles from './styles.module.scss';

const Whatis = () => {
    return (
        <div className={`${styles.wrapper} container`}>
            <div className={styles.card}>
                <h2>
                    What is <span>Digital Healthcare Analyst ?</span>
                </h2>
                <p>
                    In today's rapidly evolving healthcare landscape, data has
                    become the cornerstone of informed decision-making, patient
                    care, and system efficiency. Our Digital Healthcare Analyst
                    System is at the forefront of this revolution, providing
                    healthcare professionals with the tools they need to harness
                    the full potential of digital data.Our Digital Healthcare
                    Analyst System is a comprehensive platform that seamlessly
                    integrates with your existing healthcare infrastructure. It
                    empowers you to:
                </p>
            </div>
        </div>
    );
};

export default Whatis;
