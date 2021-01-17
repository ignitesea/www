import { ReactElement } from 'react';
import { ChakraProps } from '@chakra-ui/system';
import * as CSS from "csstype";
import { Box, Text } from '@chakra-ui/react';
import EventInfo from '../../Events/EventInfo';
import AfterpartyInfo from '../../Events/AfterpartyInfo';
import CtaButton from '../../Events/CtaButton';

import { HeroTextUpcomingFragment } from './index.query';

export interface TextExplainerProps extends ChakraProps {
  upcomingEvent: HeroTextUpcomingFragment
  shadowColor: CSS.Property.Color
}

export default function TextUpcoming({ upcomingEvent, shadowColor, ...props }: TextExplainerProps): ReactElement {
  const shadow = `2px 2px 1px ${shadowColor}`;
  return (
    <Box {...props}>
      <Text textShadow={shadow} as="h2" fontWeight="bold" fontSize="3xl" mb={4}>{upcomingEvent.title}</Text>
      <EventInfo textShadow={shadow} fontSize="lg" event={upcomingEvent} />
      <AfterpartyInfo textShadow={shadow} event={upcomingEvent} />
      <CtaButton
        event={upcomingEvent}
        mt={8}
        d="inline-block"
        buyProps={{
          boxShadow: shadow
        }}
        submitProps={{
          variant: 'text',
          p: 0,
          shadow,
        }}
      />
    </Box>
  )
}
