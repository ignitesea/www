import { ReactElement } from 'react';
import { ChakraProps } from '@chakra-ui/system';
import { Container, Text } from '@chakra-ui/react';
import * as CSS from "csstype";
import { HeroTextExplainerFragment } from './index.query';

export interface TextExplainerProps extends ChakraProps {
  query: HeroTextExplainerFragment
  shadowColor: CSS.Property.Color
}

export default function TextExplainer({ query, shadowColor, ...props }: TextExplainerProps): ReactElement {
  const title = query.heroTitle?.items[0]?.value || 'Enlighten us, but make it quick.';
  const text = query.heroText?.items[0]?.value || '5 minutes and 20 auto-advancing slides. Join us for fun talks!';


  return (
    <Container textAlign="center" textShadow={`2px 2px 1px ${shadowColor}`} {...props}>
      <Text as="h2" fontWeight="bold" fontSize="3xl" mb={4}>{title}</Text>
      <Text fontSize="lg">{text}</Text>
    </Container>
  )
}
