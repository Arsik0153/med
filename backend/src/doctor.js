import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const generateToken = (userId) => {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ userId }, secret, { expiresIn: '1h' });
    return token;
};

export const getDoctors = async (req, res) => {
    try {
        const { specializationType, clinicId } = req.query;

        let whereClause = {};

        if (specializationType && clinicId) {
            whereClause = {
                specialization_type: {
                    contains: specializationType,
                    mode: 'insensitive',
                },
                clinicId: parseInt(clinicId),
            };
        }

        const doctors = await prisma.doctor.findMany({
            where: whereClause,
            include: {
                clinic: true,
            },
        });

        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createDoctor = async (req, res) => {
    try {
        const { name, email, specialization_type, password, clinicId } =
            req.body;

        // Check if the clinicId is provided
        if (!clinicId) {
            return res.status(400).json({ message: 'clinicId is required' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const doctor = await prisma.doctor.create({
            data: {
                name,
                email,
                specialization_type,
                password: hashedPassword,
                clinic: {
                    connect: {
                        id: clinicId,
                    },
                },
            },
            include: {
                clinic: true,
            },
        });
        const newDoctor = { ...doctor, role: 'doctor' };
        const token = generateToken(newDoctor);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getDoctorProfile = async (req, res) => {
    try {
        const doctor = await prisma.doctor.findUnique({
            where: {
                id: req.user.id,
            },
        });
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
