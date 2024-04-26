import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { Database, Resource, getModelByName } from '@adminjs/prisma';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 5000;

AdminJS.registerAdapter({ Database, Resource });

const adminOptions = {
    resources: [
        {
            resource: { model: getModelByName('User'), client: prisma },
            options: {},
        },
        {
            resource: { model: getModelByName('Survey'), client: prisma },
            options: {},
        },
        {
            resource: { model: getModelByName('Doctor'), client: prisma },
            options: {},
        },
        {
            resource: { model: getModelByName('Clinic'), client: prisma },
            options: {},
        },
        {
            resource: { model: getModelByName('Appointment'), client: prisma },
            options: {},
        },
    ],
};

const admin = new AdminJS(adminOptions);
const adminRouter = AdminJSExpress.buildRouter(admin);

app.use(cors());
app.use(express.json());
app.use(admin.options.rootPath, adminRouter);

import { authMiddleware } from './src/utils/authMiddleware.js';

import { login, register, refreshToken } from './src/auth.js';
app.post('/login', login);
app.post('/register', register);
app.post('/refresh-token', refreshToken);

import {
    getUserById,
    deleteUserById,
    getUsers,
    updateUser,
    createUser,
    getProfile,
} from './src/user.js';
app.get('/users', getUsers);
app.get('/users/:id', getUserById);
app.delete('/users/:id', deleteUserById);
app.put('/users/:id', updateUser);
app.post('/users', createUser);
app.get('/profile', authMiddleware, getProfile);

import { createSurveyResult, getSurveyById, getSurveys } from './src/survey.js';
app.get('/surveys', authMiddleware, getSurveys);
app.get('/surveys/:id', authMiddleware, getSurveyById);
app.post('/surveys', authMiddleware, createSurveyResult);

import { createDoctor, getDoctors, getDoctorProfile } from './src/doctor.js';
app.get('/doctors', getDoctors);
app.post('/doctors', createDoctor);
app.get('/doctors/profile', authMiddleware, getDoctorProfile);

import {
    createClinic,
    getClinicById,
    deleteClinic,
    getAllClinics,
} from './src/clinic.js';
app.post('/clinics', createClinic);
app.get('/clinics', getAllClinics);
app.get('/clinics/:id', getClinicById);
app.delete('/clinics/:id', deleteClinic);

import {
    createAppointment,
    deleteAppointment,
    getAllAppointments,
    getAppointment,
    getAppointmentsByDate,
    getDoctorNextAppointments,
    updateAppointment,
} from './src/appointment.js';
app.get('/appointments', getAllAppointments);
app.get('/appointments/:id', getAppointment);
app.post('/appointments', createAppointment);
app.put('/appointments/:id', updateAppointment);
app.delete('/appointments/:id', deleteAppointment);
app.get('/appointments/date/:date', getAppointmentsByDate);
app.get('/doctors/appointments/closest', getDoctorNextAppointments);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    console.log(
        `AdminJS started on http://localhost:${port}${admin.options.rootPath}`
    );
});
