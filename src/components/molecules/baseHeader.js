import React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { I18n } from '@aws-amplify/core';
import { Typography, Spacing, Colors, Mixins } from '_styles';

const marginTop = Platform.OS === 'ios' ? 0 : 40;
const height = Platform.OS === 'ios' ? null : 60;

const BaseHeader = ({ firstName, gender, address }) => (
  <View
    style={StylesLocal.container}
  >
    <View>
      <Text style={[Typography.FONT_BOLD, StylesLocal.nameText]}>
        {gender === 'male'? I18n.get('Welcome_male') : I18n.get('Welcome_female')}
        {` ${firstName}!`}
      </Text>
      <Text style={[Typography.FONT_REGULAR, StylesLocal.nameText]}>{address}</Text>
    </View>
  </View>
);

const StylesLocal = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY,
    height: Spacing.SCALE_55,
    paddingLeft: Spacing.SCALE_100,
  },
  nameText: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_18,
  },
});

export default BaseHeader;
