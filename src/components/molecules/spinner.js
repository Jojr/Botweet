/* eslint-disable global-require */
import React, { Component } from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { I18n } from '@aws-amplify/core';
import { Typography, Spacing, Colors, Mixins } from '_styles';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import AnimatedLoader from 'react-native-animated-loader';

class SpinnerLoading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.spinnerStatus,
    };
  }

  /*componentDidUpdate(prevProps, prevState) {
    if (prevProps.spinner !== this.props.spinner) {
      this.state = {
        spinner: this.props.spinner,
      };
    }
  }*/

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        spinner: !this.state.spinner
      });
    }, 3000);
  }

  componentWillUnmount() {
    clearTimeout(this.interval);
  }

  /* render() {
    if (this.props.spinnerStatus) {
      return (
        <Spinner
          visible
          textStyle={{ color: Colors.PRIMARY }}
          animation="fade"
          overlayColor={Colors.TRANSPARENCY_PRIMARY}
        />
      );
    }
    return null;
  } */

  render() {
    if (this.props.spinnerStatus) {
      return (
        <AnimatedLoader
          visible={this.props.spinnerStatus}
          overlayColor={Colors.PRIMARY}
          source={require('../../assets/lottie/hourglass.json')}
          animationStyle={styles.lottie}
          speed={1}
        />
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  lottie: {
    width: Spacing.SCALE_130,
    height: Spacing.SCALE_130,
  }
});

const mapStateToProps = (state) => ({
  spinnerStatus: state.system.spinnerStatus,
});

export default connect(
  mapStateToProps,
  {},
)(SpinnerLoading);
