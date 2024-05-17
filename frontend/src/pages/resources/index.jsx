import { ScrollRestoration } from 'react-router-dom';
import styles from './styles.module.scss';
import Header from '../landing/Header';
import Footer from '../landing/Footer';
import resourcesImg from '@assets/resources.svg';

const Resources = () => {
    return (
        <div>
            <ScrollRestoration />

            <div className={styles.wrapper}>
                <div className={styles.overlay}></div>
                <Header />
                <div className={`${styles.grid} container`}>
                    <div>
                        <div className={styles.sticky}>
                            <h1>Resources</h1>
                            <img src={resourcesImg} alt="" />
                        </div>
                    </div>
                    <div>
                        <article className={styles.article}>
                            <h2>Explore Our Health Resources</h2>
                            <p>
                                Welcome to the resources hub of MedWise. Here,
                                you'll find a wealth of information, tools, and
                                recommendations to support you on your health
                                and wellness journey. Whether you're looking for
                                articles, guides, or helpful tools, you'll find
                                everything you need to empower yourself to live
                                a healthier, happier life.
                            </p>
                        </article>
                        <article className={styles.article}>
                            <h2>Health Articles</h2>
                            <p>
                                Browse through our extensive collection of
                                articles covering a wide range of health topics,
                                including nutrition, fitness, mental health,
                                preventive care, and more. Our articles are
                                written by experts in their respective fields,
                                providing you with reliable information and
                                practical tips to enhance your well-being.
                            </p>
                        </article>
                        <article className={styles.article}>
                            <h2>Nutrition Guides</h2>
                            <p>
                                Discover the latest insights and recommendations
                                on nutrition and healthy eating. From meal
                                planning tips to understanding dietary
                                guidelines, our nutrition guides will help you
                                make informed choices about your diet and
                                optimize your nutritional intake for better
                                health.
                            </p>
                        </article>
                        <article className={styles.article}>
                            <h2>Fitness Resources</h2>
                            <p>
                                Get inspired and motivated to move with our
                                fitness resources. Whether you're a beginner
                                looking to start a workout routine or an
                                experienced fitness enthusiast seeking new
                                challenges, you'll find workout plans, exercise
                                tutorials, and motivational content to support
                                your fitness goals.
                            </p>
                        </article>
                        <article className={styles.article}>
                            <h2>Mental Health Support</h2>
                            <p>
                                Prioritize your mental well-being with our
                                mental health resources. Explore articles on
                                stress management, mindfulness practices, coping
                                strategies, and more. Take proactive steps to
                                nurture your mental health and build resilience
                                in the face of life's challenges.
                            </p>
                        </article>

                        <article className={styles.article}>
                            <h2>Healthy Living Tools</h2>
                            <p>
                                Access a variety of tools and calculators to
                                assist you in your health journey. From BMI
                                calculators to calorie counters, our tools are
                                designed to help you track your progress, set
                                realistic goals, and make informed decisions
                                about your health.
                            </p>
                        </article>

                        <article className={styles.article}>
                            <h2>Recommended Products</h2>
                            <p>
                                Discover a curated selection of health and
                                wellness products recommended by our team of
                                experts. From supplements to fitness equipment,
                                skincare to sleep aids, explore products that
                                can complement your lifestyle and support your
                                health goals.
                            </p>
                        </article>

                        <article className={styles.article}>
                            <h2>Additional Resources</h2>
                            <p>
                                Explore additional resources from trusted
                                sources in the health and wellness industry.
                                Find links to reputable websites, organizations,
                                and educational materials to further expand your
                                knowledge and understanding of health-related
                                topics.
                            </p>
                        </article>

                        <article className={styles.article}>
                            <h2>Stay Informed, Stay Healthy</h2>
                            <p>
                                Bookmark this page and visit often to stay
                                informed and inspired on your journey to better
                                health. Whether you're looking for practical
                                tips, expert advice, or motivational content,
                                our resources hub is here to support you every
                                step of the way.
                            </p>
                        </article>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Resources;
