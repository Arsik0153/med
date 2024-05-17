import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import InputMask from 'react-input-mask';
import { toast } from 'react-hot-toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '../../../../api/api';
import { useUser } from '../../../../api/useUser';
import ClipLoader from 'react-spinners/ClipLoader';

const fetchSpecialists = async (specializationType, clinicId) => {
    try {
        const { data } = await api.get(
            `/doctors?specializationType=${specializationType}&clinicId=${clinicId}`
        );
        return data;
    } catch (error) {
        console.error('Error fetching specialists:', error);
        throw error;
    }
};

const createAppointment = async (appointmentData) => {
    try {
        const response = await api.post('/appointments', appointmentData);
        return response;
    } catch (error) {
        console.error('Error creating appointment:', error);
        throw error;
    }
};

const updateUser = async (userData) => {
    try {
        const response = await api.put(`/users/${userData.id}`, userData);
        return response;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

const MakeAppointmentModal = (props) => {
    const { isOpen, onClose, clinicId } = props;
    const [step, setStep] = useState(1);
    const [stepLimit, setStepLimit] = useState(1);
    const [user] = useUser();
    const [formData, setFormData] = useState({
        iin: '',
        phone: '',
        format: '',
        specialist_type: '0',
        specialist: '',
        date: '',
        time: '',
    });

    const { data: specialists } = useQuery({
        queryKey: ['specialists', clinicId, formData.specialist_type],
        queryFn: async () =>
            fetchSpecialists(formData.specialist_type, clinicId),
        enabled: !!formData.specialist_type && formData.specialist_type !== '0',
    });

    const {
        mutate: createAppointmentMutation,
        isPending: isAppointmentCreating,
    } = useMutation({
        mutationFn: createAppointment,
        onSuccess: () => {
            toast.success('Appointment created!');
            onClose();
        },
        onError: () => {
            toast.error('Error occured while creating appointment!');
        },
    });

    const { mutate: updateUserMutation, isPending: isUserUpdating } =
        useMutation({
            mutationFn: updateUser,
            onSuccess: () => {
                setStep(step + 1);
                setStepLimit(step + 1);
            },
            onError: () => {
                toast.error('Error occured while updating user!');
            },
        });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        if (user.iin) {
            setFormData({
                ...formData,
                iin: user.iin,
                phone: user.phoneNumber,
            });
        }
    }, [user]);

    const nextStep = () => {
        if (step === 1) {
            if (
                formData.iin.length !== 12 ||
                formData.phone.length !== 18 ||
                formData.format === ''
            ) {
                toast.error('Please fill in all fields');
                return;
            }

            const userData = {
                id: user.id,
                iin: formData.iin,
                phoneNumber: formData.phone,
            };
            updateUserMutation(userData);
            return;
        }

        if (step === 2) {
            if (formData.specialist_type === '' || formData.specialist === '') {
                toast.error('Please fill in all fields');
                return;
            }
        }

        if (step === 3) {
            if (formData.date === '' || formData.time === '') {
                toast.error('Please fill in all fields');
                return;
            }
            const dateTime = new Date(`${formData.date}T${formData.time}`);
            const isoDateTime = dateTime.toISOString();
            const data = {
                doctorId: Number(formData.specialist),
                clinicId: clinicId,
                patientId: user.id,
                date: isoDateTime,
                format: formData.format,
            };
            createAppointmentMutation(data);
            return;
        }

        setStep(step + 1);
        setStepLimit(step + 1);
    };

    const handleStep = (step) => {
        if (step <= stepLimit) {
            setStep(step);
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.box}>
                <h1 className={styles.title}>Make an appointment</h1>
                <div className={styles.steps}>
                    <div
                        className={`${styles.step} ${
                            step >= 1 && styles.active
                        }`}
                        onClick={() => handleStep(1)}
                    >
                        1
                    </div>
                    <div
                        className={`${styles.step} ${
                            step >= 2 && styles.active
                        }`}
                        onClick={() => handleStep(2)}
                    >
                        2
                    </div>
                    <div
                        className={`${styles.step} ${
                            step >= 3 && styles.active
                        }`}
                        onClick={() => handleStep(3)}
                    >
                        3
                    </div>
                </div>

                {step === 1 && (
                    <div className={styles.form}>
                        <label>IIN</label>
                        <input
                            type="text"
                            name="iin"
                            placeholder="Enter your IIN"
                            maxLength="12"
                            onChange={handleChange}
                            value={formData.iin}
                        />

                        <label>Phone number</label>
                        <InputMask
                            mask="+7 (999) 999-99-99"
                            value={formData.phone}
                            onChange={handleChange}
                        >
                            {(inputProps) => (
                                <input
                                    type="tel"
                                    name="phone"
                                    {...inputProps}
                                    placeholder="+7 (___) ___-__-__"
                                />
                            )}
                        </InputMask>

                        <label>Format</label>
                        <select
                            name="format"
                            onChange={handleChange}
                            value={formData.format}
                        >
                            <option value="0">Select format</option>
                            <option value="online">Online</option>
                            <option value="offline">Offline</option>
                        </select>
                    </div>
                )}

                {step === 2 && (
                    <div className={styles.form}>
                        <label>Specialization type</label>
                        <select
                            name="specialist_type"
                            onChange={handleChange}
                            value={formData.specialist_type}
                        >
                            <option value="0">
                                Select specialization type
                            </option>
                            <option value="therapist">Therapist</option>
                            <option value="surgeon">Surgeon</option>
                            <option value="neurologist">Neurologist</option>
                            <option value="cardiologist">Cardiologist</option>
                            <option value="gynecologist">Gynecologist</option>
                        </select>

                        <label>Specialist</label>
                        <select
                            name="specialist"
                            onChange={handleChange}
                            value={formData.specialist}
                        >
                            <option value="0">Select specialist</option>
                            {specialists?.map((specialist) => (
                                <option
                                    key={specialist.id}
                                    value={specialist.id}
                                >
                                    {specialist.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {step === 3 && (
                    <div className={styles.form}>
                        <label>Date</label>
                        <input
                            type="date"
                            name="date"
                            onChange={handleChange}
                            value={formData.date}
                        />

                        <label>Time</label>
                        <select
                            name="time"
                            onChange={handleChange}
                            value={formData.time}
                        >
                            <option value="0">Select time</option>
                            <option value="09:00">09:00</option>
                            <option value="10:00">10:00</option>
                            <option value="11:00">11:00</option>
                            <option value="12:00">12:00</option>
                            <option value="14:00">14:00</option>
                            <option value="15:00">15:00</option>
                            <option value="16:00">16:00</option>
                            <option value="17:00">17:00</option>
                            <option value="18:00">18:00</option>
                        </select>
                    </div>
                )}

                <div className={styles.controls}>
                    <button className={styles.back} onClick={onClose}>
                        Cancel
                    </button>
                    <button onClick={nextStep} style={{ minWidth: 39 }}>
                        {isAppointmentCreating || isUserUpdating ? (
                            <ClipLoader size={17} color="#fff" />
                        ) : (
                            'Next'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MakeAppointmentModal;
