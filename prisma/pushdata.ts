import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker'; // Install faker with `npm install @faker-js/faker`

const prisma = new PrismaClient();

async function main() {
  // Generate up to 20 Members
  const members = Array.from({ length: 20 }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number({ style: 'national' }),
    membershipType: faker.helpers.arrayElement(['basic', 'premium']),
    joinDate: faker.date.past({ years: 1 }),
  }));

  // Generate up to 20 Staff
  const staff = Array.from({ length: 20 }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number({ style: 'national' }),
    role: faker.helpers.arrayElement(['trainer', 'maintenance', 'receptionist']),
    salary: faker.number.float({ min: 20000, max: 80000 }),
  }));

  // Insert Members and Staff to get IDs for relationships
  await prisma.member.createMany({ data: members, skipDuplicates: true });
  const createdMembers = await prisma.member.findMany();
  await prisma.staff.createMany({ data: staff, skipDuplicates: true });
  const createdStaff = await prisma.staff.findMany();

  // Generate up to 20 Classes
  const classes = Array.from({ length: 20 }, () => ({
    name: faker.helpers.arrayElement(['Yoga', 'Zumba', 'Pilates', 'CrossFit']),
    staffId: faker.helpers.arrayElement(createdStaff).id,
    schedule: faker.date.future(),
    maxCapacity: faker.number.int({ min: 10, max: 30 }),
  }));

  // Generate up to 20 Attendances
  const attendances = Array.from({ length: 20 }, () => ({
    memberId: faker.helpers.arrayElement(createdMembers).id,
    checkIn: faker.date.past(),
    checkOut: faker.helpers.maybe(() => faker.date.recent(), { probability: 0.7 }),
  }));

  // Generate up to 20 Equipment Records
  const equipment = Array.from({ length: 20 }, () => ({
    name: faker.helpers.arrayElement(['Treadmill', 'Dumbbells', 'Elliptical', 'Stationary Bike']),
    purchaseDate: faker.date.past({ years: 3 }),
    cost: faker.number.float({ min: 100, max: 5000 }),
    status: faker.helpers.arrayElement(['active', 'maintenance', 'retired']),
    lastMaintenance: faker.helpers.maybe(() => faker.date.recent(), { probability: 0.5 }),
    notes: faker.lorem.sentence(),
  }));

  // Insert Data
  await prisma.$transaction([
    prisma.class.createMany({ data: classes, skipDuplicates: true }),
    prisma.attendance.createMany({ data: attendances, skipDuplicates: true }),
    prisma.equipment.createMany({ data: equipment, skipDuplicates: true }),
  ]);

  console.log('Up to 20 records created for each table.');
}

main()
  .catch((e) => console.error('Error:', e))
  .finally(async () => await prisma.$disconnect());
