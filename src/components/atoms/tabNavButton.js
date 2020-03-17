import React, { Component } from 'react';
import { View, StyleSheet, Platform, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from '_styles';

const marginTop = Platform.OS === 'ios' ? 0 : 0;
const height = Platform.OS === 'ios' ? 0 : 0;
const TabNavButton2 = ({ name, color }) => (
  <View
    style={{ justifyContent: 'center' }}
  >
    <Icon name={name} size={40} color={color || Colors.PRIMARY} style={{ marginTop: 0 }} />
  </View>
);

class TabNavButton extends Component {
  render() {
    const { focused, activeTintColor, inactiveTintColor, iconName } = this.props;
    const color = focused
      ? activeTintColor
      : inactiveTintColor;

    const componentBody = (
      <SafeAreaView style={{ height: 40, marginTop: 20, flexDirection: 'column', alignItems: 'center', alignSelf: 'center' }}>
        <Icon style={{ color }} name={iconName} size={35} />
      </SafeAreaView>
    );
    return componentBody;
  }
}
export default TabNavButton;
