import { ReactNode, ReactElement, Children, cloneElement } from 'react';
import { ResponsiveObject } from '@chakra-ui/styled-system/dist/types/utils'

function computeVisibilityBreakpoints(
  countPerBreakpoint: ResponsiveObject<number>, i: number
): ResponsiveObject<string> {
  return Object.keys(countPerBreakpoint)
    .reduce((accum, k) => {
      if (!(k in countPerBreakpoint)) return accum;
      return {
        ...accum,
        [k]: countPerBreakpoint[k] >= i,
      }
    }, {});
}

/**
 * Limits the number of elements visible at a given breakpoint.
 */
export default function visibilityBreakpoints(countPerBreakpoint: ResponsiveObject<number>, children: ReactNode) {
  return Children.map(children, (child, i) => cloneElement(child as ReactElement<any>, {
    d: computeVisibilityBreakpoints(countPerBreakpoint, i),
  }));
}
