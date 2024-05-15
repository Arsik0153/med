import React, { useState } from 'react';
import Layout from '../../../../components/Layout';
import styles from './styles.module.scss';
import { authApi } from '../../../../api/api';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import rectImg from '@assets/rect.png';
import ChatGPT from '../../../../components/Chatgpt';
import monImg from '@assets/mon.svg';
import { getRecommendationByKey, recommendations } from './recommendations';

const getMyCheckup = async (id) => {
    const { data } = await authApi.get(`/checkups/${id}`);
    return data;
};

function calculatePercentage(percentage, total) {
    if (percentage < 0 || percentage > 100) {
        return 'Invalid percentage value. Please enter a value between 0 and 100.';
    }

    const result = (percentage / 100) * total;
    return result;
}

export const KEYS = {
    vitamin_d3: 'Vitamine D3',
    vitamin_d2: 'Vitamine D2',
    vitamin_c: 'Vitamine C',
    vitamin_a: 'Vitamine A',
    pushups: 'Pushups',
    squats: 'Squats',
    press: 'Press',
    bench_press: 'Bench Press',
    blood: 'Blood test',
    blood_oxygen_level: 'Blood oxygen level',
    body_temperature: 'Body temperature',
    pulse: 'Pulse',
};

const ViewCheckup = () => {
    const { id } = useParams();

    const { data: checkup, refetch } = useQuery({
        queryKey: ['checkups', id],
        queryFn: () => getMyCheckup(id),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
    const [message, setMessage] = useState('');

    const handleNewMessage = (el, val) => {
        setMessage(
            `My value of ${el} is ${val}. What recommendation would you give me about this value?`
        );
    };

    const content = JSON.parse(checkup?.content || '{}');
    return (
        <Layout>
            <ChatGPT newMessage={message} />
            <h1 className={styles.title}>Monitoring</h1>
            <div className={styles.card}>
                <div className={styles.left}>
                    {Object.keys(content).map((el) => (
                        <div
                            style={{
                                paddingBottom: 50,
                                borderBottom: '1px solid gray',
                            }}
                        >
                            <h1>
                                {KEYS[el]}: {content[el].value}
                            </h1>
                            <div
                                style={{
                                    width: '300px',
                                    marginTop: 10,
                                    position: 'relative',
                                }}
                            >
                                <img
                                    src={rectImg}
                                    alt=""
                                    style={{
                                        marginBottom: 10,
                                        transform: ' scale(-1, 1)',
                                    }}
                                />
                                <svg
                                    width="25"
                                    height="21"
                                    viewBox="0 0 25 21"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{
                                        position: 'absolute',
                                        left: `${calculatePercentage(
                                            content[el].score - 5,
                                            300
                                        )}px`,
                                    }}
                                >
                                    <path
                                        d="M2 20L13.3077 3L23 20"
                                        stroke="black"
                                        strokeWidth="3"
                                    />
                                </svg>
                            </div>

                            <div>
                                <h2 style={{ marginTop: 50 }}>
                                    Recommendations
                                </h2>
                                <p>{getRecommendationByKey(el) || ''}</p>
                            </div>

                            <button
                                onClick={() =>
                                    handleNewMessage(
                                        KEYS[el],
                                        content[el].value
                                    )
                                }
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 10,
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 25 25"
                                    height="30px"
                                >
                                    <path
                                        d="M18.5 5a5.497 5.497 0 0 1-5.5 5.5 5.49 5.49 0 0 1 5.5 5.5 5.497 5.497 0 0 1 5.5-5.5A5.497 5.497 0 0 1 18.5 5zM6.5 12A5.497 5.497 0 0 1 12 6.5 5.497 5.497 0 0 1 6.5 1 5.497 5.497 0 0 1 1 6.5a5.489 5.489 0 0 1 3.1.95A5.5 5.5 0 0 1 6.5 12zM10.5 13A5.497 5.497 0 0 1 5 18.5a5.49 5.49 0 0 1 5.5 5.5 5.497 5.497 0 0 1 5.5-5.5 5.497 5.497 0 0 1-5.5-5.5z"
                                        style={{ fill: '#fff' }}
                                    />
                                </svg>
                                Get AI recommendation
                            </button>
                        </div>
                    ))}
                </div>
                <div className={styles.right}>
                    <img src={monImg} alt="" />
                </div>
            </div>
        </Layout>
    );
};

export default ViewCheckup;
