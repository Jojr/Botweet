/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-trailing-spaces */
import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Scene,
  Router,
  Actions,
  Tabs,
  Stack,
  Drawer,
  ActionConst,
} from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Typography, Spacing, Colors, Mixins } from '_styles';
import { NavButton } from '_atoms';

/* Import Actions */
import * as authActions from '../redux/actions/auth';

/* Scenes components */
import { Login, CreateAccount } from '../scenes';
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

/* Nav icons */
const arrowLeft2 = (
  <View style={{ marginTop: 30 }}>
    <Icon name="chevron-left" size={35} color={Colors.WHITE} style={{ paddingTop: 10 }} />
  </View>
);

const ArrowLeft = () => (
  <TouchableOpacity
    onPress={() => Actions.pop()}
    style={{ height: 20, marginTop: 20, marginLeft: 10 }}>
    <Icon name="chevron-left" size={40} color={Colors.WHITE} style={{ marginTop: 0 }} />
  </TouchableOpacity>
);

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

            {/* Put all relative scenes inside the same stack navigation */}
            <Stack
              key="main"
              panHandlers={null}
              // initial={this.props.isAuthenticated} // Define se esta cena é a inicial ou não true / false
              initial // Debug: Define como true manualmente para ir direto para esta cena.
            >
              {/* */}
              <Scene
                type="reset" // This prop set the scene as initial flow, no backbutton effetc
                key="login" // This prop set the name of scene. Call this name no navigate (ex. "Actions.login()")
                component={Login} // Load the scene component
                hideNavBar // Show or hide navbar
                // navigationBarStyle={stylesLocal.navBar}
                navTransparent // Set transparency on navbar
              />
            </Stack>
          </Drawer>

          {/* Not authenticaded flow */}
          <Scene
            initial={!this.props.isAuthenticated}
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
              leftButtonStyle={stylesLocal.leftNavButton}
              // navigationBarStyle={stylesLocal.navBar}
              navTransparent
            />
          </Scene>
        </Scene>
      </Router>
    );
  }
}

const stylesLocal = StyleSheet.create({
  navBar: {
    backgroundColor: 'transparent',
    height: 60,
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
