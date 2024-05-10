import { Link } from 'react-router-dom';
import Layout from '../../../components/Layout';
import styles from './styles.module.scss';
import monitoringImg from '@assets/monitoring.svg';
import { useQuery } from '@tanstack/react-query';
import { authApi } from '../../../api/api';

const getMyCheckups = async () => {
    const { data } = await authApi.get('/checkups/my');
    return data;
};

function formatDate(dateObj) {
    const date = new Date(dateObj);
    return date
        .toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })
        .replace(/\//g, '.');
}

const Monitoring = () => {
    const { data: checkups, isLoading } = useQuery({
        queryKey: ['checkups'],
        queryFn: getMyCheckups,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    return (
        <Layout>
            <h1 className={styles.title}>Monitoring</h1>

            <div className={styles.card}>
                <div className={styles.left}>
                    <div className={styles.left}>
                        <ul>
                            {checkups?.map((checkup) => (
                                <li key={checkup.id}>
                                    <span>
                                        {checkup.name}{' '}
                                        <p>{formatDate(checkup.date)}</p>
                                    </span>
                                    <Link
                                        to={`/cabinet/monitoring/view/${checkup.id}`}
                                    >
                                        <button>Continue</button>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className={styles.right}>
                    <img src={monitoringImg} alt="monitoring illustration" />
                </div>
            </div>
        </Layout>
    );
};

export default Monitoring;
