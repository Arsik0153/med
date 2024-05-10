import React from 'react';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

const Modal = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.box}>
                <h1 className={styles.title}>
                    Thank you for taking care <br /> of your health
                </h1>
                <p style={{ textAlign: 'center' }}>
                    You can view a detailed analysis in the Monitoring tab. Can
                    we go through another checkup?
                </p>

                <div className={styles.controls}>
                    <button className={styles.back}>Make a review</button>
                    <Link to="/cabinet/checkups">
                        <button style={{ minWidth: 39 }}>Checkups</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Modal;
