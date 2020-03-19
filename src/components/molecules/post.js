import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { I18n } from '@aws-amplify/core';
import { Typography, Spacing, Colors, Mixins } from '_styles';

const marginTop = Platform.OS === 'ios' ? 0 : 40;
const height = Platform.OS === 'ios' ? null : 60;

const Post = ({ profileImage, name, isEdited, postContent, upVotes, downVotes, isOwner, date }) => (
  <View style={StylesLocal.container}>
    {/* Profile and edited status section */}
    <View style={{ flexDirection: 'row' }}>
      <View style={StylesLocal.profileImage}>
        <Image
          style={StylesLocal.image}
          source={{ uri: profileImage || 'https://reactnative.dev/img/tiny_logo.png' }}
        />
      </View>
      <View style={[StylesLocal.itemWrapper, { width: '60%' }]}>
        <Text style={[Typography.FONT_REGULAR, StylesLocal.nameText]}>
          {name || 'Mock name'}
        </Text>
      </View>
      <View style={[StylesLocal.itemWrapper, { width: '25%', alignItems: 'flex-end' }]}>
        <Text style={[Typography.FONT_REGULAR, StylesLocal.nameText, { fontSize: Typography.FONT_SIZE_10 }]}>
          {isEdited ? I18n.get('(Edited)') : ''}
        </Text>
      </View>
    </View>
    {/* Post content section */}
    <View style={StylesLocal.postWrapper}>
      <Text style={[Typography.FONT_REGULAR, StylesLocal.postText]}>
        {postContent || 'est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla.'}
      </Text>
    </View>
    {/* Votes and date */}
    <View style={{ flexDirection: 'row', marginLeft: Spacing.SCALE_55 }}>
      <View style={{ flexDirection: 'row', width: '60%' }}>
        {/* Down votes */}
        <TouchableOpacity
          hitSlop={{ top: 5, bottom: 5, left: 5, right: 10 }}
          style={[StylesLocal.itemWrapper, { width: Spacing.SCALE_26 }]}
        >
          <Icon name="chevron-up" size={Typography.FONT_SIZE_26} color={Colors.PRIMARY} style={{ marginTop: 0 }} />
        </TouchableOpacity>
        <View style={[StylesLocal.itemWrapper, { width: Spacing.SCALE_26 }]}>
          <Text style={[Typography.FONT_REGULAR, StylesLocal.nameText, StylesLocal.numberText]}>
            {upVotes || '10'}
          </Text>
        </View>
        {/* Down votes */}
        <TouchableOpacity
          hitSlop={{ top: 5, bottom: 5, left: 5, right: 10 }}
          style={[StylesLocal.itemWrapper, { width: Spacing.SCALE_26 }]}
        >
          <Icon name="chevron-down" size={Typography.FONT_SIZE_26} color={Colors.GRAY_MEDIUM} style={{ marginTop: 0 }} />
        </TouchableOpacity>
        <View style={[StylesLocal.itemWrapper, { width: Spacing.SCALE_26 }]}>
          <Text style={[Typography.FONT_REGULAR, StylesLocal.nameText, StylesLocal.numberText]}>
            {downVotes || '0'}
          </Text>
        </View>
        {/* If is owner show edit button */}
        {isOwner
        && (
        <TouchableOpacity
          hitSlop={{ top: 5, bottom: 5, left: 5, right: 10 }}
          style={[StylesLocal.itemWrapper, { width: Spacing.SCALE_26 }]}
        >
          <Icon name="edit-3" size={Typography.FONT_SIZE_20} color={Colors.PRIMARY} style={{ marginTop: 0 }} />
        </TouchableOpacity>
        )}
      </View>
      {/* Post date */}
      <View style={[StylesLocal.itemWrapper, { width: '40%', alignItems: 'flex-end' }]}>
        <Text style={[Typography.FONT_REGULAR, StylesLocal.nameText, StylesLocal.numberText]}>
          {date || '12/03/2020 14:00'}
        </Text>
      </View>
    </View>
  </View>
);

const StylesLocal = StyleSheet.create({
  container: {
    margin: Spacing.SCALE_8,
    marginBottom: Spacing.SCALE_20,
  },
  itemWrapper: {
    justifyContent: 'center',
  },
  postWrapper: {
    backgroundColor: Colors.GRAY_LIGHT,
    marginLeft: Spacing.SCALE_40,
    padding: Spacing.SCALE_10,
    borderRadius: 5,
    marginTop: -Spacing.SCALE_8
  },
  image: {
    width: Typography.FONT_SIZE_40,
    height: Typography.FONT_SIZE_40,
    borderRadius: Typography.FONT_SIZE_40,
    marginRight: Spacing.SCALE_12
  },
  nameText: {
    color: Colors.GRAY_DARK,
    fontSize: Typography.FONT_SIZE_14
  },
  postText: {
    color: Colors.GRAY_DARK,
    lineHeight: Typography.LINE_HEIGHT_24,
    fontSize: Typography.FONT_SIZE_16
  },
  numberText: {
    fontSize: Typography.FONT_SIZE_12,
  },
});

export default Post;