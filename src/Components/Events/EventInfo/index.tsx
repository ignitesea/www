import { ReactElement } from 'react';
import { ChakraProps } from '@chakra-ui/system';
import { Text } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import VenueLink from '../VenueLink';
import { EventsEventInfoFragment } from './index.query';

export interface EventInfoProps extends ChakraProps {
  event: EventsEventInfoFragment
  separatorStyle?: 'middot' | 'break' | undefined | null
  linkProps?: ChakraProps | undefined | null
}

export default function EventInfo({ event, linkProps, separatorStyle, ...props }: EventInfoProps): ReactElement {
  const startDate = DateTime.fromISO(event.doorsAt || event.startsAt).toLocaleString({
    day: 'numeric',
    month: 'short',
  });

  const startTime = DateTime.fromISO(event.doorsAt || event.startsAt).toLocaleString({
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <Text {...props}>
        <VenueLink venue={event.venue} {...linkProps} />
        {separatorStyle === 'break' ? <br /> : <>&ensp;&bull;&ensp;</>}
        {startDate}
        {separatorStyle !== 'break' && <>&ensp;&bull;&ensp;</>}
        {startTime}{event.doorsAt && ' doors'}
        {event.venue?.ageRestriction && (<>&ensp;&bull;&ensp;{event.venue.ageRestriction}</>)}
    </Text>
  )
}
