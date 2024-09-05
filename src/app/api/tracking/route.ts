import { DbTracking } from '@/app/server/db';
import { TrackingEventDto, validateTrackingEventDto } from '@/app/server/dto';
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

export async function POST(req: NextRequest) {
  let body: TrackingEventDto | unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: 'Invalid request body - not a json' }, { status: 400 });
  }
  console.log('~~~ body2', body);

  const { data, errors } = validateTrackingEventDto(body);
  if (!data) {
    return NextResponse.json({ message: 'Invalid request body', errors: errors }, { status: 400 });
  }

  await DbTracking.putEntity(data);
  return NextResponse.json({ message: 'Created' });
}

export async function DELETE() {
  await DbTracking.resetDb();
  return NextResponse.json({ message: 'DB Reset' });
}
