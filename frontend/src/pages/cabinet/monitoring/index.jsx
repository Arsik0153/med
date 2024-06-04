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
    const { data: checkups } = useQuery({
        queryKey: ['monitoring'],
        queryFn: getMyCheckups,
        refetchOnMount: true,
    });

    return (
        <Layout>
            <h1 className={styles.title}>Monitoring</h1>

            <div className={styles.card}>
                <div className={styles.left}>
                    {checkups?.length === 0 && (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                            }}
                        >
                            <h2 style={{ margin: 0, opacity: 0.2 }}>
                                There are no monitoring records yet
                            </h2>
                        </div>
                    )}
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
