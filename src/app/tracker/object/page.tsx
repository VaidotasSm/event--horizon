/* eslint-disable @typescript-eslint/no-explicit-any */
import { DbTracking } from '@/app/server/db';
import { Box, Container, Link as MuiLink, Typography } from '@mui/material';
import Link from 'next/link';
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
      {invalidParams && (
        <Typography variant="h4" color="error">
          No ID or Type specified
        </Typography>
      )}

      {!invalidParams && events.length === 0 && (
        <>
          <Typography variant="h4" color="warning">
            Object has no events
          </Typography>
          <MuiLink component={Link} href={`/?id=${id}&type=${type}`}>
            Back
          </MuiLink>
        </>
      )}
      {!invalidParams && (
        <Box
          sx={{
            width: '80vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography>ID - {id}</Typography>
          <Typography>Type - {type}</Typography>

          <EventsTable events={events} />
        </Box>
      )}
    </Container>
  );
}
