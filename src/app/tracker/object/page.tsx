/* eslint-disable @typescript-eslint/no-explicit-any */
import { DbTracking } from '@/app/server/db';
import { Container, Typography } from '@mui/material';
import { EventsTable } from './EventsTable';

export default async function ObjectPage(props: any) {
  const id = props.searchParams['id'];
  const type = props.searchParams['type'];
  const invalidParams = !id || !type;
  const events = invalidParams ? [] : await DbTracking.getEntities(id, type);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h2">Object Events</Typography>

      {invalidParams && (
        <Typography variant="h4" color="error">
          No ID or Type specified
        </Typography>
      )}

      {!invalidParams && <EventsTable events={events} />}
    </Container>
  );
}
