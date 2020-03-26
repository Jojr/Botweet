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
  TouchableOpacity,
  Picker,
} from 'react-native';
import { I18n } from '@aws-amplify/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
// import Account from '_actions';
import * as AuthActions from '_actions/auth';
import { Typography, Spacing, Colors } from '_styles';
import { TitleTextInput, ButtonText, MyStatusBar, PasswordVisibility, PickerText } from '_atoms';

class DeveloperScene extends Component {
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

  handleSave = () => {
    const { createAccount } = this.props;
    const data = this.state;
    const formData = {
      name: data.name,
      email: data.email,
      gender: data.gender,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    // createAccount(formData);
  }

  render() {
    const { name, email, password, confirmPassword, hidePassword } = this.state;
    const { logout, purgeStore } = this.props;
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
              <Text style={[Typography.FONT_REGULAR, StylesLocal.text]}>{I18n.get('Developer functions')}</Text>
            </View>
            <View style={[StylesLocal.fieldWrapper]}>
              <ButtonText
                backgroundColor={Colors.GREEN}
                color={Colors.WHITE}
                onPress={logout}
              >
                {I18n.get('Logout')}
              </ButtonText>
            </View>
            <View style={[StylesLocal.fieldWrapper]}>
              <ButtonText
                backgroundColor={Colors.GRAY_MEDIUM}
                color={Colors.WHITE}
                onPress={purgeStore}
              >
                {I18n.get('Purge store')}
              </ButtonText>
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

const mapDispatchToProps = (dispatch) => bindActionCreators(AuthActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeveloperScene);
