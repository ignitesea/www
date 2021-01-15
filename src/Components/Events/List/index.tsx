import { ReactElement } from 'react';
import { ChakraProps } from '@chakra-ui/system';
import { Box, Grid, Text } from '@chakra-ui/react';
import AfterpartyInfo from '../AfterpartyInfo';
import EventInfo from '../EventInfo';
import CtaButton from '../CtaButton';
import { EventsListFragment } from './index.query';

export interface ListProps extends ChakraProps {
  events: (EventsListFragment | null)[] | null | undefined
  itemProps?: ChakraProps | null | undefined
}

export default function List({ events, itemProps, ...props }: ListProps): ReactElement {
  return (
    <Box {...props}>
      {events?.filter(Boolean).map((e) => e as EventsListFragment).map((e) => (
        <Box key={e.sys.id} p={4} mb={4} {...itemProps}>
          <Grid templateColumns={{ base: '3fr 2fr', md: '3fr 1fr' }} alignItems="center">
            <Box>
              <Text fontWeight="bold" fontSize="xl" as="h3">{e.title}</Text>
              <EventInfo event={e} />
              <AfterpartyInfo event={e} color="gray.600" />
            </Box>
            <CtaButton
              textAlign="center"
              event={e}
              submitProps={{ variant: 'ghost', p: 0, fontSize: 'sm', textDecoration: 'underline' }}
              submitLocation="bottom"
            />
          </Grid>
        </Box>
      ))}
    </Box>
  );
}
