import "dotenv/config";
import { PrismaClient } from "./generated/prisma";
import { USERS, AREAS, TICKETS } from "./seed-data/base";

const prisma = new PrismaClient();

async function seedUsers() {
  for (const u of USERS) {
    await prisma.user.upsert({
      where: { id: u.id },
      update: { name: u.name, email: u.email },
      create: { id: u.id, name: u.name, email: u.email },
    });
  }
}

async function seedAreas() {
  for (const a of AREAS) {
    await prisma.area.upsert({
      where: { id: a.id },
      update: { name: a.name },
      create: { id: a.id, name: a.name },
    });
  }
}

async function seedTickets() {
  for (const t of TICKETS) {
    await prisma.ticket.create({
      data: {
        title: t.title,
        status: t.status,
        priority: t.priority,
        user: { connect: { id: t.userId } },
        area: { connect: { id: t.areaId } },
        createdAt: t.createdAt ?? new Date(),
      },
    });
  }
}

async function clearAll() {
  await prisma.ticket.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.area.deleteMany({});
}

async function main() {
  console.log(">>> Seeding database...");
  await clearAll();

  await seedUsers();
  await seedAreas();
  await seedTickets();

  console.log(">>> Seed completed.");
}

main()
  .catch((e) => {
    console.error(">>> Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
