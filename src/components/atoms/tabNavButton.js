import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Typography } from '_styles';

class TabNavButton extends Component {
  render() {
    const { focused, activeTintColor, inactiveTintColor, iconName } = this.props;
    const color = focused
      ? activeTintColor
      : inactiveTintColor;

    const componentBody = (
      <SafeAreaView style={{ height: 40, marginTop: 20, flexDirection: 'column', alignItems: 'center', alignSelf: 'center' }}>
        <Icon style={{ color }} name={iconName} size={Typography.FONT_SIZE_30} />
      </SafeAreaView>
    );
    return componentBody;
  }
}
export default TabNavButton;
