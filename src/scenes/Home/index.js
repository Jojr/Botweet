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
  FlatList,
  View,
  Image,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { I18n } from '@aws-amplify/core';
import { connect } from 'react-redux';
// import { loginUser } from '_actions';
import { Typography, Spacing, Colors, Mixins } from '_styles';
import { TitleTextInput, ButtonText, MyStatusBar, PasswordVisibility } from '_atoms';
import { BaseHeader, Post } from '_molecules';

const DATA = [
  {
    id: '1',
    profileImage: 'https://i.pravatar.cc/150?img=11',
    name: 'João Batista Belem Junior',
    isEdited: true,
    postContent: 'est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla.',
    upVotes: 15,
    downVotes: 0,
    isOwner: true,
    date: '2020-03-18 14:00'
  },
  {
    id: '2',
    profileImage: 'https://i.pravatar.cc/150?img=12',
    name: 'João Batista Belem Junior',
    isEdited: false,
    postContent: 'est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla.',
    upVotes: 15,
    downVotes: 0,
    isOwner: false,
    date: '2020-03-18 14:00'
  },
  {
    id: '3',
    profileImage: 'https://i.pravatar.cc/150?img=13',
    name: 'João Batista Belem Junior',
    isEdited: true,
    postContent: 'est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla.',
    upVotes: 15,
    downVotes: 0,
    isOwner: true,
    date: '2020-03-18 14:00'
  },
  {
    id: '4',
    profileImage: 'https://i.pravatar.cc/150?img=14',
    name: 'João Batista Belem Junior',
    isEdited: true,
    postContent: 'est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla.',
    upVotes: 15,
    downVotes: 0,
    isOwner: true,
    date: '2020-03-18 14:00'
  },
  {
    id: '5',
    profileImage: 'https://i.pravatar.cc/150?img=15',
    name: 'João Batista Belem Junior',
    isEdited: true,
    postContent: 'est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla.',
    upVotes: 15,
    downVotes: 0,
    isOwner: true,
    date: '2020-03-18 14:00'
  },
];

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

  CustomListview = () => (
    <View style={{ marginBottom: 40 }}>
      <FlatList
        onEndReachedThreshold={0.5}
        onRefresh={() => console.log('Call refresh')}
        refreshing={false}
        data={DATA}
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
      />
    </View>
  );

  render() {
    return (
      <SafeAreaView style={StylesLocal.container}>
        <BaseHeader
          name="João Belem"
          address="@joaobelem"
          imageUrl=""
        />
        {this.CustomListview()}
        <View style={{ paddingBottom: 180 }} />
      </SafeAreaView>
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
  // login: state.auth.login,
});
export default connect(mapStateToProps, {
  // loginChanged,
})(HomeScene);
