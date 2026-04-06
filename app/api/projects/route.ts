import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: { tasks: true, createdByUser: { select: { username: true, id: true } } },
    });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin
    if (session.role !== 'admin') {
      return NextResponse.json({ error: 'Only admins can create projects' }, { status: 403 });
    }

    const { name } = await request.json();

    if (!name) {
      return NextResponse.json({ error: 'Project name is required' }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: { 
        name,
        createdBy: session.userId as number,
      },
      include: { 
        tasks: true,
        createdByUser: { select: { username: true, id: true } }
      },
    });
    return NextResponse.json(project);
  } catch (error) {
    console.error('Create project error:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}