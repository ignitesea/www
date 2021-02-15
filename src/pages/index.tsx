import { ReactElement } from 'react';
import { GetStaticPropsResult } from 'next';
import { Box, Container, Text } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { fetchPostArchive, Post } from '../utils/wordpress';
import Announcement from '../Components/Announcement';
import Hero from '../Components/Hero';
import Page from '../Components/Page';
import EventsGridList from '../Components/Events/GridList';
import ExplainText from '../Components/ExplainText';
import AboutText from '../Components/AboutText';
import { PreviewList } from '../Components/Blog';
import { client, IndexQuery } from '../graphql';

interface IndexProps {
  query: IndexQuery
  recentBlogPosts: Post[]
}

export default function Index(
  {
    query: { upcomingEvents, ...query },
    recentBlogPosts
  }: IndexProps
): ReactElement {
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
      <Hero query={query} upcomingEvent={firstMainEvent} />
      <Box bg="black">
        <Container maxWidth="4xl" pt={8} pb={8}>
          {firstMainEvent ? (
            <ExplainText color="white" query={query} />
          ) : (
            <Text as="h2" fontSize="xl" fontWeight="bold">Past Talks</Text>
          )}
        </Container>
      </Box>

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

      <Box bg="white">
        <Container maxWidth="4xl" pt={8} pb={8}>
          <Text as="h2" fontWeight="bold" fontSize="xl" mb={4}>News</Text>
          <PreviewList posts={recentBlogPosts} />
        </Container>
      </Box>

      <Box bg="gray.100">
        <Container maxWidth="4xl" pt={8} pb={8} textAlign="center">
          <AboutText query={query} />
        </Container>
      </Box>
    </Page>
  );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<IndexProps>> {
  const query = await client.index({ now: DateTime.utc().toISO() });
  const recentBlogPosts = await fetchPostArchive({ perPage: 3 });

  console.log(query);

  return {
    props: {
      query,
      recentBlogPosts,
    },
    revalidate: 60,
  }
}
