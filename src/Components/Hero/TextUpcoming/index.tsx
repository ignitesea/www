import { ReactElement } from 'react';
import { ChakraProps } from '@chakra-ui/system';
import { Box, Text } from '@chakra-ui/react';
import EventInfo from '../../Events/EventInfo';
import AfterpartyInfo from '../../Events/AfterpartyInfo';
import CtaButton from '../../Events/CtaButton';

import { HeroTextUpcomingFragment } from './index.query';

export interface TextExplainerProps extends ChakraProps {
  query: HeroTextUpcomingFragment
}

export default function TextExplainer({ query, ...props }: TextExplainerProps): ReactElement {
  const event = query.heroTextUpcoming?.items[0];
  if (!event) return <></>;

  return (
    <Box {...props}>
      <Text as="h2" fontWeight="bold" fontSize="3xl" mb={4}>{event.title}</Text>
      <EventInfo fontSize="lg" event={event} />
      <AfterpartyInfo event={event} />
      <CtaButton
        event={event}
        mt={8}
        d="inline-block"
        submitProps={{
          variant: 'text',
          color: props.color,
          p: 0,
        }}
      />
    </Box>
  )
}
