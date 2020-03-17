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
  Alert,
} from 'react-native';
import { I18n } from '@aws-amplify/core';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
// import { loginUser } from '_actions';
import { Typography, Spacing, Colors, Mixins } from '_styles';
import { TitleTextInput, ButtonText, MyStatusBar, PasswordVisibility } from '_atoms';
import { TouchableOpacity } from 'react-native-gesture-handler';

class CreateAccountScene extends Component {
  constructor() {
    super();
    this.state = {
      backgroundLoaded: false,
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      hidePassword: true,
    };
  }

  componentDidMount() {
    
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
    const { name, email, password, confirmPassword, hidePassword } = this.state;
    return (
      <LinearGradient
        start={{ x: 1, y: 0.5 }}
        end={{ x: 0, y: 0.5 }}
        useAngle
        angle={65}
        angleCenter={{ x: 0.5, y: 0.5 }}
        colors={Colors.GRADIENT_PRIMARY}
        style={StylesLocal.container}
      >
        <KeyboardAwareScrollView
          enableOnAndroid
          enableAutomaticScroll
          extraScrollHeight={50}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
        >
          <MyStatusBar backgroundColor="transparent" barStyle="light-content" />
          <View style={StylesLocal.formWrapper}>
            <View style={[StylesLocal.fieldWrapper, { alignSelf: 'center' }]}>
              <Image
                resizeMode="contain"
                style={StylesLocal.logo}
                source={require('../../assets/images/Logo.png')}
              />
              <Text style={[Typography.FONT_REGULAR, StylesLocal.text]}>{I18n.get('Create new account')}</Text>
            </View>
            <View style={StylesLocal.fieldWrapper}>
              <TitleTextInput
                placeholder={I18n.get('Name')}
                value={name}
                onChangeText={(name) => this.setState({ name })}
                keyboardType="default"
                secureTextEntry={false}
                textContentType="name"
                autoCorrect={false}
                backgroundColor={Colors.TRANSPARENCY}
                color={Colors.WHITE}
                // updateMasterState={this._updateMasterState}
              />
            </View>
            <View style={StylesLocal.fieldWrapper}>
              <TitleTextInput
                placeholder={I18n.get('Email')}
                value={email}
                onChangeText={(email) => this.setState({ email })}
                keyboardType="email-address"
                secureTextEntry={false}
                textContentType="emailAddress"
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
                textContentType="newPassword" // Set newPassword to iOS12 keychain save
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
            <View style={StylesLocal.fieldWrapper}>
              <TitleTextInput
                placeholder={I18n.get('Password confirm')}
                value={confirmPassword}
                onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                keyboardType="default"
                secureTextEntry={hidePassword}
                textContentType="newPassword" // Set newPassword to iOS12 keychain save
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
            <View style={[StylesLocal.fieldWrapper]}>
              <ButtonText
                backgroundColor={Colors.GREEN}
                color={Colors.WHITE}
              >
                {I18n.get('Create account')}
              </ButtonText>
            </View>
            <View style={[StylesLocal.fieldWrapper, { alignSelf: 'center' }]}>
              <TouchableOpacity
                onPress={() => this.devAskingJobAlert()}
              >
                <Text style={[Typography.FONT_REGULAR, StylesLocal.text]}>{I18n.get('Need help')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </LinearGradient>
    );
  }
}

const StylesLocal = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    alignSelf: 'center',
    paddingBottom: '30%',
    width: 180,
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
    fontSize: Typography.FONT_SIZE_18,
  }
});

const mapStateToProps = (state) => ({
  // login: state.auth.login,
});
export default connect(mapStateToProps, {
  // loginChanged,
})(CreateAccountScene);
