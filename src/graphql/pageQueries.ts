import * as Types from './types';

import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type EventsAfterpartyInfoFragment = (
  { __typename?: 'Event' }
  & { afterpartyVenue?: Types.Maybe<(
    { __typename?: 'Venue' }
    & Pick<Types.Venue, 'name' | 'ageRestriction'>
    & EventsVenueLinkFragment
  )> }
);

export type EventsCtaButtonFragment = (
  { __typename?: 'Event' }
  & Pick<Types.Event, 'link' | 'doorsAt' | 'startsAt' | 'ticketsAtDoor' | 'soldOut' | 'submissionsOpen' | 'submissionsClose' | 'earlybirdOnSale' | 'earlybirdPrice' | 'regularOnSale' | 'regularPrice'>
);

export type EventsEventInfoFragment = (
  { __typename?: 'Event' }
  & Pick<Types.Event, 'doorsAt' | 'startsAt'>
  & { venue?: Types.Maybe<(
    { __typename?: 'Venue' }
    & Pick<Types.Venue, 'name' | 'ageRestriction'>
    & EventsVenueLinkFragment
  )>, afterpartyVenue?: Types.Maybe<(
    { __typename?: 'Venue' }
    & Pick<Types.Venue, 'name' | 'ageRestriction'>
    & EventsVenueLinkFragment
  )> }
);

export type EventsGridListFragment = (
  { __typename?: 'Event' }
  & Pick<Types.Event, 'title'>
  & { previewImage?: Types.Maybe<(
    { __typename?: 'Asset' }
    & { eventsGrid: Types.Asset['url'] }
  )>, sys: (
    { __typename?: 'Sys' }
    & Pick<Types.Sys, 'id'>
  ) }
  & EventsEventInfoFragment
  & EventsAfterpartyInfoFragment
  & EventsCtaButtonFragment
);

export type EventsListFragment = (
  { __typename?: 'Event' }
  & Pick<Types.Event, 'title'>
  & { sys: (
    { __typename?: 'Sys' }
    & Pick<Types.Sys, 'id'>
  ) }
  & EventsEventInfoFragment
  & EventsAfterpartyInfoFragment
  & EventsCtaButtonFragment
);

export type EventsVenueLinkFragment = (
  { __typename?: 'Venue' }
  & Pick<Types.Venue, 'name' | 'addressLine1' | 'addressLine2' | 'city' | 'state' | 'postalCode'>
);

export type HeroTextExplainerFragment = (
  { __typename?: 'Query' }
  & { heroTitle?: Types.Maybe<(
    { __typename?: 'KeyValueCollection' }
    & { items: Array<Types.Maybe<(
      { __typename?: 'KeyValue' }
      & Pick<Types.KeyValue, 'value'>
    )>> }
  )>, heroText?: Types.Maybe<(
    { __typename?: 'KeyValueCollection' }
    & { items: Array<Types.Maybe<(
      { __typename?: 'KeyValue' }
      & Pick<Types.KeyValue, 'value'>
    )>> }
  )> }
);

export type HeroTextUpcomingFragment = (
  { __typename?: 'Query' }
  & { heroTextUpcoming?: Types.Maybe<(
    { __typename?: 'EventCollection' }
    & { items: Array<Types.Maybe<(
      { __typename?: 'Event' }
      & Pick<Types.Event, 'title'>
      & EventsEventInfoFragment
      & EventsAfterpartyInfoFragment
      & EventsCtaButtonFragment
    )>> }
  )> }
);

export type HeroFragment = (
  { __typename?: 'Query' }
  & { heroImages?: Types.Maybe<(
    { __typename?: 'HeroImageCollection' }
    & { items: Array<Types.Maybe<(
      { __typename?: 'HeroImage' }
      & Pick<Types.HeroImage, 'backgroundColor' | 'foregroundColor' | 'description'>
      & { photo?: Types.Maybe<(
        { __typename?: 'Asset' }
        & Pick<Types.Asset, 'url'>
      )> }
    )>> }
  )> }
  & HeroTextExplainerFragment
  & HeroTextUpcomingFragment
);

export type IndexQueryVariables = Types.Exact<{
  now: Types.Scalars['DateTime'];
}>;


