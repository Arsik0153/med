import Layout from '@components/Layout';
import styles from './styles.module.scss';
import { useUser } from '../../api/useUser';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import { useEffect, useState } from 'react';
import { authApi } from '../../api/api';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import ChatGPT from '../../components/Chatgpt';

const fetchAppointments = async (date) => {
    try {
        const { data } = await authApi.get(`/appointments/date/${date}`);
        return data;
    } catch (error) {
        console.error('Error fetching appointments:', error);
        throw error;
    }
};

const fetchAppointmentsInMonth = async (date) => {
    try {
        const { data } = await authApi.get(
            `/appointments/patient/month?month=${date}`
        );
        return data;
    } catch (error) {
        console.error('Error fetching appointments in calendar:', error);
        throw error;
    }
};

function getAppointmentsCountForCurrentDate(appointments, currentDate) {
    if (!appointments) return 0;
    const currentDateStart = new Date(currentDate);
    currentDateStart.setHours(0, 0, 0, 0); // Set time to 00:00:00

    const currentDateEnd = new Date(currentDate);
    currentDateEnd.setHours(23, 59, 59, 999); // Set time to 23:59:59.999

    const appointmentsForCurrentDate = appointments.filter((appointment) => {
        const appointmentDate = new Date(appointment.date);
        return (
            appointmentDate >= currentDateStart &&
            appointmentDate <= currentDateEnd
        );
    });

    return appointmentsForCurrentDate.length;
}

const Cabinet = () => {
    const [user] = useUser();
    const [currentDate, setCurrentDate] = useState(new Date());
    // console.log('currentDate', currentDate);
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

    const { data: appointmentsInMonth, refetch: refetchCalendar } = useQuery({
        queryKey: ['appointmentsInMonth', currentDate],
        queryFn: () => fetchAppointmentsInMonth(currentDate),

        onSuccess: (data) => {
            console.log('Appointments fetched!', data);
        },
        onError: () => {
            toast.error('Error occurred while getting appointments!');
        },
    });

    console.log('appointmentsInMonth', appointmentsInMonth);

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
        <Layout>
            <ChatGPT />
            <h1 className={styles.title}>
                Welcome, <span>{user.name}</span>
            </h1>
            <div className={styles.card}>
                <div className={styles.left}>
                    <Link to="/cabinet/checkups">
                        <div className={styles.circle}>Check upps/Analysis</div>
                    </Link>
                    <Link to="/cabinet/appointment">
                        <div className={styles.circle}>
                            Doctor's appointment
                        </div>
                    </Link>
                    <div className={styles.circle}>Appointment records</div>
                    <Link to="/cabinet/monitoring">
                        <div className={styles.circle}>Monitoring</div>
                    </Link>
                </div>
                <div className={`${styles.right} full-calendar`}>
                    <h1 style={{ textAlign: 'center', marginBottom: 30 }}>
                        Calendar
                    </h1>
                    <Calendar
                        locale="en-EN"
                        value={currentDate}
                        onChange={handleDateChange}
                        tileContent={({ date }) => {
                            const len = getAppointmentsCountForCurrentDate(
                                appointmentsInMonth,
                                date
                            );
                            if (len > 0)
                                return (
                                    <p className="calendar-tile-content">
                                        {len}
                                    </p>
                                );
                        }}
                        onActiveStartDateChange={({ activeStartDate }) => {
                            console.log('activeStartDate', activeStartDate);
                            refetchCalendar(activeStartDate);
                        }}
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
                                <p>{appointment.doctor.name}</p>
                            </div>
                        ))}
                        {appointments?.length === 0 && (
                            <p>No appointments for this date</p>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Cabinet;
