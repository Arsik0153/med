import styles from './styles.module.scss';

const Subscription = () => {
    return (
        <div className={`${styles.wrapper} container`} id="pricing">
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
                    <h3 className={styles.priceYear}>
                        or <span>$99</span>/year
                    </h3>
                    <ul>
                        <li>Everything from Basic plan</li>
                        <li>
                            Access essential features and resources to kickstart
                            your health journey
                        </li>
                    </ul>
                    <button>Start now</button>
                </div>

                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Premium</h3>
                    <h4 className={styles.price}>
                        <span>$20</span> /month
                    </h4>
                    <h3 className={styles.priceYear}>
                        or <span>$229</span>/year
                    </h3>
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
