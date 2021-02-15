import { ReactElement } from 'react';
import { ChakraProps } from '@chakra-ui/system';
import { Box, Text, Image } from '@chakra-ui/react';
import { AboutTextFragment } from './index.query';

export interface AboutTextProps extends ChakraProps {
  query: AboutTextFragment
  headingProps?: ChakraProps | undefined | null
  textProps?: ChakraProps | undefined | null
}

export default function AboutText({ query, headingProps, textProps, ...props }: AboutTextProps): ReactElement {
  return (
    <Box {...props}>
      {/* About */}
      <Text
        as="h2"
        fontSize="xl"
        fontWeight="bold"
        mb={4}
        {...headingProps}
      >
        {query.aboutTextTitle?.items[0]?.value}
      </Text>
      <Text
        fontSize="md"
        {...textProps}
      >
        {query.aboutTextText?.items[0]?.value}
      </Text>

      {/* Sponsors */}
      <Box>
        {query.sponsorCollection?.items?.map((sponsor) => (
          <Box
            as="a"
            href={sponsor?.link || undefined}
            target="_blank"
          >
            <Image
              d="inline-block"
              maxHeight={12}
              m={8}
              src={sponsor?.logo?.url || undefined}
              alt={sponsor?.name || undefined}
            />
          </Box>
        ))}
      </Box>
    </Box>
  )
}
