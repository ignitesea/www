import { ReactElement } from 'react';
import { ChakraProps } from '@chakra-ui/system';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { AspectRatio, Box, Text } from '@chakra-ui/react'

interface PreviewProps extends ChakraProps {
  title: string
  poster: string
  link: string
}

/**
 * Shows an individual video preview image, which links to the original video. Looks kind of like crap on its own, this
 * is only really usable in a gallery.
 */
export default function Preview({ title, poster, link, ...props }: PreviewProps): ReactElement {
  return (
    <AspectRatio ratio={4/3}>
      <Box
        as="a"
        href={link}
        target="_blank"
        rel="noopener"
        backgroundImage={`url(${poster})`}
        backgroundSize="cover"
        backgroundPosition="50% 50%"
        backgroundRepeat="no-repeat"
        position="relative"
        color="white"
        {...props}
      >
        <ChevronRightIcon
          fontSize="2xl"
          position="absolute"
          left="50%"
          top="50%"
        />
        <Box
          fontSize="xl"
        >
          <Text>{title}</Text>
        </Box>
      </Box>
    </AspectRatio>
  )
}
