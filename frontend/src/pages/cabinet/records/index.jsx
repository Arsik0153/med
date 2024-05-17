import Layout from '../../../components/Layout';
import styles from './styles.module.scss';
import { useQuery } from '@tanstack/react-query';
import { authApi } from '../../../api/api';
import { toast } from 'react-hot-toast';

const fetchAppointments = async (date) => {
    try {
        const { data } = await authApi.get(`/appointments/user`);
        return data;
    } catch (error) {
        console.error('Error fetching appointments:', error);
        throw error;
    }
};

const RecordsPage = () => {
    const { data: appointments, isLoading } = useQuery({
        queryKey: ['appointments'],
        queryFn: () => fetchAppointments(),

        onSuccess: (data) => {
            console.log('Appointments fetched!', data);
        },
        onError: () => {
            toast.error('Error occurred while getting appointments!');
        },
    });
    return (
        <Layout>
            <h1 className={styles.title}>Appointment records</h1>
            <div className={styles.card}>
                <table className={styles.table}>
                    <tr>
                        <th>Doctor</th>
                        <th>Clinic</th>
                        <th>Clinic address</th>
                        <th>Clinic phone</th>
                        <th>Format</th>
                        <th>Date</th>
                    </tr>
                    {appointments?.map((appointment) => (
                        <tr key={appointment.id}>
                            <td>
                                {appointment.doctor.name}
                                <a href={`mailto:${appointment.doctor.email}`}>
                                    {appointment.doctor.email}
                                </a>
                            </td>
                            <td>{appointment.clinic.name}</td>
                            <td>{appointment.clinic.address}</td>
                            <td>{appointment.clinic.phone}</td>
                            <td>{appointment.format}</td>
                            <td>
                                {new Date(appointment.date).toLocaleString()}
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        </Layout>
    );
};

export default RecordsPage;
