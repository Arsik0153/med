import { useState } from "react";
import styles from "./styles.module.scss";
import logoImg from "@assets/landing/logo.png";
import { toast } from "react-hot-toast";
import { api, authApi } from "../../api/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const signup = async (credentials) => {
    const response = await api
        .post(`/register`, credentials)
        .then((res) => res.data);
    return response;
};

const addSurvey = async (data) => {
    const response = await authApi
        .post(`/surveys`, data)
        .then((res) => res.data);
    return response;
};

const Signup = () => {
    const [step, setStep] = useState(1);
    const [purpose, setPurpose] = useState();
    const [lifestyle, setLifeStyle] = useState();
    const [smoke, setSmoke] = useState();
    const [formData, setFormData] = useState({
        gender: "male",
    });
    const navigate = useNavigate();

    const { mutate: surveyMutation } = useMutation({
        mutationFn: addSurvey,
        onSuccess: () => {
            navigate("/cabinet");
        },
        onError: () => {
            toast.error("Error while signing up");
        },
    });

    const { mutate: signupMutation } = useMutation({
        mutationFn: signup,
        onSuccess: (data) => {
            localStorage.setItem("TOKEN", data.token);
            surveyMutation({
                question1: purpose,
                question2: lifestyle,
                question3: smoke,
            });
        },
        onError: () => {
            toast.error("Error while signing up");
        },
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePurposeChange = (e) => {
        setPurpose(e);
    };

    const handleNextClick = () => {
        setStep((step) => step + 1);
    };

    const handleFirstStep = (e) => {
        e.preventDefault();
        if (
            !formData.name ||
            !formData.birthDate ||
            !formData.email ||
            !formData.password ||
            !formData.repeatPassword
        ) {
            toast.error("Please fill all fields");
            return;
        }

        if (formData.password !== formData.repeatPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (formData.password.length < 8) {
            toast.error("Password must be at least 8 characters long");
            return;
        }

        setStep((step) => step + 1);
    };

    const handleSignup = () => {
        console.log("formData", formData);
        const data = {
            email: formData.email,
            password: formData.password,
            name: formData.name,
            birthDate: new Date(formData.birthDate).toISOString(),
            gender: formData.gender,
        };

        signupMutation(data);
    };

    return (
        <div className={styles.wrapper}>
            <div className={`${styles.container} container`}>
                <img src={logoImg} alt="" />
                {step === 1 && (
                    <form className={styles.grid} onSubmit={handleFirstStep}>
                        <h1>Create account</h1>
                        <label>Personal Data</label>
                        <input
                            onChange={handleInputChange}
                            value={formData.name}
                            name="name"
                            type="text"
                            placeholder="Full name"
                        />
                        <input
                            name="birthDate"
                            type="date"
                            placeholder="Date of birth"
                            onChange={handleInputChange}
                            value={formData.birthDate}
                        />
                        <select
                            name="gender"
                            onChange={handleInputChange}
                            value={formData.gender}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>

                        <label>Account Settings</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="E - mail address"
                            onChange={handleInputChange}
                            value={formData.email}
                        />
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={handleInputChange}
                            value={formData.password}
                        />
                        <input
                            name="repeatPassword"
                            type="password"
                            placeholder="Confirm password"
                            onChange={handleInputChange}
                            value={formData.repeatPassword}
                        />

                        <button className={styles.signup} type="submit">
                            Sign up
                        </button>
                    </form>
                )}
                {step === 2 && (
                    <div className={styles.grid}>
                        <h1>Just a little left!</h1>
                        <p className={styles.tip}>
                            After this short survey you will be able to fully
                            use the platform
                        </p>
                        <h1>What is your purpose of using the platform?</h1>
                        <button
                            className={styles.radio}
                            onClick={() => handlePurposeChange(1)}
                            data-active={purpose === 1 && "true"}
                        >
                            I care about my health and want to monitor it
                        </button>
                        <button
                            className={styles.radio}
                            onClick={() => handlePurposeChange(2)}
                            data-active={purpose === 2 && "true"}
                        >
                            I have a chronic disease and want to monitor it
                        </button>
                        <button
                            className={styles.radio}
                            onClick={() => handlePurposeChange(3)}
                            data-active={purpose === 3 && "true"}
                        >
                            I want to find out if everything is ok with my
                            health
                        </button>
                        {purpose && (
                            <button
                                className={styles.next}
                                onClick={handleNextClick}
                            >
                                Next →
                            </button>
                        )}
                    </div>
                )}

                {step === 3 && (
                    <div className={styles.grid}>
                        <h1>Do you lead an active lifestyle?</h1>
                        <button
                            className={styles.radio}
                            onClick={() => setLifeStyle(1)}
                            data-active={lifestyle === 1 && "true"}
                        >
                            Yes, sport 5 times a week and more
                        </button>
                        <button
                            className={styles.radio}
                            onClick={() => setLifeStyle(2)}
                            data-active={lifestyle === 2 && "true"}
                        >
                            Sport 3-5 times a week
                        </button>
                        <button
                            className={styles.radio}
                            onClick={() => setLifeStyle(3)}
                            data-active={lifestyle === 3 && "true"}
                        >
                            No, I lead a sedentary lifestyle
                        </button>
                        {lifestyle && (
                            <button
                                className={styles.next}
                                onClick={handleNextClick}
                            >
                                Next →
                            </button>
                        )}
                    </div>
                )}

                {step === 4 && (
                    <div className={styles.grid}>
                        <h1>Do you smoke or drink alcohol?</h1>
                        <button
                            className={styles.radio}
                            onClick={() => setSmoke(1)}
                            data-active={smoke === 1 && "true"}
                        >
                            Yes
                        </button>
                        <button
                            className={styles.radio}
                            onClick={() => setSmoke(2)}
                            data-active={smoke === 2 && "true"}
                        >
                            No
                        </button>
                        {smoke && (
                            <button
                                className={styles.next}
                                onClick={handleSignup}
                            >
                                Next →
                            </button>
                        )}
                    </div>
                )}
            </div>
            <div className={styles.overlay}></div>
        </div>
    );
};

export default Signup;
