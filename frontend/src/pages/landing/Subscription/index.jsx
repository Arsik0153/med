import styles from './styles.module.scss';

const Subscription = () => {
    return (
        <div className={`${styles.wrapper} container`}>
            <h2 className={styles.title}>
                Choose Your <span>Subscription</span> Plan
            </h2>

            <div className={styles.grid}>
                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Basic</h3>
                    <h4 className={styles.price}>
                        <span>$0</span> /month
                    </h4>
                    <ul>
                        <li>Data Aggregation and Integration</li>
                        <li>Real-Time Analytics</li>
                        <li>Customized Dashboards</li>
                        <li>Clinical Decision Support</li>
                        <li>Mobile Access</li>
                        <li>Data Security and Compliance</li>
                        <li>24/7 Customer Support</li>
                    </ul>
                    <button>Start now</button>
                </div>

                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Standard</h3>
                    <h4 className={styles.price}>
                        <span>$10</span> /month
                    </h4>
                    <ul>
                        <li>Data Aggregation and Integration</li>
                        <li>Real-Time Analytics</li>
                        <li>Customized Dashboards</li>
                        <li>Clinical Decision Support</li>
                        <li>Mobile Access</li>
                        <li>Data Security and Compliance</li>
                        <li>24/7 Customer Support</li>
                    </ul>
                    <button>Start now</button>
                </div>

                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Pro</h3>
                    <h4 className={styles.price}>
                        <span>$30</span> /month
                    </h4>
                    <ul>
                        <li>Data Aggregation and Integration</li>
                        <li>Real-Time Analytics</li>
                        <li>Customized Dashboards</li>
                        <li>Clinical Decision Support</li>
                        <li>Mobile Access</li>
                        <li>Data Security and Compliance</li>
                        <li>24/7 Customer Support</li>
                    </ul>
                    <button>Start now</button>
                </div>
            </div>
        </div>
    );
};

export default Subscription;
