import LayoutDoctor from '@components/LayoutDoctor';
import styles from './styles.module.scss';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import { useEffect, useState } from 'react';
import { api } from '../../../api/api';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useDoctor } from '../../../api/useDoctor';
import ChatGPT from '../../../components/Chatgpt';

const fetchAppointments = async (date) => {
    try {
        const { data } = await api.get(`/appointments/date/${date}`);
        return data;
    } catch (error) {
        console.error('Error fetching appointments:', error);
        throw error;
    }
};

const fetchClosestAppointments = async () => {
    try {
        const { data } = await api.get(`/doctors/appointments/closest`);
        return data;
    } catch (error) {
        console.error('Error fetching closest appointments:', error);
        throw error;
    }
};

function formatIsoDate(isoDateString) {
    // Create a Date object from the ISO string
    const date = new Date(isoDateString);

    // Define an array of month names
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    // Extract the month, day, and time from the Date object
    const monthName = months[date.getMonth()];
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure two digits for minutes

    // Format the string as "Month day, hour:minute"
    return `${monthName} ${day}, ${hours}:${minutes}`;
}

const DoctorCabinet = () => {
    const [user] = useDoctor();
    const [currentDate, setCurrentDate] = useState(new Date());
    const { data: appointments, refetch } = useQuery({
        queryKey: ['appointments', currentDate],
        queryFn: () => fetchAppointments(currentDate),

        onSuccess: (data) => {
            console.log('Appointments fetched!', data);
        },
        onError: () => {
            toast.error('Error occurred while getting appointments!');
        },
    });

    const { data: closestAppointments } = useQuery({
        queryKey: 'closestAppointments',
        queryFn: fetchClosestAppointments,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    const handleDateChange = (date) => {
        let tzoffset = new Date().getTimezoneOffset() * 60000;
        let localISOTime = new Date(date.getTime() - tzoffset)
            .toISOString()
            .slice(0, -1);
        setCurrentDate(localISOTime);
    };

    useEffect(() => {
        refetch();
    }, [currentDate, refetch]);

    if (!user) return null;

    return (
        <LayoutDoctor>
            <ChatGPT />

            <h1 className={styles.title}>
                Welcome, <span>{user.name}</span>
            </h1>
            <div className={styles.card}>
                <div className={styles.left}>
                    <h2>Closest appointment dates</h2>
                    <div className={styles.list}>
                        {closestAppointments?.map((appointment) => (
                            <div key={appointment.id} className={styles.item}>
                                <img
                                    src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
                                    alt=""
                                    className={styles.avatar}
                                />
                                <div>
                                    <h3>{formatIsoDate(appointment.date)}</h3>
                                    <p>{appointment.patient.name}</p>
                                </div>
                            </div>
                        ))}
                        {closestAppointments?.length === 0 && (
                            <p>No appointments</p>
                        )}
                    </div>
                </div>
                <div className={`${styles.right} full-calendar`}>
                    <h1 style={{ textAlign: 'center', marginBottom: 30 }}>
                        Calendar
                    </h1>
                    <Calendar
                        locale="en-EN"
                        value={currentDate}
                        onChange={handleDateChange}
                    />
                    <h3>Appointments for this date:</h3>
                    <div className={styles.appointments}>
                        {appointments?.map((appointment) => (
                            <div
                                key={appointment.id}
                                className={styles.appointment}
                            >
                                <h3>
                                    {new Date(
                                        appointment.date
                                    ).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </h3>
                                <p>{appointment.patient.name}</p>
                            </div>
                        ))}
                        {appointments?.length === 0 && (
                            <p>No appointments for this date</p>
                        )}
                    </div>
                </div>
            </div>
        </LayoutDoctor>
    );
};

export default DoctorCabinet;
