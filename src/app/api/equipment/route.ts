import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const equipment = await prisma.equipment.create({
      data: {
        name: body.name,
        purchaseDate: new Date(body.purchaseDate), // Convert purchaseDate to Date
        cost: Number(body.cost), // Convert cost to number
        status: body.status || 'active',
        notes: body.notes || null
      }
    })
    
    return NextResponse.json(equipment)
  } catch (error) {
    console.error('Error creating equipment:', error)
    return NextResponse.json({ error: 'Error creating equipment', details: error }, { status: 500 })
  }
}

export async function GET() {
  try {
    const equipment = await prisma.equipment.findMany()
    return NextResponse.json(equipment)
  } catch (error) {
    console.error('Error fetching equipment:', error)
    return NextResponse.json({ error: 'Error fetching equipment' }, { status: 500 })
  }
} 