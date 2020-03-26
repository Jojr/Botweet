import React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { I18n } from '@aws-amplify/core';
import { Typography, Spacing, Colors } from '_styles';

const BaseHeader = ({ firstName, gender, address }) => (
  <View
    style={StylesLocal.container}
  >
    <View>
      <Text
        ellipsizeMode="tail"
        style={[Typography.FONT_BOLD, StylesLocal.nameText]}
      >
        {gender === 'male' ? I18n.get('Welcome_male') : I18n.get('Welcome_female')}
        {` ${firstName}!`}
      </Text>
      <Text
        ellipsizeMode="tail"
        style={[Typography.FONT_REGULAR, StylesLocal.nameText, { fontSize: Typography.FONT_SIZE_14 }]}
      >
        {address}
      </Text>
    </View>
  </View>
);

const StylesLocal = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY,
    height: Spacing.SCALE_55,
    paddingLeft: Spacing.SCALE_100,
    justifyContent: 'center',
  },
  nameText: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_16,
  },
});

export default BaseHeader;
