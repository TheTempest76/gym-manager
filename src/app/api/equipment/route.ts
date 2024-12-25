import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
    try {
      const body = await request.json()
      const equipment = await prisma.equipment.create({
        data: {
          name: body.name,
          purchaseDate: new Date(body.purchaseDate),
          cost: body.cost,
          status: body.status || 'active',
          lastMaintenance: body.lastMaintenance ? new Date(body.lastMaintenance) : null,
          notes: body.notes
        }
      })
      return NextResponse.json(equipment)
    } catch (error) {
      return NextResponse.json({ error: 'Error creating equipment' }, { status: 500 })
    }
  }
  
  export async function GET() {
    try {
      const equipment = await prisma.equipment.findMany()
      return NextResponse.json(equipment)
    } catch (error) {
      return NextResponse.json({ error: 'Error fetching equipment' }, { status: 500 })
    }
  }