export type IndexQuery = (
  { __typename?: 'Query' }
  & { upcomingEvents?: Types.Maybe<(
    { __typename?: 'EventCollection' }
    & { items: Array<Types.Maybe<(
      { __typename?: 'Event' }
      & Pick<Types.Event, 'type'>
      & EventsListFragment
      & EventsGridListFragment
    )>> }
  )> }
  & HeroFragment
);

export const EventsVenueLinkFragmentDoc = gql`
    fragment EventsVenueLink on Venue {
  name
  addressLine1
  addressLine2
  city
  state
  postalCode
}
    `;
export const EventsEventInfoFragmentDoc = gql`
    fragment EventsEventInfo on Event {
  venue {
    ...EventsVenueLink
    name
    ageRestriction
  }
  afterpartyVenue {
    ...EventsVenueLink
    name
    ageRestriction
  }
  doorsAt
  startsAt
}
    ${EventsVenueLinkFragmentDoc}`;
export const EventsAfterpartyInfoFragmentDoc = gql`
    fragment EventsAfterpartyInfo on Event {
  afterpartyVenue {
    ...EventsVenueLink
    name
    ageRestriction
  }
}
    ${EventsVenueLinkFragmentDoc}`;
export const EventsCtaButtonFragmentDoc = gql`
    fragment EventsCtaButton on Event {
  link
  doorsAt
  startsAt
  ticketsAtDoor
  soldOut
  submissionsOpen
  submissionsClose
  earlybirdOnSale
  earlybirdPrice
  regularOnSale
  regularPrice
}
    `;
export const EventsGridListFragmentDoc = gql`
    fragment EventsGridList on Event {
  ...EventsEventInfo
  ...EventsAfterpartyInfo
  ...EventsCtaButton
  title
  previewImage {
    eventsGrid: url(transform: {width: 400, height: 300, resizeStrategy: FILL})
  }
  sys {
    id
  }
}
    ${EventsEventInfoFragmentDoc}
${EventsAfterpartyInfoFragmentDoc}
${EventsCtaButtonFragmentDoc}`;
export const EventsListFragmentDoc = gql`
    fragment EventsList on Event {
  ...EventsEventInfo
  ...EventsAfterpartyInfo
  ...EventsCtaButton
  title
  sys {
    id
  }
}
    ${EventsEventInfoFragmentDoc}
${EventsAfterpartyInfoFragmentDoc}
${EventsCtaButtonFragmentDoc}`;
export const HeroTextExplainerFragmentDoc = gql`
    fragment HeroTextExplainer on Query {
  heroTitle: keyValueCollection(where: {key: "hero.title"}, limit: 1) {
    items {
      value
    }
  }
  heroText: keyValueCollection(where: {key: "hero.text"}, limit: 1) {
    items {
      value
    }
  }
}
    `;
export const HeroTextUpcomingFragmentDoc = gql`
    fragment HeroTextUpcoming on Query {
  heroTextUpcoming: eventCollection(
    where: {type: "main event", endsAt_gt: $now}
    limit: 1
  ) {
    items {
      ...EventsEventInfo
      ...EventsAfterpartyInfo
      ...EventsCtaButton
      title
    }
  }
}
    ${EventsEventInfoFragmentDoc}
${EventsAfterpartyInfoFragmentDoc}
${EventsCtaButtonFragmentDoc}`;
export const HeroFragmentDoc = gql`
    fragment Hero on Query {
  ...HeroTextExplainer
  ...HeroTextUpcoming
  heroImages: heroImageCollection(limit: 10) {
    items {
      backgroundColor
      foregroundColor
      description
      photo {
        url(transform: {width: 960, height: 600, resizeStrategy: FILL})
      }
    }
  }
}
    ${HeroTextExplainerFragmentDoc}
${HeroTextUpcomingFragmentDoc}`;
export const IndexDocument = gql`
    query index($now: DateTime!) {
  ...Hero
  upcomingEvents: eventCollection(order: [startsAt_ASC], where: {endsAt_gt: $now}) {
    items {
      ...EventsList
      ...EventsGridList
      type
    }
  }
}
    ${HeroFragmentDoc}
${EventsListFragmentDoc}
${EventsGridListFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    index(variables: IndexQueryVariables, requestHeaders?: Headers): Promise<IndexQuery> {
      return withWrapper(() => client.request<IndexQuery>(print(IndexDocument), variables, requestHeaders));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;