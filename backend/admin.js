import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { Database, Resource, getModelByName } from '@adminjs/prisma';
import Connect from 'connect-pg-simple';
import session from 'express-session';
import { authenticateAdmin } from './src/utils/authMiddleware.js';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcryptjs';
import { componentLoader, Components } from './src/components/index.js';

const hash = async (password) => {
    return await bcrypt.hash(password, 10);
};

AdminJS.registerAdapter({ Database, Resource });

const adminOptions = {
    dashboard: {
        component: Components.Dashboard,
    },
    componentLoader,
    resources: [
        {
            resource: { model: getModelByName('User'), client: prisma },
            options: {
                actions: {
                    new: {
                        before: async (request) => {
                            if (request.payload?.password) {
                                request.payload.password = await hash(
                                    request.payload.password
                                );
                            }
                            return request;
                        },
                    },
                    edit: {
                        before: async (request) => {
                            if (request.payload?.password) {
                                request.payload.password = await hash(
                                    request.payload.password
                                );
                            }
                            return request;
                        },
                    },
                },
            },
        },
        {
            resource: { model: getModelByName('Survey'), client: prisma },
            options: {},
        },
        {
            resource: { model: getModelByName('Doctor'), client: prisma },
            options: {
                actions: {
                    new: {
                        before: async (request) => {
                            if (request.payload?.password) {
                                request.payload.password = await hash(
                                    request.payload.password
                                );
                            }
                            return request;
                        },
                    },
                    edit: {
                        before: async (request) => {
                            if (request.payload?.password) {
                                request.payload.password = await hash(
                                    request.payload.password
                                );
                            }
                            return request;
                        },
                    },
                },
            },
        },
        {
            resource: { model: getModelByName('Clinic'), client: prisma },
            options: {},
        },
        {
            resource: { model: getModelByName('Appointment'), client: prisma },
            options: {},
        },
        {
            resource: { model: getModelByName('Contact'), client: prisma },
            options: {},
        },
        {
            resource: { model: getModelByName('Checkup'), client: prisma },
            options: {},
        },
        {
            resource: { model: getModelByName('Subscription'), client: prisma },
            options: {},
        },
    ],
};

const ConnectSession = Connect(session);
const sessionStore = new ConnectSession({
    conObject: {
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production',
    },
    tableName: 'session',
    createTableIfMissing: true,
});

const admin = new AdminJS(adminOptions);
export const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
        authenticate: authenticateAdmin,
        cookieName: 'adminjs',
        cookiePassword: 'sessionsecret',
    },
    null,
    {
        store: sessionStore,
        resave: false,
        secret: 'sessionsecret',
        saveUninitialized: true,
        cookie: {
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 30,
        },
        name: 'adminjs',
    }
);

// admin.watch();

export default admin;
