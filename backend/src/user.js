import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//get all users
export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get user by id
export const getUserById = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(req.params.id),
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
            where: {
                id: req.user.id,
            },
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
