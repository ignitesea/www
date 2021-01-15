import { ReactElement } from 'react';
import { Link } from '@chakra-ui/react';
import { ChakraProps } from '@chakra-ui/system';
import { EventsVenueLinkFragment } from './index.query';

export interface VenueLinkProps extends ChakraProps {
  venue?: EventsVenueLinkFragment | null | undefined
}

const GOOGLE_MAP_BASE = `https://www.google.com/maps`;

export default function VenueLink({ venue, ...props }: VenueLinkProps): ReactElement {
  // Don't make a link if there's nothing to link to (such as for TBA and online events).
  if (!venue || !venue.name) return <>TBA</>;
  if (!venue.addressLine1) return <>venue.name</>;

  return (
    <Link
      href={makeGoogleMapsLink(venue)}
      target="_blank"
      rel="noopener"
      textDecoration="underline"
      {...props}
    >
      {venue.name}
    </Link>
  );
}

function makeGoogleMapsLink(venue: EventsVenueLinkFragment): string {
  const q = [
    venue.addressLine1,
    venue.addressLine2,
    venue.city,
    venue.state,
    venue.postalCode,
  ].filter(Boolean).join(', ');
  return `${GOOGLE_MAP_BASE}?q=${encodeURIComponent(q)}`;
}
