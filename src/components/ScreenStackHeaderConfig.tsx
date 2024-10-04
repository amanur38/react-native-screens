'use client';

import React from 'react';
import {
  HeaderSubviewTypes,
  ScreenStackHeaderConfigProps,
  SearchBarProps,
} from 'react-native-screens';
import { Image, ImageProps, StyleSheet, ViewProps } from 'react-native';

// Native components
import ScreenStackHeaderConfigNativeComponent from '../fabric/ScreenStackHeaderConfigNativeComponent';
import ScreenStackHeaderSubviewNativeComponent from '../fabric/ScreenStackHeaderSubviewNativeComponent';

export const ScreenStackHeaderConfig: React.ComponentType<ScreenStackHeaderConfigProps> =
  ScreenStackHeaderConfigNativeComponent as any;
export const ScreenStackHeaderSubview: React.ComponentType<
  React.PropsWithChildren<ViewProps & { type?: HeaderSubviewTypes }>
> = ScreenStackHeaderSubviewNativeComponent as any;

export const ScreenStackHeaderBackButtonImage = (
  props: ImageProps,
): JSX.Element => (
  <ScreenStackHeaderSubview type="back" style={styles.headerSubview}>
    <Image resizeMode="center" fadeDuration={0} {...props} />
  </ScreenStackHeaderSubview>
);

export const ScreenStackHeaderRightView = (
  props: React.PropsWithChildren<ViewProps>,
): JSX.Element => {
  const { style, ...rest } = props;

  return (
    <ScreenStackHeaderSubview
      {...rest}
      type="right"
      style={[styles.headerSubview, style]}
    />
  );
};

export const ScreenStackHeaderLeftView = (
  props: React.PropsWithChildren<ViewProps>,
): JSX.Element => {
  const { style, ...rest } = props;

  return (
    <ScreenStackHeaderSubview
      {...rest}
      type="left"
      style={[styles.headerSubview, style]}
    />
  );
};

export const ScreenStackHeaderCenterView = (
  props: React.PropsWithChildren<ViewProps>,
): JSX.Element => {
  const { style, ...rest } = props;

  return (
    <ScreenStackHeaderSubview
      {...rest}
      type="center"
      style={[styles.headerSubview, style]}
    />
  );
};

export const ScreenStackHeaderSearchBarView = (
  props: React.PropsWithChildren<SearchBarProps>,
): JSX.Element => (
  <ScreenStackHeaderSubview
    {...props}
    type="searchBar"
    style={styles.headerSubview}
  />
);

const styles = StyleSheet.create({
  headerSubview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
