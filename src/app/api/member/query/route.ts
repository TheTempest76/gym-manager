
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const membershipType = searchParams.get('membershipType');
  const status = searchParams.get('status');

  try {
    const members = await prisma.member.findMany({
      where: {
        membershipType: membershipType ?? undefined,
        status: status ?? undefined,
      },
      select: {
        id: true,
        name: true,
        membershipType: true,
        status: true,
      },
    });
    return NextResponse.json(members);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 });
  }
}
