/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-trailing-spaces */
import React, { Component } from 'react';
import { StyleSheet, Easing, Animated } from 'react-native';
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
import { Typography, Spacing, Colors, Mixins } from '_styles';
import { NavButton, TabNavButton } from '_atoms';

/* Import Actions */
import * as authActions from '../redux/actions/auth';

/* Scenes components */
import { Login, CreateAccount, Home } from '../scenes';
//import SideBar from '../SideBar';

/* Ícone menu Drawer */
const myIcon = (
  <Icon
    name="menu"
    size={30}
    color="#FFFFFF"
    style={{
      marginTop: 5,
    }}
  />
);

let CollapseExpand = (index, position) => {
  const inputRange = [index - 1, index, index + 1];
  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1],
  });

  const scaleY = position.interpolate({
    inputRange,
    outputRange: ([0, 1, 1]),
  });

  return {
    opacity,
    transform: [
      { scaleY }
    ]
  };
};

let SlideFromRight = (index, position, width) => {
  const inputRange = [index - 1, index, index + 1];
  const translateX = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [width, 0, 0]
  })
  const slideFromRight = { transform: [{ translateX }] }
  return slideFromRight
};

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: (sceneProps) => {
      const { layout, position, scene } = sceneProps;
      const width = layout.initWidth;
      const { index, route } = scene
      const params = route.params || {}; // <- That's new
      const transition = params.transition || 'default'; // <- That's new
      return {
        collapseExpand: CollapseExpand(index, position),
        default: SlideFromRight(index, position, width),
      }[transition];
    },
  };
};

class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar hideTabBar>
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
            drawerIcon={myIcon}
            drawerWidth={300}
            // contentComponent={SideBar}
            contentComponent={Login}
            drawerPosition="right"
            navTransparent
            
          >
            <Scene
              key="main"
              panHandlers={null} { ...StylesLocal }
              tabs
              tabBarStyle={StylesLocal.tabBarStyle}
              default="home"
              activeTintColor={Colors.PRIMARY}
              inactiveTintColor={Colors.GRAY_DARK}
              //hideTabBar
              //transitionConfig={transitionConfig}
              //headerLayoutPreset="center"
              //modal
            >
              {/* Put all relative scenes inside the same stack navigation */}
              {/* Home Scene */}
              <Scene
                initial
                key="home" // This prop set the name of scene. Call this name no navigate (ex. "Actions.login()")
                component={Home} // Load the scene component
                hideNavBar // Show or hide navbar
                navTransparent // Set transparency on navbar
                icon={TabNavButton}
                iconName="home"
                title={() => ''}
                titleStyle={StylesLocal.tabText}
              />
              <Scene
                key="acc"
                component={CreateAccount}
                hideNavBar
                navTransparent
                icon={TabNavButton}
                iconName="message-square"
                title={() => ''}
                titleStyle={StylesLocal.tabText}
              />
              <Scene
                key="acc2"
                component={Login}
                hideNavBar
                navTransparent
                icon={TabNavButton}
                iconName="user"
                title={() => ''}
                titleStyle={StylesLocal.tabText}
              />
            </Scene>
          </Drawer>
          

          {/* Authenticaded flow */}
          <Scene
            // initial={!this.props.isAuthenticated}
            key="auth"
            panHandlers={null}
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
    backgroundColor: 'transparent',
    height: 60,
  },
  tabBarStyle: {
    height: 50,
    backgroundColor: Colors.GRAY_MEDIUM,
    // backgroundColor: '#000000',
    // borderColor: 'transparent',
  },
  leftNavButton: {
    backgroundColor: '#FF00FF',
    lineHeight: 30,
    zIndex: 1000,
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
