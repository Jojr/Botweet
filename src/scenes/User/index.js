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

class UserScene extends Component {
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
      isEditingPost: false,
      postContent: false,
    };
    this.flatListRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    const { refresh } = this.state;
    const { postsList } = this.props;
    if (
      postsList !== prevState.postsList
    ) {
      if (refresh !== prevState.refresh) {
        this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
      }
    }
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

  upDownVote = (postId, vote) => {
    const { upVote, downVote } = this.props;
    if (vote === 'up') {
      Alert.alert(
        I18n.get('Confirm'),
        `${I18n.get('You like it?')}`,
        [
          { text: I18n.get('Cancel'), style: 'cancel' },
          {
            text: I18n.get('Sim'),
            onPress: () => {
              upVote(postId);
              return true;
            }
          },
        ],
        { cancelable: false },
      );
    }
    Alert.alert(
      `${I18n.get('Confirm')}`,
      I18n.get('Well, maybe this is not good for you.'),
      [
        { text: I18n.get('Cancel'), style: 'cancel' },
        {
          text: I18n.get("I don't like it"),
          onPress: () => {
            downVote(postId);
            return true;
          }
        },
      ],
      { cancelable: true },
    );
  };

  render() {
    const { name, email, gender, profileImage } = this.props.userData;
    const { postsList, savePost, editPost, deletePost } = this.props;
    const { scrollY, showModal, refresh, isEditingPost, postContent } = this.state;

    /* Filter current user posts */
    const userPosts = postsList.filter((d) => d.ownerID === email);

    /* Ordened user post list by date desc */
    const ordenedPostList = userPosts;
    ordenedPostList.sort((a, b) => {
      if (a.date > b.date) return -1;
      if (a.date < b.date) return 1;
      return 0;
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

        {/* Render Posts Flatlist */}
        <View style={{ height: '100%', marginmarginBottom: 40 }}>
          <FlatList
            ref={(ref) => { this.flatListRef = ref; }}
            keyExtractor={(item) => item.id}
            getItemLayout={this.getItemLayout}
            extraData={this.state}
            onEndReachedThreshold={0.5}
            onRefresh={() => console.log('refreshing')}
            refreshing={false}
            data={ordenedPostList}
            renderItem={({ item }) => (
              <Post
                postId={item.id}
                profileImage={item.profileImage}
                name={item.name}
                isEdited={item.isEdited}
                postContent={item.postContent}
                upVotes={item.upVotes}
                downVotes={item.downVotes}
                ownerID={item.ownerID}
                currentUserID={email}
                date={item.date}
                upDownVote={this.upDownVote}
                updateMasterState={this._updateMasterState}
              />
            )}
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
          autoFocus
          placeholder={I18n.get('ex. "My inspiration taday is..."')}
          savePost={savePost}
          editPost={editPost}
          deletePost={deletePost}
          refresh={refresh}
          isEditingPost={isEditingPost}
          postContent={postContent}
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
)(UserScene);
