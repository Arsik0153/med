import React from 'react';
import Layout from '../../../components/Layout';
import ChatGPT from '../../../components/Chatgpt';
import styles from './styles.module.scss';
import checkupImg from '@assets/checkup.svg';
import { Link } from 'react-router-dom';

const Checkups = () => {
    return (
        <Layout>
            <ChatGPT />
            <h1 className={styles.title}>Checkups</h1>
            <div className={styles.card}>
                <div className={styles.left}>
                    <ul>
                        <li>
                            Full checkup{' '}
                            <Link to="full-checkup">
                                <button>Continue</button>
                            </Link>
                        </li>
                        <li>
                            Sports checkup{' '}
                            <Link to="sports-checkup">
                                <button>Continue</button>
                            </Link>
                        </li>
                        <li>
                            Pregnancy checkup{' '}
                            <Link to="pregnancy-checkup">
                                <button>Continue</button>
                            </Link>
                        </li>
                        <li>
                            Post surgery checkup{' '}
                            <Link to="post-surgery-checkup">
                                <button>Continue</button>
                            </Link>
                        </li>
                        <li>
                            Vitamine D3{' '}
                            <Link to="vitamine-d3-checkup">
                                <button>Continue</button>
                            </Link>
                        </li>
                        <li>
                            The cardiovascular system{' '}
                            <Link to="cardio">
                                <button>Continue</button>
                            </Link>
                        </li>
                        <li>
                            Gastrointestinal function{' '}
                            <Link to="gastro">
                                <button>Continue</button>
                            </Link>
                        </li>
                        <li>
                            Liver condition{' '}
                            <Link to="liver">
                                <button>Continue</button>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.right}>
                    <img src={checkupImg} alt="checkup illustration" />
                </div>
            </div>
        </Layout>
    );
};

export default Checkups;
