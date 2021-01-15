import { ReactElement, ReactNode, cloneElement, Children, useMemo } from 'react';
import { ChakraProps } from '@chakra-ui/system';
import { Grid } from '@chakra-ui/react';
import { visibilityBreakpoints } from '../../utils';

export interface GalleryProps extends ChakraProps {
  children: ReactNode
}

const GALLERY_MAX_VISIBLE_BREAKPOINTS = {
  base: 3,
  md: 4,
  lg: 6,
  xl: 8,
};

export default function Gallery({ children, ...props }: GalleryProps): ReactElement {
  const visibleChildren = useMemo(
    () => visibilityBreakpoints(GALLERY_MAX_VISIBLE_BREAKPOINTS, children),
    [GALLERY_MAX_VISIBLE_BREAKPOINTS, children],
  );

  return (
    <Grid
      templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)', xl: 'repeat(4, 1fr)'}}
      gap={8}
      {...props}
    >
      {visibleChildren}
    </Grid>
  )
}
