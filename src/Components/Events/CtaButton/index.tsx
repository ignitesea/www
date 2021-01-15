import { ReactElement } from 'react';
import { ChakraProps, ComponentWithAs } from '@chakra-ui/system';
import { DateTime } from 'luxon';
import { EventsCtaButtonFragment } from './index.query';
import { Box, Button, ButtonGroup, ButtonProps as ChakraButtonProps } from '@chakra-ui/react';

export interface CtaButtonProps extends ChakraProps {
  event: EventsCtaButtonFragment
  submitLocation?: 'bottom' | 'right' | 'none' | undefined | null
  submitProps?: ChakraButtonProps | undefined | null
  buyProps?: ChakraButtonProps | undefined | null
}

export default function CtaButton({
  event,
  submitLocation,
  submitProps,
  buyProps,
  ...props
}: CtaButtonProps): ReactElement {
  const now = DateTime.local();
  const areSubmissionsOpen = (
    (event.submissionsOpen && event.submissionsClose)
    && DateTime.fromISO(event.submissionsOpen) < now
    && DateTime.fromISO(event.submissionsClose) > now
  );
  if (areSubmissionsOpen && (submitLocation === 'bottom' || !submitLocation)) {
    return (
      <Box {...props}>
        <Box><BuyButton event={event} {...buyProps} /></Box>
        <Box><SubmitButton event={event} {...submitProps} /></Box>
      </Box>
    );
  } else if (areSubmissionsOpen && submitLocation === 'right') {
    return (
      <ButtonGroup {...props}>
        <BuyButton event={event} {...buyProps} />
        <SubmitButton event={event} {...submitProps} />
      </ButtonGroup>
    );
  }

  return <Box {...props}><BuyButton event={event} {...buyProps} /></Box>;
}

//
// Buttons
//

interface ButtonProps extends ChakraProps {
  event: EventsCtaButtonFragment
}

function SubmitButton({ event, ...props }: ButtonProps): ReactElement {
  return (
    <Button
      as="a"
      href="/submit"
      colorScheme="red"
      variant="solid"
      {...props}
    >
      Submit Talk
    </Button>
  );
}

function BuyButton({ event, ...props }: ButtonProps): ReactElement {
  const now = DateTime.local();

  // Calculate availability dates
  const firstSaleDate = !(event.regularOnSale || event.earlybirdOnSale)
    ? null
    : DateTime.fromISO(event.earlybirdOnSale || event.regularOnSale);

  const regularOnSale = !event.regularOnSale
    ? false
    : DateTime.fromISO(event.regularOnSale) < now;

  const earlybirdOnSale = !event.earlybirdOnSale
    ? false
    : (!regularOnSale && DateTime.fromISO(event.earlybirdOnSale) < now);

  const hasEventStarted = DateTime.fromISO(event.doorsAt || event.startsAt) < now;
  const haveSalesStarted = firstSaleDate && firstSaleDate < now;
  const price = (earlybirdOnSale ? event.earlybirdPrice : event.regularPrice) ?? event.regularPrice ?? 0;
  const canBuyTickets = (
    !event.soldOut
    && haveSalesStarted
    && (!hasEventStarted || event.ticketsAtDoor)
  );

  // Default text is to buy a ticket
  let text = price === 0
    ? 'Register'
    : `Buy Tickets ($${price.toFixed(0)}${earlybirdOnSale ? ' earlybird' : ''})`;

  if (event.soldOut) text = 'Sold Out';
  else if (!event.ticketsAtDoor && hasEventStarted) text = 'Sales Ended';
  else if (!haveSalesStarted) {
    text = firstSaleDate
      ? `On Sale ${firstSaleDate.toLocaleString({ day: 'numeric', month: 'numeric' })}`
      : `On Sale Soon`;
  }

  return (
    <Button
      colorScheme={canBuyTickets ? 'red' : 'gray'}
      bg={canBuyTickets ? 'red.800' : 'gray.200'}
      rounded="sm"
      variant="solid"
      as="a"
      href={canBuyTickets ? (event.link || undefined) : undefined}
      {...props}
    >
      {text}
    </Button>
  )
}
