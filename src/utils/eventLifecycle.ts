import { DateTime } from 'luxon';
import { UtilsEventLifecycleFragment } from './eventLifecycle.query'

export type OnSaleLifecycle = 'soon' | 'on-sale' | 'sales-ended' | 'sold-out' | 'event-ended';
export type PricingScheme = 'free' | 'early-bird' | 'regular' | null;

export interface EventLifecycle {
  onSaleLifecycle: OnSaleLifecycle
  earliestOnSale: DateTime | null
  currentPricingScheme: PricingScheme
  currentPrice: number | null
  acceptingSubmissions: boolean
}

function maybeDates(dates: Record<string, any>): Record<string, DateTime | null> {
  return Object.keys(dates)
    .reduce((accum, d) => ({
      ...accum,
      [d]: dates[d] ? DateTime.fromISO(dates[d] as string) : null,
    }), {});
}

export default function eventLifecycle({
  earlybirdPrice,
  regularPrice,
  soldOut,
  ticketsAtDoor,
  ...dates
}: UtilsEventLifecycleFragment): EventLifecycle {
  const {
    regularOnSale,
    earlybirdOnSale,
    doorsAt,
    startsAt,
    endsAt,
    submissionOpen,
    submissionsClose
  } = maybeDates(dates);

  const earliestEventStart = doorsAt || startsAt;
  const earliestOnSale = earlybirdOnSale || regularOnSale;
  const now = DateTime.local();

  // Calculate submission lifecycle
  const acceptingSubmissions = (submissionOpen && submissionsClose && submissionOpen < now && submissionsClose > now)
    || false;

  // Calculate onsale lifecycle
  let onSaleLifecycle: OnSaleLifecycle = 'soon';
  if (earliestOnSale && earliestOnSale < now) onSaleLifecycle = 'on-sale';
  if (!ticketsAtDoor && earliestEventStart && earliestEventStart < now) onSaleLifecycle = 'sales-ended';
  if (soldOut) onSaleLifecycle = 'sold-out';
  if (endsAt && endsAt < now) onSaleLifecycle = 'event-ended';

  // Calculate ticket pricing lifecycle
  let currentPricingScheme: PricingScheme = null;
  if (onSaleLifecycle === 'on-sale') {
    const earlybirdPast = earlybirdOnSale && earlybirdOnSale < now;
    const regularPast = regularOnSale && regularOnSale < now;

    if (earlybirdPrice === 0 && regularPrice === 0) currentPricingScheme = 'free';
    else if (onSaleLifecycle === 'on-sale' && earlybirdPast && !regularPast) currentPricingScheme = 'early-bird';
    else currentPricingScheme = 'regular';
  }

  // Calculate ticket price
  const currentPrice = {
    free: 0,
    'early-bird': earlybirdPrice,
    regular: regularPrice,
    none: null,
  }[currentPricingScheme || 'none'] || null;


  return {
    onSaleLifecycle,
    earliestOnSale,
    currentPricingScheme,
    currentPrice,
    acceptingSubmissions,
  };
}
