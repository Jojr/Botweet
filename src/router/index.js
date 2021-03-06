/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-trailing-spaces */
import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, Platform } from 'react-native';
import {
  Scene,
  Router,
  Actions,
  Tabs,
  Stack,
  Drawer,
  ActionConst,
} from 'react-native-router-flux';
import { StackViewStyleInterpolator } from 'react-navigation-stack';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { I18n } from '@aws-amplify/core';
import { Typography, Spacing, Colors, Mixins } from '_styles';
import { NavButton, TabNavButton, DrawerIcon } from '_atoms';

/* Import Actions */
import * as authActions from '../redux/actions/auth';

/* Scenes components */
import { Login, CreateAccount, Home, User, DrawerMenu, Developer } from '../scenes';

/* Define logo */
const AppLogo = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', marginTop: 0 }}>
      <Image source={require('../assets/images/Logo.png')} style={[StylesLocal.headerLogoImage, {}]} />
    </View>
  );
};


const screenForFadeFromBottom = () => ({
  screenInterpolator: StackViewStyleInterpolator.forFadeFromBottomAndroid,
});

class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <Scene
          key="root"
          hideNavBar
          hideTabBar
          transitionConfig={screenForFadeFromBottom}
        >
          {/* Start Authenticated flow */}
          {/* Drawer menu */}
          <Drawer
            hideNavBar
            key="drawer"
            onExit={() => {
              console.log('Drawer closed');
            }}
            onEnter={() => {
              console.log('Drawer opened');
            }}
            drawerIcon={<DrawerIcon />}
            drawerWidth={300}
            contentComponent={DrawerMenu}
            drawerPosition="right"
            // navTransparent
          >
            <Scene
              // initial={this.props.isAuthenticated}
              key="main"
              tabs
              tabBarStyle={StylesLocal.tabBarStyle}
              default="home"
              activeTintColor={Colors.PRIMARY}
              inactiveTintColor={Colors.GRAY_DARK}
              transitionConfig={screenForFadeFromBottom}
            >
              {/* Put all relative scenes inside the same stack navigation */}
              {/* Home Scene */}
              <Scene
                // initial
                key="home" // This prop set the name of scene. Call this name no navigate (ex. "Actions.login()")
                component={Home} // Load the scene component
                // hideNavBar // Show or hide navbar
                // navTransparent // Set transparency on navbar
                icon={TabNavButton}
                iconName="home"
                title={() => ''}
                titleStyle={StylesLocal.tabText}
                navigationBarStyle={StylesLocal.navBar}
                renderTitle={() => <AppLogo />}
              />
              <Scene
                key="acc2"
                component={User}
                // hideNavBar
                // navTransparent
                icon={TabNavButton}
                iconName="user"
                title={() => ''}
                titleStyle={StylesLocal.tabText}
                navigationBarStyle={StylesLocal.navBar}
                // title={I18n.get('Help')}
                renderTitle={() => {
                  return (
                    <View style={{ flex: 1, alignItems: 'center', marginTop: 0 }}>
                      <Text style={[Typography.FONT_BOLD, StylesLocal.titleText]}>
                        {I18n.get('My posts')}
                      </Text>
                    </View>
                  );
                }}
              />
              <Scene
                key="acc"
                component={Developer}
                hideNavBar
                navTransparent
                icon={TabNavButton}
                iconName="code"
                title={() => ''}
                titleStyle={StylesLocal.tabText}
              />
            </Scene>
          </Drawer>
          

          {/* Unauthenticaded flow */}
          <Scene
            // initial
            initial={!this.props.isAuthenticated}
            key="auth"
            panHandlers={null}
            transitionConfig={screenForFadeFromBottom}
          >
            {/* Login scene */}
            <Scene
              type="reset"
              key="login"
              component={Login}
              hideNavBar
              navTransparent
            />
            {/* Create account scene */}
            <Scene
              key="createAccount"
              component={CreateAccount}
              onLeft={() => Actions.pop()}
              renderLeftButton={() => <NavButton name="chevron-left" onPress={() => Actions.pop()} />}
              leftButtonStyle={StylesLocal.leftNavButton}
              // navigationBarStyle={StylesLocal.navBar}
              navTransparent
            />
          </Scene>
        </Scene>
      </Router>
    );
  }
}

const StylesLocal = StyleSheet.create({
  navBar: {
    backgroundColor: Colors.PRIMARY,
    paddingTop: Platform.select({ android: Spacing.SCALE_20, ios: 0 }),
    height: Spacing.SCALE_60,
    borderBottomWidth: 0,
    alignContent: 'center',
  },
  tabBarStyle: {
    height: 50,
    backgroundColor: Colors.WHITE,
    borderTopWidth: 0,
  },
  titleText: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_16,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  leftNavButton: {
    backgroundColor: '#FF00FF',
    lineHeight: 30,
    zIndex: 1000,
  },
  headerLogoImage: {
    resizeMode: 'contain',
    height: Typography.FONT_SIZE_35,
  },
});
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(authActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RouterComponent);
