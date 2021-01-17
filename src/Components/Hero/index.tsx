import { ReactElement, useReducer, useEffect } from 'react';
import { ChakraProps } from '@chakra-ui/system';
import { Box, Container, Image } from '@chakra-ui/react';
import TextUpcoming from './TextUpcoming';
import TextExplainer from './TextExplainer';
import { HeroFragment } from './index.query';
import { HeroTextUpcomingFragment } from './TextUpcoming/index.query';

export interface HeroProps extends ChakraProps {
  query: HeroFragment
  upcomingEvent?: HeroTextUpcomingFragment | undefined | null
  containerProps?: ChakraProps | undefined | null
  textProps?: ChakraProps | undefined | null
  imageProps?: ChakraProps | undefined | null
}

const CYCLE_INTERVAL = 7000;
const TRANSITION = 'all ease-in-out 2s';

export default function Hero({
  query,
  upcomingEvent,
  containerProps,
  textProps,
  imageProps,
  ...props
}: HeroProps): ReactElement {
  const TextContentElement = upcomingEvent ? TextUpcoming : TextExplainer;

  const allImages = query.heroImages?.items && query.heroImages.items.length > 0
    ? query.heroImages.items
    : [{
      backgroundColor: '#000',
      foregroundColor: '#fff',
      description: undefined,
      photo: {
        url: '/default_hero.jpg',
      },
    }];
  const [imageIndex, nextImage] = useReducer((i) => (i + 1) % allImages.length, 0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const interval = setInterval(nextImage, CYCLE_INTERVAL);
    return () => clearInterval(interval);
  }, [typeof window, nextImage, CYCLE_INTERVAL]);

  const selectedImage = allImages[imageIndex]!;
  const backgroundColor = selectedImage.backgroundColor!;
  const foregroundColor = selectedImage.foregroundColor!;
  const backgroundColorShadow = backgroundColor?.length === 7 ? `${backgroundColor}55` : `${backgroundColor}5`;

  return (
    <Box
      bg={backgroundColor}
      transition={TRANSITION}
      pt={8}
      pb={8}
      pl={4}
      pr={4}
      minHeight="lg"
      position="relative"
      {...props}
    >
      <Container
        maxWidth="5xl"
        display="flex"
        alignItems="center"
        position="absolute"
        top={8}
        right={4}
        bottom={8}
        left={4}
        zIndex={200}
        {...containerProps}
      >
        <TextContentElement
          mt={-16}
          query={query}
          upcomingEvent={upcomingEvent!}
          color={foregroundColor}
          shadowColor={backgroundColorShadow}
          transition={TRANSITION}
          {...textProps}
        />
      </Container>

      {/* This box holds the hero image */}
      <Box position="absolute" top={0} right={0} bottom={0} left={0}>
        <Container maxWidth="7xl" position="relative" height="100%">
          {allImages.map((img, i) =>
            imageDisplay(img!.photo!.url!, img!.backgroundColor!, { opacity: imageIndex === i ? 1 : 0 })
          )}
        </Container>
      </Box>
    </Box>
  )
}

function imageDisplay(url: string, backgroundColor: string, props: ChakraProps): ReactElement {
  const backgroundColorAlpha = backgroundColor?.length === 7 ? `${backgroundColor}00` : `${backgroundColor}0`;
  return (
    <Box
      position="absolute"
      top={0}
      right={0}
      bottom={0}
      left={0}
      transition={TRANSITION}
      {...props}
    >
      <Box
        position="absolute"
        top={0}
        right={0}
        bottom={0}
        left={0}
        zIndex={100}
        backgroundImage={`
          radial-gradient(circle at 100%, ${backgroundColorAlpha} 85%, ${backgroundColor} 98%),
          radial-gradient(circle at 0, ${backgroundColorAlpha} 85%, ${backgroundColor} 98%)
        `}
      />
      <Box
        backgroundImage={`url(${url})`}
        backgroundSize="cover"
        backgroundPosition="50% 50%"
        width="100%"
        height="100%"
      />
    </Box>
  )
}
