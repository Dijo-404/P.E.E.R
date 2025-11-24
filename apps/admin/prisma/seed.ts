import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding...');

    // 1. Create Admin User
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@peer.org' },
        update: {},
        create: {
            email: 'admin@peer.org',
            name: 'Admin User',
            password: adminPassword,
            role: Role.ADMIN,
        },
    });
    console.log(`Created admin user: ${admin.email}`);

    // 2. Create Teacher User
    const teacherPassword = await bcrypt.hash('teacher123', 10);
    const teacher = await prisma.user.upsert({
        where: { email: 'teacher@peer.org' },
        update: {},
        create: {
            email: 'teacher@peer.org',
            name: 'Priya Sharma',
            password: teacherPassword,
            role: Role.TEACHER,
        },
    });
    console.log(`Created teacher user: ${teacher.email}`);

    // 3. Create Sample Student (linked to teacher)
    const student = await prisma.student.upsert({
        where: { rollNumber: 'STU001' },
        update: {},
        create: {
            name: 'Rohan Kumar',
            email: 'student@peer.org',
            rollNumber: 'STU001',
            class: '10',
            section: 'A',
            phone: '9876543210',
        },
    });
    console.log(`Created student: ${student.name}`);

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
