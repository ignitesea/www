import { ReactElement } from 'react';
import { GetStaticPropsResult } from 'next';
import { Box, Container, Text } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import Announcement from '../Components/Announcement';
import Hero from '../Components/Hero';
import Page from '../Components/Page';
import EventsGridList from '../Components/Events/GridList';
import { client, IndexQuery } from '../graphql';

export default function Index({ upcomingEvents, ...query }: IndexQuery): ReactElement {
  // The hero already shows the next upcoming main event, so we only need to show the event list section if there's
  // more than one upcoming event, or a minor upcoming event.
  const firstMainEvent = upcomingEvents?.items.filter((e) => e?.type === 'main event')[0];
  const showEventList = (
    upcomingEvents?.items
    && (
      (firstMainEvent && upcomingEvents.items.length > 1)
      || upcomingEvents.items.length > 0
    )
  );

  return (
    <Page>
      <Announcement query={query} />
      <Hero query={query} />
      {showEventList && (
        <Box bg="gray.100">
          <Container maxWidth="4xl" pt={8} pb={8}>
            <Text as="h2" fontWeight="bold" fontSize="xl" mb={4}>Upcoming Events</Text>
            <EventsGridList
              itemProps={{ bg: 'white', rounded: 'sm' }}
              events={upcomingEvents?.items}
            />
          </Container>
        </Box>
      )}
    </Page>
  );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<IndexQuery>> {
  const result = await client.index({ now: DateTime.utc().toISO() });
  return {
    props: result,
  }
}
