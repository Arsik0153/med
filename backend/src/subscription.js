import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper function to calculate the expiration date based on the subscription plan
const calculateExpirationDate = (startDate, duration) => {
    const durationInMonths = duration === 'monthly' ? 1 : 12;
    const expirationDate = new Date(startDate);
    expirationDate.setMonth(expirationDate.getMonth() + durationInMonths);
    return expirationDate;
};

// Create a new subscription
export const createSubscription = async (req, res) => {
    try {
        const { userId, plan, duration } = req.body;
        const startDate = new Date();
        const expirationDate = calculateExpirationDate(startDate, duration);
        const subscription = await prisma.subscription.create({
            data: {
                userId,
                plan,
                duration,
                startDate,
                expirationDate,
            },
        });
        res.status(201).json(subscription);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user's current subscription
export const getUserSubscription = async (req, res) => {
    try {
        const { userId } = req.params;
        const subscription = await prisma.subscription.findFirst({
            where: {
                userId: Number(userId),
                expirationDate: {
                    gte: new Date(),
                },
            },
            orderBy: {
                expirationDate: 'desc',
            },
        });
        res.status(200).json(subscription);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Renew subscription
export const renewSubscription = async (req, res) => {
    try {
        const { userId, plan, duration } = req.body;
        const currentSubscription = await prisma.subscription.findFirst({
            where: {
                userId: Number(userId),
                expirationDate: {
                    gte: new Date(),
                },
            },
            orderBy: {
                expirationDate: 'desc',
            },
        });

        if (!currentSubscription) {
            return res
                .status(400)
                .json({ message: 'No active subscription found' });
        }

        const startDate = new Date(currentSubscription.expirationDate);
        const expirationDate = calculateExpirationDate(
            startDate,
            plan,
            duration
        );
        const subscription = await prisma.subscription.create({
            data: {
                userId,
                plan,
                duration,
                startDate,
                expirationDate,
            },
        });
        res.status(201).json(subscription);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
