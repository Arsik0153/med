import Layout from "@components/Layout";
import styles from "./styles.module.scss";
import Clinic from "./Clinic";
import MakeAppointmentModal from "./MakeAppointmentModal";
import { useState } from "react";
import { api } from "../../../api/api";
import { useQuery } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";

const getClinics = async () => {
    const { data } = await api.get("/clinics");
    return data;
};

const Appointment = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clinicId, setClinicId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const { data: clinics, isLoading } = useQuery({
        queryKey: ["clinics"],
        queryFn: getClinics,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    const filteredClinics = clinics?.filter((clinic) =>
        clinic.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAppointmentClick = (clinicId) => {
        setClinicId(clinicId);
        setIsModalOpen(true);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <Layout>
            <h1 className={styles.title}>Make an appointment</h1>
            <div className={styles.search}>
                <input
                    type="text"
                    name="search"
                    placeholder="Search for a clinic"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <div className={styles.banner}>
                <img
                    src="https://princecourt.com/images/default-source/my_pcmc/appointment/appointment-banner2.webp"
                    alt=""
                />
            </div>
            {isLoading && (
                <div style={{ textAlign: "center", marginTop: 50 }}>
                    <ClipLoader color="#007df0" />
                </div>
            )}
            {!isLoading && (
                <div className={styles.clinics}>
                    {filteredClinics.map((clinic) => (
                        <Clinic
                            key={clinic.id}
                            clinic={clinic}
                            onAppointmentClick={handleAppointmentClick}
                        />
                    ))}
                </div>
            )}
            <MakeAppointmentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                clinicId={clinicId}
            />
        </Layout>
    );
};

export default Appointment;
