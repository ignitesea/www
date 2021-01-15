import { ReactElement } from 'react';
import { GetStaticPropsResult } from 'next';
import Page from '../Components/Page';
import EventsList from '../Components/Events/List';
import { Client } from '../graphql';
import { IndexQuery, getSdk } from './index.query';
import { Box, Container } from '@chakra-ui/react';

export default function Index({ upcomingEvents }: IndexQuery): ReactElement {
  // We'll show the next upcoming main event in the hero section, and then if there's more than one upcoming event,
  // we'll also show a list of all upcoming events.
  const firstMainEvent = upcomingEvents?.items.filter((e) => e?.type === 'main event')[0];
  const eventsListSection = firstMainEvent && upcomingEvents && upcomingEvents.items.length > 1
    ? (
      <Box bg="gray.100">
        <Container maxWidth="4xl" pt={8} pb={8}>
          <EventsList
            itemProps={{ bg: 'white', rounded: 'sm' }}
            events={upcomingEvents?.items}
          />
        </Container>
      </Box>
    ) : <></>;

  return (
    <Page>
      {eventsListSection}
    </Page>
  );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<IndexQuery>> {
  const result = await getSdk(Client).index();
  return {
    props: result,
  }
}
