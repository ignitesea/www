import { ReactElement } from 'react';
import { ChakraProps } from '@chakra-ui/system';
import { Box, Text } from '@chakra-ui/react';
import { HeroTextExplainerFragment } from './index.query';

export interface TextExplainerProps extends ChakraProps {
  query: HeroTextExplainerFragment
}

export default function TextExplainer({ query, ...props }: TextExplainerProps): ReactElement {
  const title = query.heroTitle?.items[0]?.value || 'Enlighten us, but make it quick.';
  const text = query.heroText?.items[0]?.value || '5 minutes and 20 auto-advancing slides. Join us for fun talks!';

  return (
    <Box {...props}>
      <Text as="h2" fontWeight="bold" fontSize="2xl">{title}</Text>
      <Text>{text}</Text>
    </Box>
  )
}
