/* eslint-disable no-underscore-dangle */
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
  FlatList,
  View,
  Alert,
  Animated,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { I18n } from '@aws-amplify/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PostActions from '_actions/posts';
import { Typography, Spacing, Colors, Mixins } from '_styles';
import { TitleTextInput, ButtonText, MyStatusBar, PasswordVisibility } from '_atoms';
import { BaseHeader, Post, ProfilePicture, PlusModal } from '_molecules';

/* Compose animatable component */
AnimatedSafeAreaView = Animatable.createAnimatableComponent(SafeAreaView);

/* Header constants */
const HEADER_EXPANDED_HEIGHT = Spacing.SCALE_55;
const HEADER_COLLAPSED_HEIGHT = 0;


class HomeScene extends Component {
  constructor() {
    super();
    this.state = {
      backgroundLoaded: false,
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      hidePassword: true,
      scrollY: new Animated.Value(0),
      showModal: false,
      refresh: false,
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

  _updateMasterState = (attrName, value) => {
    this.setState({ [attrName]: value });
  };

  onListChange = () => {
    this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
  };

  render() {
    const { name, email, gender, profileImage } = this.props.userData;
    const { postsList, savePost } = this.props;
    const { scrollY, showModal } = this.state;
    /* Ordened post list by date desc */
    const ordenedPostList = postsList;
    ordenedPostList.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });

    /* Header animation settings */
    const headerHeight = scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
      // outputRange: [0, 1],
      outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
      extrapolate: 'clamp',
    });
    const headerOpacity = scrollY.interpolate({
      inputRange: [1, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    const headerMarginTop = scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
      outputRange: [0, -HEADER_EXPANDED_HEIGHT],
      extrapolate: 'clamp',
    });
    const imageMarginTop = scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
      outputRange: [0, -20],
      extrapolate: 'clamp',
    });
    return (
      <AnimatedSafeAreaView
        style={StylesLocal.container}
        animation="fadeInDown"
        delay={300}
        duration={700}
        easing="ease-in-out-quint"
        useNativeDriver
      >
        <Animated.View
          style={{
            height: headerHeight,
            // opacity: headerOpacity,
            marginTop: headerMarginTop,
            // backgroundColor: '#FF00FF',
            // marginBottom: headerMarginTop
          }}
        >
          <BaseHeader
            firstName={name}
            surName=""
            gender={gender}
            address={email}
            imageUrl={profileImage}
          />
          <Animated.View
            style={{
              opacity: headerOpacity,
              position: 'absolute',
              marginTop: imageMarginTop,
              width: imageMarginTop,
              height: imageMarginTop,
            }}
          >
            <ProfilePicture
              profileImage={profileImage}
            />
          </Animated.View>
        </Animated.View>
        {/* Render Posts Flatlist */}
        <View style={{ height: '100%', marginTop: HEADER_EXPANDED_HEIGHT, marginmarginBottom: 40 }}>
          <FlatList
            ref={(ref) => { this.flatListRef = ref; }}
            extraData={this.state.refresh}
            onEndReachedThreshold={0.5}
            onRefresh={() => this.onListChange()}
            refreshing={false}
            data={ordenedPostList}
            renderItem={({ item }) => (
              <Post
                id={item.id}
                profileImage={item.profileImage}
                name={item.name}
                isEdited={item.isEdited}
                postContent={item.postContent}
                upVotes={item.upVotes}
                downVotes={item.downVotes}
                isOwner={item.isOwner}
                date={item.date}
              />
            )}
            keyExtractor={(item) => item.id}
            onScroll={Animated.event(
              [{
                nativeEvent: {
                  contentOffset: {
                    y: this.state.scrollY
                  }
                }
              }], {
              }
            )}
            scrollEventThrottle={16}
          />
        </View>
        <View style={{ paddingBottom: 180 }} />
        <PlusModal
          visible={showModal}
          overFullScreen
          animationType="fade"
          updateMasterState={this._updateMasterState}
          onRequestClose={() => console.log('closed')}
          autoFocus={true}
          placeholder={I18n.get('ex. "My inspiration taday is..."')}
          savePost={savePost}
        />
      </AnimatedSafeAreaView>
    );
  }
}

const StylesLocal = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE
  },
});

const mapStateToProps = (state) => ({
  userData: state.auth.userData,
  postsList: state.posts.postsList,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(PostActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScene);
