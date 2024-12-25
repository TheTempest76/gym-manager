import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Convert string values to appropriate types
    const class_ = await prisma.class.create({
      data: {
        name: body.name,
        staffId: Number(body.staffId), // Convert staffId to number
        schedule: new Date(body.schedule), // Convert schedule to Date
        maxCapacity: Number(body.maxCapacity), // Convert maxCapacity to number
        currentCount: 0,
        status: body.status || 'scheduled'
      }
    })
    
    return NextResponse.json(class_)
  } catch (error) {
    console.error('Error creating class:', error)
    return NextResponse.json({ error: 'Error creating class', details: error }, { status: 500 })
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
    console.error('Error fetching classes:', error)
    return NextResponse.json({ error: 'Error fetching classes' }, { status: 500 })
  }
}