import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '_styles';

const marginTop = Platform.OS === 'ios' ? 0 : 40;
const height = Platform.OS === 'ios' ? null : 60;
const NavButton = ({ onPress, name, color }) => (
  <TouchableOpacity
    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    onPress={onPress}
    style={{ height, marginTop, marginLeft: 10, justifyContent: 'center' }}
  >
    <Icon name={name} size={40} color={color || Colors.WHITE} style={{ marginTop: 0 }} />
  </TouchableOpacity>
);

export default NavButton;
