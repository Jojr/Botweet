/* eslint-disable react/prefer-stateless-function */
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
  TouchableOpacity,
} from 'react-native';
import { I18n } from '@aws-amplify/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as AuthActions from '_actions/auth';
import { Typography, Spacing, Colors, Mixins } from '_styles';
import { TitleTextInput, ButtonText, MyStatusBar, PasswordVisibility } from '_atoms';


class DrawerScene extends Component {
  render() {
    // const { email, password, hidePassword } = this.state;
    return (
      <View
        style={[StylesLocal.container, { }]}
      >
        <MyStatusBar backgroundColor="transparent" barStyle="light-content" />
        <KeyboardAwareScrollView
          enableOnAndroid
          enableAutomaticScroll
          extraScrollHeight={80}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
        >
          <View
            style={StylesLocal.formWrapper}
          >
            <Image
              // resizeMode="contain"
              style={StylesLocal.image}
              source={{ uri: 'https://i.stack.imgur.com/2xiwW.jpg' }}
              // source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
            />
            <View style={[StylesLocal.fieldWrapper, { marginTop: 30 }]}>
              <Icon name="chevron-right" size={Typography.FONT_SIZE_26} color={Colors.PRIMARY} style={{ marginTop: 0 }} />
              <Text style={[Typography.FONT_THIN, StylesLocal.text]}>
                developer
              </Text>
            </View>
            <View style={[StylesLocal.fieldWrapper]}>
              <Text style={[Typography.FONT_REGULAR, StylesLocal.text]}>
                João Batista Belem Jr.
              </Text>
            </View>

            <View style={[StylesLocal.fieldWrapper, { marginTop: 30 }]}>
              <Icon name="chevron-right" size={Typography.FONT_SIZE_26} color={Colors.PRIMARY} style={{ marginTop: 0 }} />
              <Text style={[Typography.FONT_THIN, StylesLocal.text]}>
                email
              </Text>
            </View>
            <View style={[StylesLocal.fieldWrapper]}>
              <Text style={[Typography.FONT_REGULAR, StylesLocal.text]}>
                junior.jb@gmail.com
              </Text>
            </View>

            <View style={[StylesLocal.fieldWrapper, { marginTop: 30 }]}>
              <Icon name="chevron-right" size={Typography.FONT_SIZE_26} color={Colors.PRIMARY} style={{ marginTop: 0 }} />
              <Text style={[Typography.FONT_THIN, StylesLocal.text]}>
                phone
              </Text>
            </View>
            <View style={[StylesLocal.fieldWrapper]}>
              <Text style={[Typography.FONT_REGULAR, StylesLocal.text]}>
                +55 41 988 055 237
              </Text>
            </View>

          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const StylesLocal = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  image: {
    alignSelf: 'center',
    width: Spacing.SCALE_200,
    height: Spacing.SCALE_200,
    borderRadius: Spacing.SCALE_200,
    // marginRight: Spacing.SCALE_12
  },
  logo: {
    alignSelf: 'center',
    // paddingBottom: '50%',
    width: 400,
    height: 400,
  },
  formWrapper: {
    paddingTop: '20%',
    // width: '85%',
    // alignSelf: 'center',
  },
  fieldWrapper: {
    // marginTop: 15,
    // marginBottom: 0,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
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
)(DrawerScene);
