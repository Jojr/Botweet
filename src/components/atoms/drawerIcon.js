import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Typography, Colors } from '_styles';

/* Drawer menu icon */
const DrawerIcon = () => {

  return (
    <Icon
      name="dots-vertical"
      size={Typography.FONT_SIZE_30}
      color={Colors.WHITE}
    />
  );
};

export default DrawerIcon;
