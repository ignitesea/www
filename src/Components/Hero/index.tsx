import { ReactElement } from 'react';
import { ChakraProps } from '@chakra-ui/system';
import { Box, Container, Image } from '@chakra-ui/react';
import TextUpcoming from './TextUpcoming';
import TextExplainer from './TextExplainer';
import { HeroFragment } from './index.query';

export interface HeroProps extends ChakraProps {
  query: HeroFragment
  containerProps?: ChakraProps | undefined | null
  textProps?: ChakraProps | undefined | null
  imageProps?: ChakraProps | undefined | null
}

const HERO_IMAGE_MAX_LEFT_POSITION = '40%';

export default function Hero({ query, containerProps, textProps, imageProps, ...props }: HeroProps): ReactElement {
  const TextContentElement = query.heroTextUpcoming?.items && query.heroTextUpcoming.items.length > 0
    ? TextUpcoming
    : TextExplainer;

  const selectedImage = query.heroImages?.items[0];
  const backgroundColor = selectedImage?.backgroundColor || '#000';
  const foregroundColor = selectedImage?.foregroundColor || '#fff';
  const description = selectedImage?.description || undefined;
  const url = selectedImage?.photo?.url || '/default_hero.jpg';
  const backgroundColorAlpha = backgroundColor?.length === 7 ? `${backgroundColor}00` : `${backgroundColor}0`;

  return (
    <Box
      bg={backgroundColor}
      pt={32}
      pb={32}
      pl={4}
      pr={4}
      position="relative"
      {...props}
    >
      <Container
        maxWidth="5xl"
        position="relative"
        zIndex={200}
        {...containerProps}
      >
        <TextContentElement query={query} color={foregroundColor} {...textProps} />
      </Container>

      {/* This box provides the radial fade-out on the left-hand side of the hero graphic */}
      <Box
        position="absolute"
        top={0}
        right={0}
        bottom={0}
        left={{ base: 0, lg: HERO_IMAGE_MAX_LEFT_POSITION }}
        zIndex={100}
        backgroundImage={`radial-gradient(circle at 100%, ${backgroundColorAlpha} 80%, ${backgroundColor} 95%)`}
      />

      {/* This box holds the hero image */}
      <Box
        position="absolute"
        top={0}
        right={0}
        bottom={0}
        left={{ base: 0, lg: HERO_IMAGE_MAX_LEFT_POSITION }}
        zIndex={50}
        backgroundImage={`url(${url})`}
        backgroundSize="cover"
        backgroundPosition="50% 50%"
      />
    </Box>
  )
}
