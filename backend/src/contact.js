import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new contact
export const createConctact = async (req, res) => {
    try {
        const { email, message } = req.body;

        const contact = await prisma.contact.create({
            data: {
                email,
                message,
            },
        });

        res.status(201).json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all contacts
export const getAllContacts = async (req, res) => {
    try {
        const contacts = await prisma.contact.findMany();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a contact by ID
export const getContactById = async (req, res) => {
    try {
        const { id } = req.params;

        const contact = await prisma.contact.findUnique({
            where: { id: Number(id) },
        });

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a contact
export const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;

        const contact = await prisma.contact.delete({
            where: { id: Number(id) },
        });

        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
