import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

function getTaskIdFromRequest(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();
  return id ? parseInt(id, 10) : NaN;
}

export async function DELETE(request: NextRequest) {
  try {
    const taskId = getTaskIdFromRequest(request);
    if (!taskId) {
      return NextResponse.json({ error: 'Invalid task id' }, { status: 400 });
    }

    await prisma.task.delete({
      where: { id: taskId },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const taskId = getTaskIdFromRequest(request);
    if (!taskId) {
      return NextResponse.json({ error: 'Invalid task id' }, { status: 400 });
    }

    const { completed } = await request.json();
    const task = await prisma.task.update({
      where: { id: taskId },
      data: { completed },
      include: { project: true },
    });
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
}