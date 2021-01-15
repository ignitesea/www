import { ReactElement } from 'react';
import { ChakraProps } from '@chakra-ui/system';
import { Text } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import VenueLink from '../VenueLink';
import { EventsEventInfoFragment } from './index.query';

export interface EventInfoProps extends ChakraProps {
  event: EventsEventInfoFragment
  linkProps?: ChakraProps | undefined | null
}

export default function EventInfo({ event, linkProps, ...props }: EventInfoProps): ReactElement {
  const startTime = DateTime.fromISO(event.doorsAt || event.startsAt).toLocaleString({
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <Text {...props}>
        <VenueLink venue={event.venue} {...linkProps} />
        &thinsp;&middot;&thinsp;
        {startTime}
        {event.venue?.ageRestriction && (<>&thinsp;&middot;&thinsp;{event.venue.ageRestriction}</>)}
    </Text>
  )
}
