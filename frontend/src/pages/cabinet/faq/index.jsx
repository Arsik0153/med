import Layout from '../../../components/Layout';
import styles from './styles.module.scss';
import faqImg from '@assets/faq.jpg';

const FaqPage = () => {
    return (
        <Layout>
            <h1 className={styles.title}>FAQ</h1>

            <div className={styles.card}>
                <div>
                    <h2>List of frequently asked questions</h2>
                    <h3>1. What is MedWise?</h3>
                    <p>
                        MedWise is a comprehensive health analysis platform
                        designed to empower individuals to take control of their
                        well-being. We offer personalized health assessments,
                        insightful reports, expert recommendations, and a range
                        of resources to support you on your health journey.
                    </p>
                    <h3>2. How does MedWise work?</h3>
                    <p>
                        Our platform utilizes advanced algorithms and data
                        analytics to analyze various aspects of your health,
                        including fitness levels, nutritional status, stress
                        levels, and more. Users provide input through a series
                        of questions and data inputs, and our system generates
                        personalized insights and recommendations based on this
                        information.
                    </p>
                    <h3>3. Is my personal health data secure?</h3>
                    <p>
                        Yes, safeguarding your personal health data is our top
                        priority. We utilize industry-standard security measures
                        to protect your information and comply with relevant
                        data protection regulations. Your data is encrypted and
                        stored securely, and we do not share or sell your
                        information to third parties without your consent.
                    </p>
                    <h3>
                        4. Are the health analyses provided by MedWise accurate?
                    </h3>
                    <p>
                        While we strive to provide accurate and reliable health
                        analyses, it's important to note that our assessments
                        are based on the information provided by users and may
                        not capture every aspect of your health profile. We
                        recommend using our analyses as a tool for
                        self-assessment and consulting with healthcare
                        professionals for personalized advice and guidance.
                    </p>
                    <h3>
                        5. Can MedWise help me improve my health and wellness?
                    </h3>
                    <p>
                        Absolutely! Our platform is designed to empower you with
                        knowledge and insights to make informed decisions about
                        your health. In addition to personalized analyses, we
                        offer expert recommendations, resources, and support to
                        help you adopt healthier habits, set achievable goals,
                        and track your progress over time.
                    </p>
                    <h3>6. How often should I use MedWise?</h3>
                    <p>
                        The frequency of using MedWise depends on your
                        individual health goals and preferences. Some users may
                        benefit from regular assessments to track progress and
                        make adjustments to their lifestyle, while others may
                        use the platform periodically to check in on their
                        health status. Ultimately, it's up to you to determine
                        how often you'd like to utilize our services.
                    </p>
                    <h3>7. Can I cancel my membership at any time?</h3>
                    <p>
                        Yes, you can cancel your membership at any time without
                        any cancellation fees. Simply log in to your account,
                        navigate to the membership settings, and follow the
                        instructions to cancel. Please note that any remaining
                        subscription period will remain active until the end of
                        the billing cycle.
                    </p>
                    <h3>
                        8. How can I contact customer support if I have
                        questions or issues?
                    </h3>
                    <p>
                        If you have any questions, issues, or feedback, our
                        customer support team is here to help! You can reach us
                        via email at [support@email.com] or through our online
                        contact form. We strive to respond to all inquiries
                        promptly and provide assistance to ensure you have a
                        positive experience with MedWise.
                    </p>
                    <h3>
                        9. Is MedWise suitable for all ages and fitness levels?
                    </h3>
                    <p>
                        Yes, MedWise is suitable for individuals of all ages and
                        fitness levels. Our platform is designed to accommodate
                        a diverse range of health goals and preferences, from
                        beginners to experienced health enthusiasts. Whether
                        you're looking to improve your fitness, nutrition,
                        mental health, or overall well-being, you'll find
                        valuable insights and resources to support you on your
                        journey.
                    </p>
                    <h3>10. How can I get started with MedWise?</h3>
                    <p>
                        Getting started with MedWise is easy! Simply create an
                        account on our website, complete your profile, and begin
                        your health analysis journey. You'll have access to
                        personalized assessments, insightful reports, expert
                        recommendations, and a wealth of resources to help you
                        achieve your health and wellness goals.
                    </p>
                </div>
                <div>
                    <img src={faqImg} alt="" />
                    <h3>Got Questions?</h3>
                    <p>
                        We're Here to Help! If you have any questions or need
                        assistance with your membership, don't hesitate to reach
                        out to our dedicated support team. We're here to ensure
                        you have a seamless experience and get the most out of
                        your membership.
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default FaqPage;
