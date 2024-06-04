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
        "Value" is just a value that I provided.

        There's range of norms (in brackers is the name of parameter that i will give):
        enzyme: 59.847 - 65.234
        peristaltic: 58.425 - 61.213
        Gastric absorption coefficient 34.367 - 35.642
        absorption: 133.437 - 140.476
        coefficient_small_intestine: 3.572 - 6.483

        Give me score of how much value is close to normal range. For example, coefficient_small_intestine norm range is 3.572 - 6.483 and if i provide value 4.012 it should give me 100 which is 100%, because provided value is in norm range. if i give value is 3.012, it should give me around 75%, therefore you should give me 75. You can consider dots and commas as decimal separator in input, for example 0.05 equals to 0,05.
    `,
};

const GastrointestinalCheckup = () => {
    const [user] = useUser();
    const [loading, setLoading] = React.useState(false);
    const [modalOpen, setModalOpen] = React.useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {
            enzyme: formData.get('enzyme'),
            peristaltic: formData.get('peristaltic'),
            absorption: formData.get('absorption'),
            coefficient_small_intestine: formData.get(
                'coefficient_small_intestine'
            ),
            absorption_coefficient: formData.get('absorption_coefficient'),
        };
        if (
            !formData.get('enzyme') ||
            !formData.get('peristaltic') ||
            !formData.get('absorption') ||
            !formData.get('coefficient_small_intestine') ||
            !formData.get('absorption_coefficient') ||
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
                name: 'Gastrointestinal function',
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
            <h1 className={styles.title}>Gastrointestinal function</h1>
            <form className={styles.cardBase} onSubmit={handleSubmit}>
                <div className={styles.left}>
                    <h2>Necessary tests</h2>

                    <div className={styles.formGroup}>
                        <div className={styles.formEl}>
                            <label>Gastric enzyme secretion coefficient</label>
                            <input type="text" name="enzyme" />
                        </div>
                        <div className={styles.formEl}>
                            <label>
                                Gastric peristaltic function coefficient
                            </label>
                            <input type="text" name="peristaltic" />
                        </div>
                        <div className={styles.formEl}>
                            <label>Gastric absorption coefficient</label>
                            <input type="text" name="absorption" />
                        </div>

                        <div className={styles.formEl}>
                            <label>
                                Peristaltic function coefficient of the small
                                intestine
                            </label>
                            <input
                                type="text"
                                name="coefficient_small_intestine"
                            />
                        </div>

                        <div className={styles.formEl}>
                            <label>
                                Absorption coefficient of the small intestine
                            </label>
                            <input type="text" name="absorption_coefficient" />
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

export default GastrointestinalCheckup;
