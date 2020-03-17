import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Typography, Colors } from '_styles';

const PasswordVisibility = ({ value, onPress }) => {
  let icon;
  if (value) {
    icon = <Icon name="eye-off" size={Typography.FONT_SIZE_30} color={Colors.WHITE} />;
  } else {
    icon = <Icon name="eye" size={Typography.FONT_SIZE_30} color={Colors.WHITE} />;
  }
  return (
    <TouchableOpacity
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
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
    marginTop: 10,
    marginRight: 10,
  },
});

export default PasswordVisibility;
