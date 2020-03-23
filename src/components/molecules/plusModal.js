/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { I18n } from '@aws-amplify/core';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import * as Animatable from 'react-native-animatable';
import { Typography, Spacing, Colors } from '_styles';

/* Set max characters allowed to post */
const maxAllowedCharacters = 280;
/* Set animatable touch */
const AnimatableTouchableOpacity = Animatable.createAnimatableComponent(TouchableOpacity);

class PlusModal extends Component {
  constructor() {
    super();
    this.state = {
      postText: '',
    };
  }

  /* Count char qtd */
  postSection = () => {
    const { postText } = this.state;
    const current = postText.length;
    const available = maxAllowedCharacters - current;
    const percentage = (available / maxAllowedCharacters) * 100;
    if (percentage >= 0) {
      return (
        <AnimatedCircularProgress
          size={Spacing.SCALE_20}
          width={Spacing.SCALE_2}
          fill={percentage}
          tintColor={Colors.GRAY_MEDIUM}
          backgroundColor={Colors.PRIMARY}
          padding={Spacing.SCALE_6}
          rotation={180}
          lineCap="round"
          style={{ marginBottom: Spacing.SCALE_5 }}
        />
      );
    }
    return (
      <Animatable.View
        animation="rubberBand"
        useNativeDriver
        style={{
          flexDirection: 'row',
          marginRight: Spacing.SCALE_6,
          marginBottom: Spacing.SCALE_5,
          justifyContent: 'center',
        }}
      >
        <Text style={
          [
            Typography.FONT_REGULAR,
            {
              fontSize: Typography.FONT_SIZE_12,
              color: Colors.GRAY_MEDIUM,
              paddingRight: 4,
              lineHeight: 20,
            }
          ]
        }
        >
          {I18n.get('Allowed 280 characters')}
        </Text>
        <Icon
          name="alert-circle"
          size={Typography.FONT_SIZE_20}
          color={Colors.PRIMARY}
          style={{ }}
        />
      </Animatable.View>
    );
  };

