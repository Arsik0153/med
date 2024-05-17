import { useState } from 'react';
import styles from './styles.module.scss';
import { toast } from 'react-hot-toast';
import { authApi } from '../../../api/api';
import { useMutation } from '@tanstack/react-query';
import { ClipLoader } from 'react-spinners';

const updatePassword = async (userData) => {
    try {
        const response = await authApi.put(`/profile/password`, userData);
        return response;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

const Privacy = () => {
    const [formData, setFormData] = useState({});
    const { mutate: updatePasswordMutation, isPending } = useMutation({
        mutationFn: updatePassword,
        onSuccess: () => {
            toast.success('Password updated successfully!');
        },
        onError: (error) => {
            if (error.response.data.message === 'Invalid current password') {
                toast.error('Invalid current password!');
                return;
            }
            toast.error('Error occured while updating user!');
        },
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleChangePassword = (e) => {
        e.preventDefault();
        if (
            !formData.old_password ||
            !formData.password ||
            !formData.repeatPassword
        ) {
            toast.error('Please fill all fields');
            return;
        }

        if (formData.password !== formData.repeatPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (formData.password.length < 8) {
            toast.error('Password must be at least 8 characters long');
            return;
        }

        updatePasswordMutation({
            currentPassword: formData.old_password,
            newPassword: formData.password,
        });
    };

    return (
        <div className={styles.inner}>
            <form
                className={styles.privacyGrid}
                onSubmit={handleChangePassword}
            >
                <h1>Privacy</h1>
                <h2>Change password</h2>
                <input
                    name="old_password"
                    type="password"
                    placeholder="Old password"
                    onChange={handleInputChange}
                    value={formData.old_password}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="New password"
                    onChange={handleInputChange}
                    value={formData.password}
                />
                <input
                    name="repeatPassword"
                    type="password"
                    placeholder="Confirm password"
                    onChange={handleInputChange}
                    value={formData.repeatPassword}
                />
                <button className={styles.signup} type="submit">
                    {isPending ? (
                        <ClipLoader color="#007df0" size={15} />
                    ) : (
                        'Confirm'
                    )}
                </button>
            </form>
        </div>
    );
};

export default Privacy;
