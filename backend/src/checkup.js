import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Get all checkups
export const getAllCheckups = async (req, res) => {
    try {
        const checkups = await prisma.checkup.findMany({
            include: {
                patient: true,
            },
        });
        res.status(200).json(checkups);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single checkup
export const getCheckup = async (req, res) => {
    try {
        const { id } = req.params;
        const checkup = await prisma.checkup.findUnique({
            where: { id: Number(id) },
            include: {
                patient: true,
            },
        });
        if (!checkup) {
            return res.status(404).json({ error: 'Checkup not found' });
        }
        res.status(200).json(checkup);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get my checkups
export const getMyCheckups = async (req, res) => {
    try {
        const checkups = await prisma.checkup.findMany({
            where: { patientId: req.user.id },
            include: {
                patient: true,
            },
        });
        res.status(200).json(checkups);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new checkup
export const createCheckup = async (req, res) => {
    try {
        const { patientId, name, content, date } = req.body;
        const checkup = await prisma.checkup.create({
            data: {
                patientId,
                name,
                content,
                date,
            },
        });
        res.status(201).json(checkup);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get single checkup
export const getSingleCheckup = async (req, res) => {
    try {
        const { id } = req.params;
        const checkup = await prisma.checkup.findUnique({
            where: { id: Number(id) },
            include: {
                patient: true,
            },
        });
        if (!checkup) {
            return res.status(404).json({ error: 'Checkup not found' });
        }
        res.status(200).json(checkup);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a checkup
export const deleteCheckup = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.checkup.delete({
            where: { id: Number(id) },
        });
        res.status(204).json({ message: 'Checkup deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
