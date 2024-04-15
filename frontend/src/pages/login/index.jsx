import styles from "./styles.module.scss";
import logoImg from "@assets/landing/logo.png";
import doctorImg from "@assets/auth/doctor.png";
import googleImg from "@assets/auth/google.png";
import { useLogin } from "../../api/useLogin";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, isPending] = useLogin();

    const handleLogin = async () => {
        login({ email, password });
    };

    return (
        <div className={styles.wrapper}>
            <div className={`${styles.container} container`}>
                <img src={logoImg} alt="" />
                <div className={styles.grid}>
                    <img src={doctorImg} alt="" className={styles.doctorImg} />
                    <div className={styles.controls}>
                        <button className={styles.googleBtn}>
                            <img src={googleImg} alt="" />
                            Get started with google
                        </button>
                        <input
                            type="email"
                            className={styles.email}
                            placeholder="Your e - mail address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            className={styles.email}
                            style={{ marginTop: 30 }}
                            placeholder="Your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className={styles.signin} onClick={handleLogin}>
                            {isPending ? (
                                <ClipLoader color="#007df0" />
                            ) : (
                                "Sign in"
                            )}
                        </button>
                        <p className={styles.tip}>
                            You don`t have an account?{" "}
                            <a href="/signup">Sign up</a> here
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles.overlay}></div>
        </div>
    );
};

export default Login;
