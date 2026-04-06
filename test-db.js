const { PrismaClient } = require('@prisma/client');

async function testConnection() {
  const prisma = new PrismaClient();
  try {
    await prisma.$connect();
    console.log('Database connected successfully');

    // Try to fetch projects
    const projects = await prisma.project.findMany({ include: { tasks: true } });
    console.log('Projects:', projects);

    // Try to fetch tasks
    const tasks = await prisma.task.findMany({ include: { project: true } });
    console.log('Tasks:', tasks);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();