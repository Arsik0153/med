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
import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';

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

function CustomTooltip({ payload, label, active }) {
    if (active && payload.length > 0) {
        const key = payload[0].dataKey.slice(0, -6);

        return (
            <div className={styles.tooltip}>
                <p className="label">{`${KEYS[key]}: ${payload[0].value}`}</p>
                <p className="intro">
                    {new Date(payload[0].payload.date).toLocaleDateString()}
                </p>
            </div>
        );
    }

    return null;
}

const ViewCheckup = () => {
    const { id } = useParams();
    const [chartData, setChartData] = useState();

    const { data: checkup, refetch } = useQuery({
        queryKey: ['checkups', id],
        queryFn: () => getMyCheckup(id),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    const getCheckupByName = async (name) => {
        const { data } = await authApi.get(`/checkups/name?name=${name}`);

        const withContent = data
            .map((el) => {
                el.content = JSON.parse(el.content);
                return {
                    date: el.date,
                    ...el.content,
                };
            })
            .sort(
                (a, b) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime()
            );
        console.log(withContent);

        return withContent;
    };

    const { data: allCheckups } = useQuery({
        queryKey: ['allCheckups'],
        queryFn: () => getCheckupByName(checkup.name),
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
                            className={styles.cardContent}
                        >
                            <div>
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
                            <div>
                                <h2 style={{ marginBottom: 30 }}>Dynamics</h2>
                                <ResponsiveContainer width="100%" height={400}>
                                    <LineChart
                                        width={400}
                                        height={400}
                                        data={allCheckups}
                                    >
                                        <Line
                                            type="monotone"
                                            dataKey={`${el}.value`}
                                            stroke="#8884d8"
                                            strokeWidth={3}
                                        />
                                        <Tooltip content={<CustomTooltip />} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default ViewCheckup;
