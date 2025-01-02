import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
    request: Request,
    { params }: { params: { staffId: string } }
  ) {
    try {
      const classes = await prisma.class.findMany({
        where: {
          staffId: parseInt(params.staffId),
          status: 'scheduled',
        },
        include: {
          staff: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          schedule: 'asc',
        },
      });
      return NextResponse.json(classes);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch classes' }, { status: 500 });
    }
  }