import { useState } from 'react';
import styles from './styles.module.scss';
import logoImg from '@assets/landing/logo.png';
import { toast } from 'react-hot-toast';
import { api } from '../../../api/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const signup = async (credentials) => {
    const response = await api
        .post(`/doctors`, credentials)
        .then((res) => res.data);
    return response;
};

const getClinics = async () => {
    const { data } = await api.get('/clinics');
    return data;
};

const DoctorSignup = () => {
    const [formData, setFormData] = useState({
        gender: 'male',
    });
    const navigate = useNavigate();

    const { mutate: signupMutation } = useMutation({
        mutationFn: signup,
        onSuccess: (data) => {
            localStorage.setItem('TOKEN', data.token);
            navigate('/doctor/cabinet');
        },
        onError: () => {
            toast.error('Error while signing up');
        },
    });

    const { data: clinics } = useQuery({
        queryKey: ['clinics'],
        queryFn: getClinics,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        if (
            !formData.name ||
            !formData.specialist_type ||
            !formData.email ||
            !formData.password ||
            !formData.repeatPassword ||
            !formData.clinicId
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

        const data = {
            email: formData.email,
            password: formData.password,
            name: formData.name,
            specialization_type: formData.specialist_type,
            gender: formData.gender,
            clinicId: parseInt(formData.clinicId),
        };
        signupMutation(data);
    };

    return (
        <div className={styles.wrapper}>
            <div className={`${styles.container} container`}>
                <img src={logoImg} alt="" />
                <form className={styles.grid} onSubmit={handleSignup}>
                    <h1>Create doctor account</h1>
                    <label>Personal Data</label>
                    <input
                        onChange={handleInputChange}
                        value={formData.name}
                        name="name"
                        type="text"
                        placeholder="Full name"
                    />
                    <select
                        name="gender"
                        onChange={handleInputChange}
                        value={formData.gender}
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <select
                        name="specialist_type"
                        onChange={handleInputChange}
                        value={formData.specialist_type}
                    >
                        <option value="0">Specialization type</option>
                        <option value="therapist">Therapist</option>
                        <option value="surgeon">Surgeon</option>
                        <option value="neurologist">Neurologist</option>
                        <option value="cardiologist">Cardiologist</option>
                        <option value="gynecologist">Gynecologist</option>
                    </select>

                    <select
                        name="clinicId"
                        onChange={handleInputChange}
                        value={formData.clinicId}
                    >
                        <option value="0">Where do you work?</option>
                        {clinics &&
                            clinics.map((clinic) => (
                                <option key={clinic.id} value={clinic.id}>
                                    {clinic.name} ({clinic.address})
                                </option>
                            ))}
                    </select>

                    <label>Account Settings</label>
                    <input
                        name="email"
                        type="email"
                        placeholder="E - mail address"
                        onChange={handleInputChange}
                        value={formData.email}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
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
                        Sign up
                    </button>
                </form>
            </div>
            <div className={styles.overlay}></div>
        </div>
    );
};

export default DoctorSignup;
