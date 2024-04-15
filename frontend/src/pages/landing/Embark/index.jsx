import React from "react";
import styles from "./styles.module.scss";
import doctorImg from "@assets/landing/doctor.png";

const Embark = () => {
    return (
        <div className={`${styles.wrapper} container`}>
            <div className={styles.left}>
                <img src={doctorImg} alt="" />
            </div>
            <div className={styles.right}>
                <h2>
                    Embark on <span>Healthcare Data Journey</span> Today!
                </h2>
                <p>
                    Ready to revolutionize healthcare through data-driven
                    insights? It's time to embark on your journey towards a
                    healthier future. Start now and unlock the potential of our
                    Digital Healthcare Analyst System
                </p>
                <button>Get started</button>
            </div>
        </div>
    );
};

export default Embark;
