import Layout from '../../../components/Layout';
import styles from './styles.module.scss';
import settingsIcon from '@assets/settings.svg';
import paymentIcon from '@assets/payment.svg';
import { useState } from 'react';
import Subscription from './subscription';
import Privacy from './privacy';

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('subscription');

    return (
        <Layout>
            <h1 className={styles.title}>Settings</h1>
            <div className={styles.card}>
                <div className={styles.sidebar}>
                    <div
                        className={`${styles.sidebarItem} ${
                            activeTab === 'subscription' ? styles.active : ''
                        }`}
                        onClick={() => setActiveTab('subscription')}
                    >
                        <img src={paymentIcon} alt="Subscription" />
                        <span>Subscription</span>
                    </div>
                    <div
                        className={`${styles.sidebarItem} ${
                            activeTab === 'privacy' ? styles.active : ''
                        }`}
                        onClick={() => setActiveTab('privacy')}
                    >
                        <img src={settingsIcon} alt="Privacy settings" />
                        <span>Privacy settings</span>
                    </div>
                </div>
                {activeTab === 'subscription' && <Subscription />}
                {activeTab === 'privacy' && <Privacy />}
            </div>
        </Layout>
    );
};

export default SettingsPage;
