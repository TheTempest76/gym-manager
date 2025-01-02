import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const member = await prisma.member.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        membershipType: body.membershipType,
        status: body.status || 'active'
      }
    })
    return NextResponse.json(member)
  } catch (error) {
    return NextResponse.json({ error: 'Error creating member' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const members = await prisma.member.findMany({
      include: {
        attendances: true
      }
    })
    return NextResponse.json(members)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching members' }, { status: 500 })
  }
}

