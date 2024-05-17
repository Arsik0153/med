import { ScrollRestoration } from 'react-router-dom';
import styles from './styles.module.scss';
import Header from '../landing/Header';
import Footer from '../landing/Footer';

const Articles = () => {
    return (
        <div>
            <ScrollRestoration />

            <div className={styles.wrapper}>
                <div className={styles.overlay}></div>
                <Header />
                <div className={`${styles.grid} container`}>
                    <div>
                        <h1 className={styles.sticky}>Articles</h1>
                    </div>
                    <div>
                        <article className={styles.article}>
                            <img
                                src="https://www.aha.org/sites/default/files/styles/900x400/public/2024-02/joanne-m-conroy-md-chairpersons-file-900x400-as-of-2-26-2024.jpg?itok=khySnJvN"
                                alt=""
                            />
                            <h2>
                                Chair File: Driving Change Together and
                                Accelerating Health Equity
                            </h2>

                            <p>
                                More than 1,000 people will convene in Kansas
                                City, Mo., beginning tomorrow to participate in
                                the AHA Accelerating Health Equity Conference.
                                This year’s theme, Driving Change Together,
                                emphasizes the importance of leaders at
                                hospitals, health systems, public health
                                departments and community-based organizations
                                taking a united approach to ensure all
                                individuals have access to and receive quality
                                health care.
                                <span />
                            </p>
                            <a
                                target="_blank"
                                href="https://www.aha.org/news/chairpersons-file/2024-05-06-chair-file-driving-change-together-and-accelerating-health-equity"
                            >
                                Read More&#x2192;
                            </a>
                        </article>
                        <article className={styles.article}>
                            <img
                                src="https://www.aha.org/sites/default/files/styles/900x400/public/2018-04/CMS-report.jpg?itok=DDqblI1h"
                                alt=""
                            />
                            <h2>
                                Hospital Insurance Trust Fund solvent five
                                additional years until 2036, Medicare trustees
                                project
                            </h2>

                            <p>
                                The Medicare Hospital Insurance Trust Fund will
                                have sufficient funds to pay full benefits until
                                2036, according to the latest annual report by
                                the Medicare Board of Trustees. That’s five
                                years longer than reported last year, mainly due
                                to strong economic and job growth, lower
                                projected health care spending based on more
                                recent data and a policy change to exclude
                                medical education expenses associated with
                                Medicare Advantage enrollees from the
                                fee-for-service per capita costs used in the
                                development of MA spending,
                                <span />
                            </p>
                            <a
                                target="_blank"
                                href="https://www.aha.org/news/headline/2024-05-06-medicare-trustee-report"
                            >
                                Read More&#x2192;
                            </a>
                        </article>

                        <article className={styles.article}>
                            <img
                                src="https://www.aha.org/sites/default/files/styles/900x400/public/2018-12/AHA%20COmment.jpg?itok=aYYU0xTu"
                                alt=""
                            />
                            <h2>
                                AHA urges need for flexibility in regulation of
                                AI in health care
                            </h2>

                            <p>
                                AHA May 6 responded to a request for information
                                about the current state of artificial
                                intelligence in health care from Rep. Ami Bera,
                                M.D., D-Calif., urging that any regulation of
                                the technology needs to be flexible to keep pace
                                with innovation and allow caregivers to apply it
                                for patient benefit. "Technology is most
                                effectively regulated based on how and where it
                                is used,
                                <span />
                            </p>
                            <a
                                target="_blank"
                                href="https://www.aha.org/news/headline/2024-05-06-aha-urges-need-flexibility-regulation-ai-health-care"
                            >
                                Read More&#x2192;
                            </a>
                        </article>

                        <article className={styles.article}>
                            <img
                                src="https://www.aha.org/sites/default/files/styles/900x400/public/2018-11/drugs.jpg?itok=NCl4n0ah"
                                alt=""
                            />
                            <h2>
                                CMS opens comment period for Medicare Drug Price
                                Negotiation Program
                            </h2>

                            <p>
                                The Centers for Medicare & Medicaid Services May
                                3 announced the opening of the comment period
                                for the Inflation Reduction Act’s Medicare Drug
                                Price Negotiation Program, which will negotiate
                                prices with drug makers for certain high-cost,
                                sole-source drugs and apply them beginning in
                                2026. Comments are due July 2.
                                <span />
                            </p>
                            <a
                                target="_blank"
                                href="https://www.aha.org/news/headline/2024-05-06-aha-urges-need-flexibility-regulation-ai-health-care"
                            >
                                Read More&#x2192;
                            </a>
                        </article>
                        <article className={styles.article}>
                            <img
                                src="https://www.aha.org/sites/default/files/styles/900x400/public/2018-06/calculator-stethoscope.jpg?itok=diQySJJZ"
                                alt=""
                            />
                            <h2>
                                Kaufman Hall report says hospital finances
                                worsened in March
                            </h2>

                            <p>
                                Hospital financials worsened in March, with
                                declines in operating margins, volume, and
                                revenue, according to a Kaufman Hall report. The
                                flash report says hospital outpatient revenue
                                fell 5%, and that hospitals' calendar
                                year-to-date operating margin index was 3.9% in
                                March, slightly down from 4.1% in February, due
                                to rising bad debt and charity care.
                                <span />
                            </p>
                            <a
                                target="_blank"
                                href="https://www.aha.org/news/headline/2024-05-06-aha-urges-need-flexibility-regulation-ai-health-care"
                            >
                                Read More&#x2192;
                            </a>
                        </article>

                        <article className={styles.article}>
                            <img
                                src="https://www.aha.org/sites/default/files/styles/900x400/public/2021-09/TI_0921_childrens-minnesota-900x400.jpg?itok=Z9OofJqO"
                                alt=""
                            />
                            <h2>
                                Participation deadline extended for 2024 DEI
                                Benchmark Survey
                            </h2>

                            <p>
                                AHA’s Institute for Diversity and Health Equity
                                May 2 notified hospitals and health systems with
                                an email reminder to complete the 2024 DEI
                                Benchmark Survey, noting a deadline extension to
                                May 15. Respondents are strongly encouraged to
                                complete the survey at the hospital level to
                                accurately capture DEI strategies and
                                experiences. This biennial survey provides
                                insights into member and non-member hospitals’
                                and health systems’ efforts, successes and
                                challenges in advancing health equity.
                                <span />
                            </p>
                            <a
                                target="_blank"
                                href="https://www.aha.org/news/headline/2024-05-06-aha-urges-need-flexibility-regulation-ai-health-care"
                            >
                                Read More&#x2192;
                            </a>
                        </article>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Articles;
