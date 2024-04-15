import styles from "./styles.module.scss";

const Clinic = (props) => {
    const { clinic, onAppointmentClick } = props;
    const { id, name, address, phone, rating, ratings } = clinic;

    return (
        <div className={styles.card}>
            <h1>{name}</h1>
            <p className={styles.gray}>medical center</p>
            <div className={styles.rating}>
                <div className={styles.stars}>
                    <svg
                        width="16"
                        height="14"
                        viewBox="0 0 16 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.rated}
                    >
                        <path
                            d="M5.72489 4.49048L7.45658 1.00234C7.67885 0.554557 8.32111 0.554557 8.54338 1.00234L10.275 4.49048L14.1476 5.05328C14.6445 5.12549 14.8425 5.73277 14.4828 6.0811L11.6811 8.79437L12.3423 12.6274C12.4272 13.1197 11.9076 13.495 11.463 13.2626L7.99998 11.4518L4.53696 13.2626C4.09238 13.495 3.57271 13.1197 3.65761 12.6274L4.31881 8.79437L1.51715 6.0811C1.15743 5.73277 1.35546 5.12549 1.85233 5.05328L5.72489 4.49048Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <svg
                        width="16"
                        height="14"
                        viewBox="0 0 16 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.rated}
                    >
                        <path
                            d="M5.72489 4.49048L7.45658 1.00234C7.67885 0.554557 8.32111 0.554557 8.54338 1.00234L10.275 4.49048L14.1476 5.05328C14.6445 5.12549 14.8425 5.73277 14.4828 6.0811L11.6811 8.79437L12.3423 12.6274C12.4272 13.1197 11.9076 13.495 11.463 13.2626L7.99998 11.4518L4.53696 13.2626C4.09238 13.495 3.57271 13.1197 3.65761 12.6274L4.31881 8.79437L1.51715 6.0811C1.15743 5.73277 1.35546 5.12549 1.85233 5.05328L5.72489 4.49048Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <svg
                        width="16"
                        height="14"
                        viewBox="0 0 16 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.rated}
                    >
                        <path
                            d="M5.72489 4.49048L7.45658 1.00234C7.67885 0.554557 8.32111 0.554557 8.54338 1.00234L10.275 4.49048L14.1476 5.05328C14.6445 5.12549 14.8425 5.73277 14.4828 6.0811L11.6811 8.79437L12.3423 12.6274C12.4272 13.1197 11.9076 13.495 11.463 13.2626L7.99998 11.4518L4.53696 13.2626C4.09238 13.495 3.57271 13.1197 3.65761 12.6274L4.31881 8.79437L1.51715 6.0811C1.15743 5.73277 1.35546 5.12549 1.85233 5.05328L5.72489 4.49048Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <svg
                        width="16"
                        height="14"
                        viewBox="0 0 16 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5.72489 4.49048L7.45658 1.00234C7.67885 0.554557 8.32111 0.554557 8.54338 1.00234L10.275 4.49048L14.1476 5.05328C14.6445 5.12549 14.8425 5.73277 14.4828 6.0811L11.6811 8.79437L12.3423 12.6274C12.4272 13.1197 11.9076 13.495 11.463 13.2626L7.99998 11.4518L4.53696 13.2626C4.09238 13.495 3.57271 13.1197 3.65761 12.6274L4.31881 8.79437L1.51715 6.0811C1.15743 5.73277 1.35546 5.12549 1.85233 5.05328L5.72489 4.49048Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <svg
                        width="16"
                        height="14"
                        viewBox="0 0 16 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5.72489 4.49048L7.45658 1.00234C7.67885 0.554557 8.32111 0.554557 8.54338 1.00234L10.275 4.49048L14.1476 5.05328C14.6445 5.12549 14.8425 5.73277 14.4828 6.0811L11.6811 8.79437L12.3423 12.6274C12.4272 13.1197 11.9076 13.495 11.463 13.2626L7.99998 11.4518L4.53696 13.2626C4.09238 13.495 3.57271 13.1197 3.65761 12.6274L4.31881 8.79437L1.51715 6.0811C1.15743 5.73277 1.35546 5.12549 1.85233 5.05328L5.72489 4.49048Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                <span>
                    4.6
                    <p className={styles.gray}>46 ratings</p>
                </span>
            </div>
            <div className={styles.info}>
                <h2>{address}</h2>
                <p className={styles.gray}>{phone}</p>
            </div>
            <button
                className={styles.cta}
                onClick={() => onAppointmentClick(id)}
            >
                Записаться
            </button>
        </div>
    );
};

export default Clinic;
