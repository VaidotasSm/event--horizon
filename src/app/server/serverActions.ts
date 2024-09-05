'use server';

import { redirect } from 'next/navigation';

export async function searchObjectEventsAction(data: FormData) {
  const id = data.get('id');
  const type = data.get('type');
  redirect(`/tracker/object?id=${id}&type=${type}`);
}
