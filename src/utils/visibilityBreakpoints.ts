import { ReactNode, ReactElement, Children, cloneElement } from 'react';
import { ResponsiveObject } from '@chakra-ui/styled-system/dist/types/utils'

/**
 * Computes the responsive breakpoints for showing/hiding a component, so that only a max number are visible at
 * a given size.
 */
export function computeVisibilityBreakpoints(
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
export function mapVisibilityAttributes(countPerBreakpoint: ResponsiveObject<number>, children: ReactNode) {
  return Children.map(children, (child, i) => cloneElement(child as ReactElement<any>, {
    d: computeVisibilityBreakpoints(countPerBreakpoint, i),
  }));
}
