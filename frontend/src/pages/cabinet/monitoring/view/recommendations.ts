export const recommendations = [
    {
        key: 'vitamin_d3',
        text: 'Get adequate sun exposure, as the body produces vitamin D3 when the skin is exposed to sunlight. Aim for 10-30 minutes of sun exposure a few times a week, taking care to avoid burning. Incorporate fatty fish like salmon, tuna, and mackerel into your diet, as they are excellent sources of vitamin D3. If sun exposure and dietary sources are insufficient, consider taking a vitamin D3 supplement, especially during the winter months or if you have limited sun exposure.',
    },
    {
        key: 'vitamin_d2',
        text: ' To increase your vitamin D2 intake, incorporate foods like mushrooms, fortified plant-based milks and juices into your diet. However, vitamin D2 is not as effective at raising and maintaining vitamin D levels as vitamin D3. If you are deficient, I would recommend taking a vitamin D3 supplement instead of relying solely on vitamin D2 sources.',
    },
    {
        key: 'vitamin_c',
        text: "Eat plenty of citrus fruits like oranges, grapefruits, and limes which are excellent sources of vitamin C. Include other vitamin C-rich foods in your diet such as bell peppers, broccoli, strawberries, and tomatoes. If you smoke, quit smoking as it depletes vitamin C levels in the body. Consider taking a vitamin C supplement, especially during times of increased stress or illness when your body's requirement for vitamin C is higher.",
    },
    {
        key: 'vitamin_a',
        text: 'Incorporate yellow/orange vegetables and fruits like carrots, sweet potatoes, cantaloupe and mangoes into your diet, as they are rich in beta-carotene which gets converted to vitamin A in the body. Eat foods that contain preformed vitamin A like liver, egg yolks, and fortified dairy products. If you have trouble meeting your needs through diet alone, consider taking a vitamin A supplement, but be careful not to exceed the safe upper limit as excessive vitamin A can be toxic. Maintaining adequate vitamin A is important for vision, immune function and cellular growth.',
    },
    {
        key: 'pushups',
        text: "Start by assessing your current level and gradually increasing the number of push-ups you can do. Proper form is crucial - keep your body in a straight line, don't let your hips sag, and go all the way down until your chest nearly touches the floor. Incorporate push-up variations like wide, narrow, decline or diamond push-ups to work your chest muscles from different angles. Supplement your push-up routine with other chest exercises like bench presses to build overall pushing strength. Allow your muscles adequate rest and recovery between push-up sessions.",
    },
    {
        key: 'squats',
        text: 'Ensure you are performing squats with proper form to prevent injury and maximize muscle engagement. Keep your feet shoulder-width apart, chest up, and back straight throughout the movement. Squat down as if you are sitting back into a chair, ensuring your knees do not go past your toes. Gradually increase the weight or resistance you are using to continue challenging your muscles. Incorporate different squat variations like sumo squats, goblet squats, or Bulgarian split squats to target different muscle groups. Include other lower body exercises like lunges, deadlifts, and leg presses to build overall leg strength and muscle mass.',
    },
    {
        key: 'press',
        text: 'Focus on proper form and technique when performing overhead presses to prevent injury and maximize muscle engagement. Keep your core engaged, back straight, and feet shoulder-width apart. Press the weight overhead in a controlled manner, fully extending your arms at the top of the movement. Gradually increase the weight you are lifting to continue challenging your muscles. Incorporate other shoulder exercises like lateral raises, front raises, and face pulls to target different shoulder muscles. Allow your muscles adequate rest and recovery between shoulder workouts to promote muscle growth and prevent overtraining.',
    },
    {
        key: 'bench_press',
        text: 'Ensure you are performing bench presses with proper form to prevent injury and maximize muscle engagement. Keep your feet flat on the ground, back arched, and shoulder blades retracted throughout the movement. Lower the barbell to your chest in a controlled manner, then press it back up explosively. Gradually increase the weight you are lifting to continue challenging your muscles. Incorporate other chest exercises like push-ups, dumbbell flyes, and cable crossovers to target different chest muscles. Allow your muscles adequate rest and recovery between bench press sessions to promote muscle growth and prevent overtraining.',
    },
    {
        key: 'blood',
        text: "Regular blood tests are essential for monitoring your overall health and detecting any potential issues early on. Make sure to follow your healthcare provider's recommendations for blood tests based on your age",
    },
    {
        key: 'blood_oxygen_level',
        text: 'Make sure you are getting regular physical activity and exercise, as this helps increase oxygen circulation. Practice deep breathing exercises and pursed lip breathing to allow more air into your lungs. If you smoke, quit smoking as it impairs your ability to effectively oxygenate your blood. Stay well-hydrated as dehydration can thicken blood and make it harder for oxygen to travel. Treat any underlying respiratory conditions like asthma or COPD to optimize lung function. In some cases, supplemental oxygen therapy may be prescribed to raise chronically low blood oxygen levels.',
    },
    {
        key: 'body_temperature',
        text: 'Stay hydrated by drinking plenty of fluids, as dehydration can impair the bodys ability to regulate temperature. Dress in layers and remove or add clothes as needed to avoid overheating or getting too cold. Limit exposure to extreme temperatures by seeking shade or warmth when necessary. Get enough sleep and rest, as fatigue can impact temperature regulation. Treat any underlying conditions like fever or thyroid disorders that may cause temperature dysregulation. Avoid excessive alcohol intake, as it can promote heat loss and hypothermia. Maintain a healthy weight, as being overweight makes it harder for the body to dissipate heat.',
    },
    {
        key: 'pulse',
        text: 'Engage in regular aerobic exercise like walking, jogging, swimming or cycling as this helps strengthen the heart muscle and can lower your resting pulse over time. Practice relaxation techniques such as deep breathing, meditation or yoga since stress can elevate your pulse, so learning to manage stress is important. Stay hydrated by drinking plenty of fluids daily because dehydration can cause your pulse to increase as your body works harder to pump blood. Avoid stimulants like caffeine, nicotine and certain medications that can raise your heart rate unnecessarily',
    },
];

export const getRecommendationByKey = (key) => {
    return recommendations.find((rec) => rec.key === key)?.text;
};

const staticRecommendations = [
    {
        key: 'The cardiovascular system',
        text: 'Reduce stress, maintain mental balance, the law of life.  Eat organic lipids such as: black mushroom, mushrooms, vegetables, fruits,  Eat foods high in cholesterol, high in salt in food, high in  fats',
    },
    {
        key: 'Gastrointestinal function',
        text: 'Eat non-stimulating and digestible food, vegetables, eating on time, slowly, in small portions, eating to relax, maintain good rest        ',
    },
    {
        key: 'Liver condition',
        text: 'Eat more vitamin B, C, E, rich foods such as black mushroom, mushroom food, eat fried food, quit alcohol, spicy',
    },
    {
        key: 'Kidney function',
        text: 'Eat spicy hot dishes such as chili, pepper, ginger, onion, garlic, leek, lamb, fish, shrimp, eel and so on.',
    },
    {
        key: 'Rheumatoid bone diseases',
        text: 'White bread and sweets are contraindicated, it is advisable to reduce the consumption of meat, sweet fruits (bananas), vegetables, fermented dairy products are very useful. It is necessary to reduce the consumption of strong tea and coffee. Alcohol is also banned.',
    },
];

export const getStaticByKey = (key) => {
    return staticRecommendations.find((rec) => rec.key === key)?.text;
};
