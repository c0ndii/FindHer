import { rem } from '@mantine/core';
import { atomWithStorage } from 'jotai/utils';

export const fontSizeAtom = atomWithStorage('fontSize','classic');

export const fontSizesClassic = {
    xs: rem(13),
    sm: rem(14),
    md: rem(16),
    lg: rem(19),
    xl: rem(23),
  }
  
  export  const fontSizesBig = {
    xs: rem(16),
    sm: rem(17),
    md: rem(20),
    lg: rem(22),
    xl: rem(27),
  }