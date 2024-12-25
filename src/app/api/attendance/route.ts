import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
    try {
      const body = await request.json()
      const attendance = await prisma.attendance.create({
        data: {
          memberId: body.memberId,
          checkIn: new Date(),
          checkOut: body.checkOut ? new Date(body.checkOut) : null
        }
      })
      return NextResponse.json(attendance)
    } catch (error) {
      return NextResponse.json({ error: 'Error creating attendance' }, { status: 500 })
    }
  }
  
  export async function GET() {
    try {
      const attendance = await prisma.attendance.findMany({
        include: {
          member: true
        }
      })
      return NextResponse.json(attendance)
    } catch (error) {
      return NextResponse.json({ error: 'Error fetching attendance' }, { status: 500 })
    }
  }