import { useState } from 'react';
import { useUser } from '../../../api/useUser';
import ConfirmModal from './confirm-modal';
import styles from './styles.module.scss';

const Subscription = () => {
    const [{ subscription }] = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const [newPlan, setNewPlan] = useState();
    const expirationDate = new Date(
        subscription?.expirationDate
    ).toLocaleDateString();

    console.log(subscription);

    const handleNewPlanClick = (plan) => {
        setNewPlan(plan);
        setIsOpen(true);
    };

    return (
        <div className={styles.inner}>
            <h1>Subscription</h1>
            <h2 style={{ marginTop: 50, marginBottom: -30 }}>Current plan</h2>
            <div className={styles.grid}>
                <CurrentPlan
                    plan={subscription?.plan}
                    expirationDate={expirationDate}
                />
            </div>
            <ConfirmModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                newPlan={newPlan}
            />
            <h2 style={{ marginTop: 50, marginBottom: -30 }}>
                Available plans
            </h2>
            <div className={styles.grid}>
                <OtherPlans
                    plan={subscription?.plan}
                    handleNewPlanClick={handleNewPlanClick}
                />
            </div>
        </div>
    );
};

export default Subscription;

const CurrentPlan = ({ plan, expirationDate }) => {
    if (plan === null || plan === undefined || plan === 'basic')
        return (
            <div className={styles.cardSub}>
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
            </div>
        );

    if (plan === 'standard')
        return (
            <div className={styles.cardSub}>
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
                <span>Expiration date: {expirationDate}</span>
            </div>
        );

    if (plan === 'premium')
        return (
            <div className={styles.cardSub}>
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
                <span>Expiration date: {expirationDate}</span>
            </div>
        );
};

const OtherPlans = ({ plan, handleNewPlanClick }) => {
    if (plan === 'basic' || plan === null || plan === undefined)
        return (
            <>
                <div className={styles.cardSub}>
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
                    <button onClick={() => handleNewPlanClick('standard')}>
                        Switch
                    </button>
                </div>

                <div className={styles.cardSub}>
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
                    <button onClick={() => handleNewPlanClick('premium')}>
                        Switch
                    </button>
                </div>
            </>
        );
    if (plan === 'standard')
        return (
            <>
                <div className={styles.cardSub}>
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
                    <button onClick={() => handleNewPlanClick('basic')}>
                        Switch
                    </button>
                </div>
                <div className={styles.cardSub}>
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
                    <button onClick={() => handleNewPlanClick('premium')}>
                        Switch
                    </button>
                </div>
            </>
        );

    if (plan === 'premium')
        return (
            <>
                <div className={styles.cardSub}>
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
                    <button onClick={() => handleNewPlanClick('basic')}>
                        Switch
                    </button>
                </div>
                <div className={styles.cardSub}>
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
                    <button onClick={() => handleNewPlanClick('standard')}>
                        Switch
                    </button>
                </div>
            </>
        );
};
