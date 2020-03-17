/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { View, Platform, StatusBar } from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[StylesLocal.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

const StylesLocal = {
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
};

export default MyStatusBar;
