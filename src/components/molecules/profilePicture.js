import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Spacing } from '_styles';

const ProfilePicture = ({ profileImage }) => (
  <View
    style={StylesLocal.container}
  >
    <Image
      style={StylesLocal.image}
      source={{ uri: profileImage || 'https://reactnative.dev/img/tiny_logo.png' }}
    />
  </View>
);

const StylesLocal = StyleSheet.create({
  container: {
    height: Spacing.SCALE_80,
    paddingLeft: Spacing.SCALE_10,
    position: 'absolute',
  },
  image: {
    width: Spacing.SCALE_80,
    height: Spacing.SCALE_80,
    borderRadius: Spacing.SCALE_40,
    marginRight: Spacing.SCALE_12
  },
});

export default ProfilePicture;
