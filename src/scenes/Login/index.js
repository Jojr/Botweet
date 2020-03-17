/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-shadow */
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
  Image,
  Text,
  ImageBackground,
  Alert,
} from 'react-native';
import { I18n } from '@aws-amplify/core';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import SplashScreen from 'react-native-splash-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';
// import { loginUser } from '_actions';
import { Typography, Spacing, Colors, Mixins } from '_styles';
import { TitleTextInput, ButtonText, MyStatusBar, PasswordVisibility } from '_atoms';
import { TouchableOpacity } from 'react-native-gesture-handler';

/* Compose animatable component */
AnimatedScrollView = Animatable.createAnimatableComponent(ScrollView);

class LoginScene extends Component {
  constructor() {
    super();
    this.state = {
      backgroundLoaded: false,
      email: '',
      password: '',
      hidePassword: true,
    };
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  devAskingJobAlert = () => {
    Alert.alert(
      I18n.get('Alert'),
      I18n.get('This feature is unavailable now. \n Please hire the dev to get more stuff. :) '),
      [
        { text: "Ok, I'll hire you" },
      ],
      {/* cancelable: false */},
    );
  };

  render() {
    const { email, password, backgroundLoaded, hidePassword } = this.state;
    return (
      <ImageBackground
        source={require('../../assets/images/BackGroundImage.png')}
        style={[
          StylesLocal.container,
          backgroundLoaded
            ? {}
            : { backgroundColor: Colors.PRIMARY },
        ]}
        onLoad={() => this.setState({ backgroundLoaded: true })}
      >
        <MyStatusBar backgroundColor="transparent" barStyle="light-content" />
        <KeyboardAwareScrollView
          enableOnAndroid
          enableAutomaticScroll
          extraScrollHeight={80}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
        >
          <Animatable.View
            animation="fadeInUp"
            delay={1000}
            useNativeDriver
            style={StylesLocal.formWrapper}
          >
            <View style={StylesLocal.fieldWrapper}>
              <Image
                resizeMode="contain"
                style={StylesLocal.logo}
                source={require('../../assets/images/Logo.png')}
              />
              <TitleTextInput
                placeholder={I18n.get('Email')}
                value={email}
                onChangeText={(email) => this.setState({ email })}
                keyboardType="email-address"
                secureTextEntry={false}
                textContentType="username"
                autoCorrect={false}
                backgroundColor={Colors.TRANSPARENCY}
                color={Colors.WHITE}
                // updateMasterState={this._updateMasterState}
              />
            </View>
            <View style={StylesLocal.fieldWrapper}>
              <TitleTextInput
                placeholder={I18n.get('Password')}
                value={password}
                onChangeText={(password) => this.setState({ password })}
                keyboardType="default"
                secureTextEntry={hidePassword}
                textContentType="password" // Set password to iOS12 keychain autofill
                autoCorrect={false}
                backgroundColor={Colors.TRANSPARENCY}
                color={Colors.WHITE}
                // updateMasterState={this._updateMasterState}
              />
              <PasswordVisibility
                value={hidePassword}
                onPress={() => this.setState({ hidePassword: !hidePassword })}
              />
            </View>
            <View style={[StylesLocal.fieldWrapper, { alignSelf: 'center' }]}>
              <TouchableOpacity
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                onPress={() => this.devAskingJobAlert()}
              >
                <Text style={[Typography.FONT_REGULAR, StylesLocal.text]}>{I18n.get('Forgot password?')}</Text>
              </TouchableOpacity>
            </View>
            <View style={[StylesLocal.fieldWrapper]}>
              <ButtonText
                backgroundColor={Colors.GREEN}
                color={Colors.WHITE}
              >
                {I18n.get('Enter')}
              </ButtonText>
            </View>
            <View style={[StylesLocal.fieldWrapper, { alignSelf: 'center' }]}>
              <TouchableOpacity>
                <Text style={[Typography.FONT_REGULAR, StylesLocal.text]}>{I18n.get('or')}</Text>
              </TouchableOpacity>
            </View>
            <View style={[StylesLocal.fieldWrapper]}>
              <ButtonText
                backgroundColor="transparent"
                borderWidth={1}
                borderColor={Colors.WHITE}
                color={Colors.WHITE}
                onPress={() => {
                  if (Actions.currentScene !== 'createAccount') {
                    Actions.createAccount();
                  }
                }}
              >
                {I18n.get('Create new account')}
              </ButtonText>
            </View>
          </Animatable.View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    );
  }
}

const StylesLocal = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    alignSelf: 'center',
    paddingBottom: '50%',
  },
  formWrapper: {
    //paddingTop: '20%',
    width: '85%',
    alignSelf: 'center',
  },
  fieldWrapper: {
    marginTop: 15,
    marginBottom: 15,
  },
  text: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_20,
  }
});

const mapStateToProps = (state) => ({
  // login: state.auth.login,
});
export default connect(mapStateToProps, {
  // loginChanged,
})(LoginScene);
