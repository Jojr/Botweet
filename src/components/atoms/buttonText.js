import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Typography, Spacing, Colors, Mixins } from '_styles';

const ButtonText = ({ onPress, backgroundColor, color, borderWidth, borderColor, children }) => {
  const { textStyle, buttonStyle } = StylesLocal;

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={[
        buttonStyle,
        Typography.FONT_REGULAR,
        {
          backgroundColor: backgroundColor || Colors.PRIMARY,
          borderWidth: borderWidth || 0,
          borderColor: borderColor || 'transparent'
        }]}
    >
      <Text style={[textStyle, { color: color || Colors.WHITE }]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const StylesLocal = StyleSheet.create({
  buttonStyle: {
    width: '100%',
    justifyContent: 'center',
    height: 55,
    borderRadius: 25,
    borderWidth: 0,
  },
  textStyle: {
    alignSelf: 'center',
    fontSize: Typography.FONT_SIZE_22,
  },
});

export default ButtonText;
