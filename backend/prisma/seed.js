import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const password = await bcrypt.hash('12345678', 10);
    // Create users
    const user1 = await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'john@mail.com',
            password,
            birthDate: new Date('1990-01-01'),
            gender: 'male',
            // Add more fields as needed
        },
    });

    const user2 = await prisma.user.create({
        data: {
            name: 'Jane Smith',
            email: 'jane@mail.com',
            password,
            birthDate: new Date('1995-05-15'),
            gender: 'female',
            // Add more fields as needed
        },
    });

    // Create surveys
    const survey1 = await prisma.survey.create({
        data: {
            authorId: user1.id,
            question1: 5,
            question2: 4,
            question3: 3,
            // Add more fields as needed
        },
    });

    const survey2 = await prisma.survey.create({
        data: {
            authorId: user2.id,
            question1: 3,
            question2: 2,
            question3: 4,
            // Add more fields as needed
        },
    });

    // Create clinics
    const clinic1 = await prisma.clinic.create({
        data: {
            name: 'Olymp',
            address: 'Almaty, Bogenbay st. 12',
            phone: '+7 (701) 419 94 49',
        },
    });

    const clinic2 = await prisma.clinic.create({
        data: {
            name: 'Invivo',
            address: 'Almaty, Tlendiyev st. 3',
            phone: '+7 (706) 807 97 77',
        },
    });

    const clinic3 = await prisma.clinic.create({
        data: {
            name: 'Qamqor Clinic',
            address: 'Almaty, Voikova st. 31',
            phone: '+7 (701) 122 54 66',
        },
    });

    const clinic4 = await prisma.clinic.create({
        data: {
            name: 'Damu Clinic',
            address: 'Almaty, Shevchenko st. 31',
            phone: '+7 (701) 993 34 55',
        },
    });

    // Create doctors
    const doctor1 = await prisma.doctor.create({
        data: {
            name: 'Dr. Smith',
            email: 'dr.smith@mail.com',
            password,
            specialization_type: 'therapist',
            clinicId: 1,
        },
    });

    const doctor2 = await prisma.doctor.create({
        data: {
            name: 'Dr. Johnson',
            email: 'dr.johnson@mail.com',
            password,
            specialization_type: 'therapist',
            clinicId: 1,
        },
    });

    const doctor3 = await prisma.doctor.create({
        data: {
            name: 'Dr. Brown',
            email: 'drbrown@mail.com',
            password,
            specialization_type: 'therapist',
            clinicId: 2,
        },
    });

    const doctor4 = await prisma.doctor.create({
        data: {
            name: 'Dr. White',
            email: 'drwhite@mail.com',
            password,
            specialization_type: 'surgeon',
            clinicId: 1,
        },
    });

    const doctor5 = await prisma.doctor.create({
        data: {
            name: 'Dr. Black',
            email: 'drblack@mail.com',
            password,
            specialization_type: 'neurologist',
            clinicId: 1,
        },
    });

    const doctor6 = await prisma.doctor.create({
        data: {
            name: 'Dr. Johnson',
            email: 'drjohnson@mail.com',
            password,
            specialization_type: 'neurologist',
            clinicId: 1,
        },
    });

    const doctor7 = await prisma.doctor.create({
        data: {
            name: 'Dr. Albert',
            email: 'dralbert@mail.com',
            password,
            specialization_type: 'cardiologist',
            clinicId: 1,
        },
    });

    const doctor8 = await prisma.doctor.create({
        data: {
            name: 'Dr. Alex',
            email: 'dralex@mail.com',
            password,
            specialization_type: 'surgeon',
            clinicId: 2,
        },
    });

    console.log('Seed data inserted successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
