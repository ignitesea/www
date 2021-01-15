import { ReactElement } from 'react';
import { ChakraProps } from '@chakra-ui/system';
import { Text } from '@chakra-ui/react';
import VenueLink from '../VenueLink';
import { EventsAfterpartyInfoFragment } from './index.query';

interface AfterpartyInfoProps extends ChakraProps {
  event: EventsAfterpartyInfoFragment
}

export default function AfterpartyInfo({ event, ...props }: AfterpartyInfoProps): ReactElement {
  if (!event?.afterpartyVenue) return <></>;

  return (
    <Text {...props}>
      {event.afterpartyVenue.ageRestriction
        ? `${event.afterpartyVenue.ageRestriction} afterparty`
        : 'Afterparty'
      } at <VenueLink venue={event.afterpartyVenue} />
    </Text>
  )
}
