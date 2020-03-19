import React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { Typography, Spacing, Colors, Mixins } from '_styles';

const marginTop = Platform.OS === 'ios' ? 0 : 40;
const height = Platform.OS === 'ios' ? null : 60;

const BaseHeader = ({ name, address }) => (
  <View
    style={StylesLocal.container}
  >
    <View>
      <Text style={[Typography.FONT_BOLD, StylesLocal.nameText]}>
        {name}
      </Text>
      <Text style={[Typography.FONT_REGULAR, StylesLocal.nameText]}>{address}</Text>
    </View>
  </View>
);

const StylesLocal = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY,
    height: Spacing.SCALE_40,
    paddingLeft: Spacing.SCALE_100,
  },
  nameText: {
    color: Colors.WHITE,
  },
});

export default BaseHeader;