  /* Count char qtd */
  renderSubmitButton = () => {
    const { postText } = this.state;
    const current = postText.length;
    const available = maxAllowedCharacters - current;
    return (
      <TouchableOpacity
        style={[StylesLocal.postButton]}
        disabled={!(available >= 0)}
        onPress={() => this.savePost()}
      >
        <View style={{ justifyContent: 'center', opacity: available >= 0 ? 1 : 0.5 }}>
          <Text style={[Typography.FONT_REGULAR, StylesLocal.headerText, { textAlign: 'right' }]}>
            {I18n.get('POST')}
          </Text>
        </View>
        <View style={{ justifyContent: 'flex-end', alignSelf: 'flex-end', opacity: available >= 0 ? 1 : 0.5 }}>
          <Icon
            name="chevron-right"
            size={Typography.FONT_SIZE_55}
            color={Colors.WHITE}
            style={{ position: 'relative', marginRight: -15 }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  renderPlusButton = () => {
    const { updateMasterState } = this.props;
    return (
      <AnimatableTouchableOpacity
        animation="fadeInRight"
        useNativeDriver
        duration={500}
        style={StylesLocal.plusButtonWrapper}
        activeOpacity={1}
        onPress={() => updateMasterState('showModal', true)}
      >
        <Icon
          name="edit"
          size={Typography.FONT_SIZE_30}
          color={Colors.WHITE}
        />
      </AnimatableTouchableOpacity>
    );
  };

  closePostEditor = () => {
    // updateMasterState('showModal', false)
    const { updateMasterState } = this.props;
    const { postText } = this.state;
    if (postText.length >= 1) {
      Alert.alert(
        I18n.get('Discard inspiration'),
        I18n.get('Do you really want to discard this post?'),
        [
          {
            text: I18n.get('Discard'),
            onPress: () => {
              this.setState({ postText: '' });
              updateMasterState('showModal', false);
            }
          },
          { text: I18n.get('Cancel') },
        ],
      );
    } else {
      updateMasterState('showModal', false);
    }
  };

  savePost = () => {
    const { savePost, updateMasterState } = this.props;
    const { postText } = this.state;
    if (postText.length < 5) {
      Alert.alert(
        I18n.get('Oops!'),
        I18n.get('You need to write more than 5 characters.'),
        [
          { text: I18n.get('Close') },
        ],
      );
      return;
    }
    Alert.alert(
      I18n.get('Save post'),
      I18n.get('Do you want to save this post?'),
      [
        {
          text: I18n.get('Save'),
          onPress: () => {
            savePost(postText);
            this.setState({ postText: '' });
            updateMasterState('showModal', false);
            // updateMasterState('refresh', true);
          }
        },
        { text: I18n.get('Cancel') },
      ],
    );
  };

  render() {
    const { visible, animationType, placeholder, autoFocus } = this.props;
    if (!visible) {
      return this.renderPlusButton();
    }
    return (
      <Modal
        visible={visible}
        overFullScreen
        transparent
        animationType={animationType || 'none'}
        onRequestClose={() => console.log('closed')}
      >
        <KeyboardAvoidingView
          behavior="position"
          enabled
        >
          <View style={StylesLocal.container}>
            <View style={StylesLocal.postBox}>
              <View style={StylesLocal.closeButton}>
                <TouchableOpacity
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  onPress={() => this.closePostEditor()}
                >
                  <Icon
                    name="x"
                    size={Typography.FONT_SIZE_40}
                    color={Colors.WHITE}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ paddingBottom: Spacing.SCALE_18 }}>
                <Text style={[Typography.FONT_REGULAR, StylesLocal.headerText]}>
                  {I18n.get('What inspires you today?')}
                </Text>
              </View>
              <View style={StylesLocal.inputWrapper}>
                <TextInput
                  multiline
                  numberOfLines={5}
                  autoFocus={autoFocus || false}
                  placeholder={placeholder || '888'}
                  placeholderTextColor={Colors.GRAY_MEDIUM}
                  value={this.state.postText}
                  style={[Typography.FONT_REGULAR, StylesLocal.input, { flex: 1 }]}
                  underlineColorAndroid="transparent"
                  onChangeText={(postText) => this.setState({ postText })}
                  textContentType="none"
                  keyboardType="default"
                  autoCorrect={true}
                  autoCapitalize="none"
                  returnKeyLabel="next"
                  // returnKeyType="done"
                  blurOnSubmit={false}
                />
                {/* Progress circle char counter */}
                <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
                  {this.postSection()}
                </View>
              </View>
              <View style={StylesLocal.postSection}>
                {/* Submit button */}
                <View>
                  {this.renderSubmitButton()}
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
}

const StylesLocal = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: 'rgba(0,0,0,0.5)',
    bottom: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  closeButton: {
    width: Spacing.SCALE_55,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  postBox: {
    width: Dimensions.get('window').width,
    backgroundColor: Colors.PRIMARY,
    position: 'absolute',
    bottom: 0,
    padding: Spacing.SCALE_20,
  },
  headerText: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_20,
  },
  inputWrapper: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    height: Spacing.SCALE_100,
  },
  input: {
    fontSize: Typography.FONT_SIZE_16,
    paddingLeft: Spacing.SCALE_10,
    paddingRight: Spacing.SCALE_10,
  },
  postSection: {
    paddingTop: Spacing.SCALE_12,
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
  },
  postButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'flex-end',
  },
  plusButtonWrapper: {
    position: 'absolute',
    bottom: Spacing.SCALE_10,
    right: Spacing.SCALE_20,
    justifyContent: 'center',
    alignItems: 'center',
    width: Spacing.SCALE_60,
    height: Spacing.SCALE_60,
    borderRadius: Spacing.SCALE_60,
    backgroundColor: Colors.PRIMARY,
  },
});

export default PlusModal;
