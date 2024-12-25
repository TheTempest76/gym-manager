import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
    try {
      const body = await request.json()
      const class_ = await prisma.class.create({
        data: {
          name: body.name,
          staffId: body.staffId,
          schedule: new Date(body.schedule),
          maxCapacity: body.maxCapacity,
          currentCount: 0,
          status: body.status || 'scheduled'
        }
      })
      return NextResponse.json(class_)
    } catch (error) {
      return NextResponse.json({ error: 'Error creating class' }, { status: 500 })
    }
  }
  
  export async function GET() {
    try {
      const classes = await prisma.class.findMany({
        include: {
          staff: true
        }
      })
      return NextResponse.json(classes)
    } catch (error) {
      return NextResponse.json({ error: 'Error fetching classes' }, { status: 500 })
    }
  }
  