import React, { useEffect, useState } from 'react';
import Layout from '../../../../components/Layout';
import styles from './styles.module.scss';
import { authApi } from '../../../../api/api';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import rectImg from '@assets/rect.png';
import ChatGPT from '../../../../components/Chatgpt';
import monImg from '@assets/mon.svg';

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
};

const ViewCheckup = () => {
    const { id } = useParams();

    const { data: checkup, isLoading } = useQuery({
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
                        <div style={{ marginBottom: 100 }}>
                            <h2>
                                {KEYS[el]}: {content[el]}
                            </h2>
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
                                            content[el] - 5,
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

                            <button
                                onClick={() =>
                                    handleNewMessage(KEYS[el], content[el])
                                }
                            >
                                Get recommendation
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
