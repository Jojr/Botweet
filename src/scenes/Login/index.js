/* eslint-disable global-require */
/* eslint-disable react/no-unused-state */
/**
 * Created by João Belem Jr.
 * junior.jb@gmail.com
 *
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ImageBackground
} from 'react-native';
import { I18n } from '@aws-amplify/core';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
// import { loginUser } from '_actions';
// import * as color from '../../styles/colors';
import * as color from '_styles/colors';
import { TitleTextInput } from '_atoms';

class LoginScene extends Component {
  constructor() {
    super();
    this.state = {
      backgroundLoaded: false,
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    const { email, password, backgroundLoaded } = this.state;
    return (
      <ImageBackground
        source={require('../../assets/images/BackGroundImage.png')}
        style={[
          StylesLocal.container,
          backgroundLoaded
            ? {}
            : { backgroundColor: color.PRIMARY },
        ]}
        onLoad={() => this.setState({ backgroundLoaded: true })}
      >
        <TitleTextInput
          bgColor={color.TRANSPARENCY}
          attrName="email"
          title={I18n.get('Email')}
          value={email}
          keyboardType="email-address"
        />
      </ImageBackground>
    );
  }
}

const StylesLocal = StyleSheet.create({
  container: {
    flex: 1,
    
  }
});

const mapStateToProps = (state) => ({
  // login: state.auth.login,
});
export default connect(mapStateToProps, {
  // loginChanged,
})(LoginScene);
