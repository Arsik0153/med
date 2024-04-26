import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { delay } from './utils/delay.js';

const prisma = new PrismaClient();

const generateToken = (userId) => {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ userId }, secret, { expiresIn: '1h' });
    return token;
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    await delay(1000);

    try {
        let user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            const doctor = await prisma.doctor.findUnique({
                where: { email },
            });

            if (!doctor) {
                return res
                    .status(401)
                    .json({ message: 'Invalid email or password' });
            }

            const isMatch = await bcrypt.compare(password, doctor.password);

            if (!isMatch) {
                return res
                    .status(401)
                    .json({ message: 'Invalid email or password' });
            }

            user = { ...doctor, role: 'doctor' };
        } else {
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res
                    .status(401)
                    .json({ message: 'Invalid email or password' });
            }

            user = { ...user, role: 'user' };
        }

        const token = generateToken(user);
        res.json({ token, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const register = async (req, res) => {
    const { email, password, name, birthDate, gender } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { email, password: hashedPassword, name, birthDate, gender },
        });

        const token = generateToken(user.id);
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const refreshToken = async (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const secret = process.env.JWT_SECRET;
        jwt.verify(token, secret);
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            const decoded = jwt.decode(token);
            const newToken = generateToken(decoded.userId);
            return res.json({ token: newToken });
        } else {
            return res.status(401).json({ message: 'Invalid token' });
        }
    }
};
