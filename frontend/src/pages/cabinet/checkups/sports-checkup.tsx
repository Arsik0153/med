import React from 'react';
import Layout from '../../../components/Layout';
import styles from './styles.module.scss';
import { authApi } from '../../../api/api';
import { useUser } from '../../../api/useUser';
import toast from 'react-hot-toast';
import ClipLoader from 'react-spinners/ClipLoader';
import Modal from './Modal';

const API_KEY = import.meta.env.VITE_OPENAI;
const systemMessage = {
    role: 'system',
    content: `
        You are a doctor specialized on health checkups. I will give you json object with some aspects of health and their values. For example,
        {
            "vitamin_d3": "50",
            "vitamin_a": "900",
            "vitamin_c": "75"
        }

        You need to give me same json structure with updated values. For each aspect, you need to give a value (score) from 0 to 100 where 0 is "very abnormal" and 100 is "very normal".
        Example output for the given input:
        {
            "vitamin_d3": {
                value: 50,
                score: 100,
            },
            "vitamin_a": {
                value: 950,
                score: 100,
            },
            "vitamin_c": {
                value: 75,
                score: 100,
            }
        }
        Since vitamin values I provided as example are all the norms for an adult person, every aspect is 100. 
        But, for instance, vitamin_a I provided would be 450, which is pretty abnormal, so the value for it would be 50, because norm for an adult is 900, so 450 is half of the norm.
        "Value" is just a value that I provided.
    `,
};

const SportsCheckup = () => {
    const [user] = useUser();
    const [loading, setLoading] = React.useState(false);
    const [modalOpen, setModalOpen] = React.useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {
            pushups: formData.get('pushups'),
            squats: formData.get('squats'),
            press: formData.get('press'),
            bench_press: formData.get('bench_press'),
        };
        if (
            !data.pushups ||
            !data.squats ||
            !data.press ||
            !data.bench_press ||
            !formData.get('date')
        ) {
            toast.error('Please fill all fields');
            return;
        }

        setLoading(true);
        const apiRequestBody = {
            model: 'gpt-3.5-turbo',
            messages: [
                systemMessage,
                { role: 'user', content: JSON.stringify(data) },
            ],
        };
        try {
            const res = await fetch(
                'https://api.openai.com/v1/chat/completions',
                {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + API_KEY,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(apiRequestBody),
                }
            );
            const jsObj = await res.json();
            const response = JSON.parse(jsObj.choices[0].message.content);
            const date = formData.get('date')?.toString() || '';
            const dateObj = new Date(date);

            await authApi.post('/checkups', {
                patientId: user.id,
                name: 'Sports checkup',
                content: JSON.stringify(response),
                date: dateObj,
            });

            toast.success('Checkup saved successfully');
            setModalOpen(true);
        } catch {
            toast.error('Failed to save checkup');
        } finally {
            setLoading(false);
        }
    };

    if (!user)
        return (
            <Layout>
                <h1>Loading ...</h1>
            </Layout>
        );

    return (
        <Layout>
            {modalOpen && <Modal />}
            <h1 className={styles.title}>Sports checkup</h1>
            <form className={styles.cardBase} onSubmit={handleSubmit}>
                <div className={styles.left}>
                    <h2>Necessary tests</h2>

                    <div className={styles.formGroup}>
                        <div className={styles.formEl}>
                            <label>Push ups</label>
                            <input type="number" name="pushups" />
                        </div>
                        <div className={styles.formEl}>
                            <label>Squats</label>
                            <input type="number" name="squats" />
                        </div>
                        <div className={styles.formEl}>
                            <label>Press</label>
                            <input type="number" name="press" />
                        </div>

                        <div className={styles.formEl}>
                            <label>Bench press</label>
                            <input type="number" name="bench_press" />
                        </div>

                        <div className={styles.formEl}>
                            <label>Date issued</label>
                            <input type="date" name="date" />
                        </div>
                    </div>
                </div>
                <div>
                    <h2>Where to get tested</h2>
                    <div className={styles.formGroup}>
                        <div className={styles.formEl}>
                            <label>Olymp</label>
                            <input
                                type="text"
                                value="Almaty, Bogenbay st. 12"
                                disabled
                            />
                        </div>
                        <div className={styles.formEl}>
                            <label>Invivo</label>
                            <input
                                type="text"
                                value="Almaty, Tlendiyev st. 3"
                                disabled
                            />
                        </div>
                        <div className={styles.formEl}>
                            <label>Qamqor Clinic</label>
                            <input
                                type="text"
                                value="Almaty, Voikova st. 31"
                                disabled
                            />
                        </div>
                        <div className={styles.formEl}></div>
                        <div className={styles.formEl}>
                            <label></label>
                            <button className={styles.submit}>
                                {loading ? (
                                    <ClipLoader color="#fff" size={15} />
                                ) : (
                                    'Continue'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </Layout>
    );
};

export default SportsCheckup;
