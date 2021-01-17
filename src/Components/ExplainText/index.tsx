import { ReactElement } from 'react';
import { ChakraProps } from '@chakra-ui/system';
import { Box, Text } from '@chakra-ui/react';
import { ExplainTextFragment } from './index.query';

export interface ExplainTextProps extends ChakraProps {
  query: ExplainTextFragment
  headingProps?: ChakraProps | undefined | null
  textProps?: ChakraProps | undefined | null
}

export default function ExplainText({ query, headingProps, textProps, ...props }: ExplainTextProps): ReactElement {
  return (
    <Box {...props}>
      <Text
        as="h2"
        fontSize="xl"
        fontWeight="bold"
        mb={4}
        {...headingProps}
      >
        {query.explainTextTitle?.items[0]?.value}
      </Text>
      <Text
        fontSize="md"
        {...textProps}
      >
        {query.explainTextText?.items[0]?.value}
      </Text>
    </Box>
  )
}
