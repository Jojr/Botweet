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
  StyleSheet,
  View,
  Image,
  Text,
  Alert,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { I18n } from '@aws-amplify/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
// import Account from '_actions';
import * as Account from '_actions/Account';
import { Typography, Spacing, Colors } from '_styles';
import { TitleTextInput, ButtonText, MyStatusBar, PasswordVisibility, PickerText } from '_atoms';

class CreateAccountScene extends Component {
  constructor() {
    super();
    this.state = {
      backgroundLoaded: false,
      name: '',
      email: '',
      gender: null,
      password: '',
      confirmPassword: '',
      hidePassword: true,
    };
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

  handleSave = () => {
    console.log('pressed')
    const { createAccount } = this.props;
    const data = this.state;
    const formData = {
      name: data.name,
      email: data.email,
      gender: data.gender,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    createAccount(formData);
  }

  render() {
    const { name, email, password, confirmPassword, hidePassword } = this.state;
    return (
      <KeyboardAwareScrollView
        enableOnAndroid
        enableAutomaticScroll
        extraScrollHeight={80}
        extraHeight={Platform.select({ android: 100 })}
        // keyboardShouldPersistTaps="always"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ flexGrow: 1 }}
        //scrollEnabled
      >
        <LinearGradient
          start={{ x: 1, y: 0.5 }}
          end={{ x: 0, y: 0.5 }}
          useAngle
          angle={65}
          angleCenter={{ x: 0.5, y: 0.5 }}
          colors={Colors.GRADIENT_PRIMARY}
          style={StylesLocal.container}
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
                autoCapitalize="words"
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
              />
            </View>
            <View style={StylesLocal.fieldWrapper}>
              <PickerText
                backgroundColor={Colors.TRANSPARENCY}
                color={Colors.WHITE}
                doneText={I18n.get('Done')}
                placeholder={
                  {
                    label: I18n.get('Gender'),
                    value: null,
                    fontSize: Typography.FONT_SIZE_22,
                  }
                }
                options={[
                  {
                    label: I18n.get('Feminine'),
                    value: 'female',
                  },
                  {
                    label: I18n.get('Masculine'),
                    value: 'male',
                  },
                  {
                    label: I18n.get('Other'),
                    value: 'other',
                  }
                ]}
                onValueChange={(value) => this.setState({ gender: value })}
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
              />
              <PasswordVisibility
                value={hidePassword}
                onPress={() => this.setState({ hidePassword: !hidePassword })}
                size={Typography.FONT_SIZE_20}
                color={Colors.WHITE}
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
              />
              <PasswordVisibility
                value={hidePassword}
                onPress={() => this.setState({ hidePassword: !hidePassword })}
                size={Typography.FONT_SIZE_20}
                color={Colors.WHITE}
              />
            </View>
            <View style={[StylesLocal.fieldWrapper]}>
              <ButtonText
                backgroundColor={Colors.GREEN}
                color={Colors.WHITE}
                onPress={() => this.handleSave()}
              >
                {I18n.get('Create account')}
              </ButtonText>
            </View>
            <View style={[StylesLocal.fieldWrapper, { alignSelf: 'center' }]}>
              <TouchableOpacity
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                onPress={() => this.devAskingJobAlert()}
              >
                <Text style={[
                  Typography.FONT_REGULAR,
                  StylesLocal.text,
                  StylesLocal.underline
                ]}
                >
                  {I18n.get('Need help')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </KeyboardAwareScrollView>
    );
  }
}

const StylesLocal = StyleSheet.create({
  container: {
    //flex: 1,
  },
  logo: {
    alignSelf: 'center',
    paddingBottom: '30%',
    width: 180,
  },
  formWrapper: {
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
  },
  underline: {
    textDecorationLine: 'underline',
  }
});

const mapStateToProps = (state) => ({
  // login: state.auth.login,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(Account, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateAccountScene);
