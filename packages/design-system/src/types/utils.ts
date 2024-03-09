import { Interpolation, Theme } from '@emotion/react';

export type HTMLElementTypes<T> = React.ClassAttributes<T> &
  React.HTMLAttributes<T> & {
    css?: Interpolation<Theme>;
  };

export type NestedObjectKey<T> =
  T extends Record<string, infer U> ? keyof U : never;
