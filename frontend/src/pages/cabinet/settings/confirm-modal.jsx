import { useState } from 'react';
import styles from './styles.module.scss';
import { ClipLoader } from 'react-spinners';
import { authApi } from '../../../api/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { delay } from '../../../utils/delay';
import { useUser } from '../../../api/useUser';

const subscribe = async ({ id, subscriptionData }) => {
    try {
        await delay(1000);
        console.log(subscriptionData);
        const response = await authApi.post(
            `/users/${id}/subscription`,
            subscriptionData
        );
        return response;
    } catch (error) {
        console.error('Error subscribing:', error);
        throw error;
    }
};

const ConfirmModal = ({ isOpen, onClose, newPlan }) => {
    const [active, setActive] = useState('monthly');
    const [user] = useUser();
    const queryClient = useQueryClient();

    const { mutate: createSubscription, isPending: isSubscribing } =
        useMutation({
            mutationFn: subscribe,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['user'] });
                toast.success('Subscription completed!');
                onClose();
            },
            onError: () => {
                toast.error('Error occured while subscribing');
            },
        });

    const handleConfirm = () => {
        if (user) {
            const subscriptionData = {
                userId: user.id,
                plan: newPlan,
                duration: active,
            };

            createSubscription({ id: user.id, subscriptionData });
        } else {
            toast.error('User not found!');
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.wrapper}>
            <div className={styles.box}>
                <h1 className={styles.title}>Confirm</h1>
                <p style={{ textAlign: 'center' }}>
                    Choose your subscription option
                </p>
                <div className={styles.buttons}>
                    <button
                        className={`${styles.cancel} ${
                            active === 'monthly' ? styles.active : ''
                        }`}
                        onClick={() => setActive('monthly')}
                    >
                        Monthly
                    </button>
                    <button
                        className={`${styles.cancel} ${
                            active === 'annually' ? styles.active : ''
                        }`}
                        onClick={() => setActive('annually')}
                    >
                        Annually
                    </button>
                </div>

                <div className={styles.controls}>
                    <button className={styles.back} onClick={onClose}>
                        Cancel
                    </button>
                    <button onClick={handleConfirm} style={{ minWidth: 39 }}>
                        {isSubscribing ? (
                            <ClipLoader size={17} color="#fff" />
                        ) : (
                            'Confirm'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
