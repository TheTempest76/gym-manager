import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()


export async function GET() {
    try {
      const equipment = await prisma.equipment.findMany({
        where: {
          status: {
            in: ['active', 'maintenance'],
          },
        },
        orderBy: {
          lastMaintenance: 'asc',
        },
      });
      return NextResponse.json(equipment);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch equipment data' }, { status: 500 });
    }
  }