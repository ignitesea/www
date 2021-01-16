import { ReactElement } from 'react';
import { ChakraProps } from '@chakra-ui/system';
import { Box, AspectRatio, Grid, Image, Text } from '@chakra-ui/react';
import EventInfo from '../EventInfo';
import AfterpartyInfo from '../AfterpartyInfo';
import CtaButton from '../CtaButton';
import { EventsGridListFragment } from './index.query';

export interface GridListProps extends ChakraProps {
  events: (EventsGridListFragment | null)[] | null | undefined
  itemProps?: ChakraProps | null | undefined
  textProps?: ChakraProps | null | undefined
}

export default function GridList({ events, itemProps, textProps, ...props }: GridListProps): ReactElement {
  return (
    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }} gap={4} {...props}>
      {events?.filter(Boolean).map((e) => e as EventsGridListFragment).map((e) => (
        <Box key={e.sys.id} mb={4} {...itemProps}>
          <AspectRatio ratio={4/3}>
            {e.previewImage?.eventsGrid ? (
              <Image src={e.previewImage.eventsGrid} alt="" bg="gray.100" />
            ) : (
              <Box bg="gray.300" />
            )}
          </AspectRatio>
          <Box p={4} {...textProps}>
            <Box mb={4}>
              <Text fontWeight="bold" fontSize="xl" as="h3">{e.title}</Text>
              <EventInfo event={e} separatorStyle="break" />
              <AfterpartyInfo event={e} color="gray.600" />
            </Box>
            <CtaButton
              event={e}
              submitProps={{ variant: 'ghost', p: 0, fontSize: 'sm', textDecoration: 'underline' }}
              submitLocation="bottom"
            />
          </Box>
        </Box>
      ))}
    </Grid>
  );
}
