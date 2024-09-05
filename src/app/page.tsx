/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchObjectForm } from './SearchObjectForm';
import { searchObjectEventsAction } from './server/serverActions';

export default async function HomePage(props: any) {
  const id = props.searchParams['id'];
  const type = props.searchParams['type'];

  return (
    <form action={searchObjectEventsAction}>
      <SearchObjectForm initialId={id} initialType={type} />
    </form>
  );
}
