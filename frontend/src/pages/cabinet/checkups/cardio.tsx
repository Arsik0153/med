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

        Also, there's data of norms:
        Blood viscosity 48.264 - 65.371
        Total Cholesterol 56.749 - 67.522
        Lipids 0.481 - 1.043
        Vascular resistance 0.327 - 0.937
        Elasticity of blood vessels 1.672 - 1.978

        Give me score of how much value is close to normal diapason. For example, Blood viscosity norm diapason is 48,264 - 65,371 and if i provide value 50.012 it should give me 100 which is 100%, because provided value is in norm diapason. if i give 56,749 - 67,522 and value is 43.012, it should give me around 75%, therefore you should give me 75
    `,
};

const CardioCheckup = () => {
    const [user] = useUser();
    const [loading, setLoading] = React.useState(false);
    const [modalOpen, setModalOpen] = React.useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {
            blood_viscosity: formData.get('blood_viscosity'),
            cholesterol: formData.get('cholesterol'),
            Lipids: formData.get('Lipids'),
            resistance: formData.get('resistance'),
            elasticity: formData.get('elasticity'),
        };
        if (
            !formData.get('blood_viscosity') ||
            !formData.get('cholesterol') ||
            !formData.get('Lipids') ||
            !formData.get('resistance') ||
            !formData.get('elasticity') ||
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
                name: 'The cardiovascular system',
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
            <h1 className={styles.title}>The cardiovascular system checkup</h1>
            <form className={styles.cardBase} onSubmit={handleSubmit}>
                <div className={styles.left}>
                    <h2>Necessary tests</h2>

                    <div className={styles.formGroup}>
                        <div className={styles.formEl}>
                            <label>Blood viscosity</label>
                            <input type="text" name="blood_viscosity" />
                        </div>
                        <div className={styles.formEl}>
                            <label>Total Cholesterol</label>
                            <input type="text" name="cholesterol" />
                        </div>
                        <div className={styles.formEl}>
                            <label>Lipids</label>
                            <input type="text" name="Lipids" />
                        </div>

                        <div className={styles.formEl}>
                            <label>Vascular resistance</label>
                            <input type="text" name="resistance" />
                        </div>

                        <div className={styles.formEl}>
                            <label>Elasticity of blood vessels</label>
                            <input type="text" name="elasticity" />
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

export default CardioCheckup;
