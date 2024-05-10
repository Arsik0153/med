import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//get all users
export const getSurveys = async (req, res) => {
    try {
        const surveys = await prisma.survey.findMany();
        res.status(200).json(surveys);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get survey by id
export const getSurveyById = async (req, res) => {
    try {
        const survey = await prisma.survey.findUnique({
            where: {
                id: Number(req.params.id),
            },
        });
        res.status(200).json(survey);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//create survey result
export const createSurveyResult = async (req, res) => {
    try {
        const surveyResult = await prisma.survey.create({
            data: {
                authorId: req.user.id,
                question1: req.body.question1,
                question2: req.body.question2,
                question3: req.body.question3,
            },
        });
        res.status(201).json(surveyResult);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
