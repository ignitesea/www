import { ReactElement } from 'react';
import { ChakraProps } from '@chakra-ui/system';
import { Box, Text, Link } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { eventLifecycle } from '../../utils';
import { AnnouncementFragment } from './index.query';

type AnnouncementUrgency = 'notice' | 'emergency';

export interface AnnouncementProps extends ChakraProps {
  query: AnnouncementFragment
}

export default function Announcement({ query, ...props }: AnnouncementProps): ReactElement {
  const info = getAnnouncementLinkAndText(query);
  if (!info) return <></>;

  return (
    <Box
      bg={info.type === 'emergency' ? 'red.900' : 'black'}
      color={info.type === 'emergency' ? 'red.100' : 'white'}
      d="block"
      as={info.link ? 'a' : undefined}
      href={info.link || undefined}
      p={2}
      textAlign="center"
      {...props}
    >
      <Text d="span">
        {info.text}{' '}
        {info.cta && (
          <Link textDecoration="underline" fontWeight="bold">{info.cta}</Link>
        )}
      </Text>
    </Box>
  )
}

function getAnnouncementLinkAndText(query: AnnouncementFragment): {
  link: string | null,
  text: string,
  cta: string | null,
  type: AnnouncementUrgency,
} | null {
  if (query.announcements?.items && query.announcements.items.length > 0) {
    const announcement = query.announcements.items[0]!;
    return {
      link: announcement.link || null,
      text: announcement.text!,
      cta: null,
      type: announcement.type as AnnouncementUrgency,
    };
  } else if (query.announcementUpcomingEvents?.items && query.announcementUpcomingEvents.items.length > 0) {
    const event = query.announcementUpcomingEvents.items[0]!;
    const { onSaleLifecycle, acceptingSubmissions } = eventLifecycle(event);

    if (!event.startsAt) return null;
    const text = `${event.title} is ${DateTime.fromISO(event.startsAt).toLocaleString(DateTime.DATE_MED)}.`;

    if (acceptingSubmissions) return {
      link: '/submit',
      text,
      cta: 'Submit your talk.',
      type: 'notice',
    };
    else if (onSaleLifecycle === 'on-sale' && event.link) return {
      link: event.link,
      text,
      cta: 'Buy your ticket.',
      type: 'notice',
    }
  }

  return null;
}
