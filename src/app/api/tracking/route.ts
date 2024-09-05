import { DbTracking } from '@/app/server/db';
import { TrackingEventDto } from '@/app/server/dto';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  if (!id) {
    return NextResponse.json({ message: '"id" must be provided' }, { status: 400 });
  }
  const type = req.nextUrl.searchParams.get('type');
  if (!type) {
    return NextResponse.json({ message: '"type" must be provided' }, { status: 400 });
  }

  const events = await DbTracking.getEntities(id, type);
  return NextResponse.json({ events });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (!validateEventReq(body)) {
    return NextResponse.json({ message: 'incorrect request body' }, { status: 400 });
  }

  await DbTracking.putEntity(body);
  return NextResponse.json({ message: 'Created' });
}

export async function DELETE() {
  await DbTracking.resetDb();
  return NextResponse.json({ message: 'DB Reset' });
}

function validateEventReq(body: object): body is TrackingEventDto {
  return true;
}
