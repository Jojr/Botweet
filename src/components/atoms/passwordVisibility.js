import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Typography, Spacing, Colors } from '_styles';

const PasswordVisibility = ({ value, onPress, size, color }) => {
  let icon;
  if (value) {
    icon = <Icon name="eye-off" size={size || Typography.FONT_SIZE_30} color={color || Colors.WHITE} />;
  } else {
    icon = <Icon name="eye" size={size || Typography.FONT_SIZE_30} color={color || Colors.WHITE} />;
  }
  return (
    <TouchableOpacity
      hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
      style={StylesLocal.button}
      onPress={onPress}
    >
      {icon}
    </TouchableOpacity>
  );
};

const StylesLocal = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 0,
    // marginTop: 10,
    marginRight: 10,
    height: Spacing.SCALE_50,
    justifyContent: 'center',
  },
});

export default PasswordVisibility;
