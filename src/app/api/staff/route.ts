import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export async function POST(request: Request) {
    try {
      const body = await request.json()
      const staff = await prisma.staff.create({
        data: {
          name: body.name,
          email: body.email,
          phone: body.phone,
          role: body.role,
          salary: body.salary,
          status: body.status || 'active'
        }
      })
      return NextResponse.json(staff)
    } catch (error) {
      return NextResponse.json({ error: 'Error creating staff' }, { status: 500 })
    }
  }
  
  export async function GET() {
    try {
      const staff = await prisma.staff.findMany({
        include: {
          classes: true
        }
      })
      return NextResponse.json(staff)
    } catch (error) {
      return NextResponse.json({ error: 'Error fetching staff' }, { status: 500 })
    }
  }
  