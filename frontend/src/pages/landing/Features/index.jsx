import styles from './styles.module.scss';
import careImg from '@assets/landing/features/care.png';
import graphImg from '@assets/landing/features/graph.png';
import houseImg from '@assets/landing/features/house.png';
import secureImg from '@assets/landing/features/secure.png';

const Features = () => {
    return (
        <div className={`${styles.wrapper} container`}>
            <h2>Features</h2>
            <div className={styles.grid}>
                <div className={styles.card}>
                    <img src={graphImg} alt="" className={styles.img} />
                    <h3>Real Time Analytics</h3>
                    <p>
                        Gain access to up-to-the-minute insights, enabling
                        healthcare professionals to make informed decisions
                        promptly.
                    </p>
                </div>

                <div className={styles.card}>
                    <img src={careImg} alt="" className={styles.img} />
                    <h3>Clinical Decision Support</h3>
                    <p>
                        Provide clinicians with real-time recommendations and
                        evidence-based guidelines, enhancing the quality of
                        patient care.
                    </p>
                </div>

                <div className={styles.card}>
                    <img src={secureImg} alt="" className={styles.img} />
                    <h3>Security and Compliance</h3>
                    <p>
                        Ensure the highest level of data security and compliance
                        with industry regulations, such as HIPAA, to protect
                        patient information.
                    </p>
                </div>

                <div className={styles.card}>
                    <img src={houseImg} alt="" className={styles.img} />
                    <h3>Research and Clinical Trials</h3>
                    <p>
                        Facilitate research initiatives by providing access to a
                        rich source of anonymized healthcare data for clinical
                        trials and studies.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Features;
