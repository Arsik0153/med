import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

// Get all users with their subscription details
export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            include: {
                subscription: {
                    where: {
                        expirationDate: {
                            gte: new Date(),
                        },
                    },
                    orderBy: {
                        expirationDate: 'desc',
                    },
                },
            },
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get user by id
export const getUserById = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(req.params.id) },
            include: {
                subscription: {
                    where: {
                        expirationDate: {
                            gte: new Date(),
                        },
                    },
                    orderBy: {
                        expirationDate: 'desc',
                    },
                },
            },
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//create user
export const createUser = async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            },
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//update user
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, iin, phoneNumber } = req.body;
        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: {
                name,
                email,
                password,
                iin,
                phoneNumber,
            },
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//delete user
export const deleteUserById = async (req, res) => {
    try {
        const user = await prisma.user.delete({
            where: {
                id: Number(req.params.id),
            },
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get profile from token
export const getProfile = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            include: {
                subscription: true,
            },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const latestSubscription = user.subscription
            ? user.subscription.sort((a, b) => {
                  return (
                      new Date(b.expirationDate) - new Date(a.expirationDate)
                  );
              })[0]
            : null;

        const userWithSubscription = {
            ...user,
            subscription: latestSubscription,
        };

        res.status(200).json(userWithSubscription);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Change user password
export const changePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword } = req.body;

        // Find the user by id
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the current password is correct
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res
                .status(400)
                .json({ message: 'Invalid current password' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
