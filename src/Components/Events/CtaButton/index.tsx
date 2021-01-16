import { ReactElement } from 'react';
import { ChakraProps } from '@chakra-ui/system';
import { Box, Button, ButtonGroup, ButtonProps as ChakraButtonProps } from '@chakra-ui/react';
import { EventsCtaButtonFragment } from './index.query';
import { eventLifecycle, EventLifecycle } from '../../../utils';

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
  const lifecycle = eventLifecycle(event);

  const buyButton = <BuyButton lifecycle={lifecycle} event={event} {...buyProps} />;
  const submitButton = <SubmitButton lifecycle={lifecycle} event={event} {...submitProps} />;

  if (lifecycle.acceptingSubmissions && (submitLocation === 'bottom' || !submitLocation)) {
    return <Box {...props}><Box>{buyButton}</Box><Box>{submitButton}</Box></Box>;
  } else if (lifecycle.acceptingSubmissions && submitLocation === 'right') {
    return <ButtonGroup {...props}>{buyButton}{submitButton}</ButtonGroup>;
  }

  return <Box {...props}>{buyButton}</Box>;
}

//
// Buttons
//

interface ButtonProps extends ChakraProps {
  event: EventsCtaButtonFragment
  lifecycle: EventLifecycle
}

function SubmitButton({ event, ...props }: ButtonProps): ReactElement {
  return (
    <Button
      as="a"
      href="/submit"
      colorScheme="red"
      variant="solid"
      rounded="sm"
      {...props}
    >
      Submit Talk
    </Button>
  );
}

function getBuyButtonText({
  onSaleLifecycle,
  earliestOnSale,
  currentPricingScheme,
  currentPrice
}: EventLifecycle): string {
  if (onSaleLifecycle === 'soon') return earliestOnSale
    ? `On Sale ${earliestOnSale.toLocaleString({ day: 'numeric', month: 'numeric' })}`
    : 'On Sale Soon';

  else if (onSaleLifecycle === 'on-sale') {
    if (currentPricingScheme === 'free') return 'Register';
    const displayPrice = Math.round(currentPrice || 0);
    return `Buy Tickets ($${displayPrice}${currentPricingScheme === 'early-bird' ? ' earlybird' : ''})`;
  }

  else if (onSaleLifecycle === 'sales-ended') return 'Sales Ended';
  else if (onSaleLifecycle === 'sold-out') return 'Sold Out';
  else if (onSaleLifecycle === 'event-ended') return 'Ended';

  return 'Error';
}

function BuyButton({ event, lifecycle, ...props }: ButtonProps): ReactElement {
  const canBuyTickets = lifecycle.onSaleLifecycle === 'on-sale';
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
      {getBuyButtonText(lifecycle)}
    </Button>
  )
}
