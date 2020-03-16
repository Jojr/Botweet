import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Typography, Spacing, Colors, Mixins } from '_styles';

const TitleTextInput = ({
  bgColor,
  secureTextEntry,
  maxLength,
  value,
  onChangeText,
  textContentType,
  keyboardType,
  autoCorrect,
  mask,

  textColor,
  borderColor,
  fontWeight,
}) => {
  const { buttonStyle, textStyle } = StylesLocal;

  return (
    <View style={StylesLocal.container}>
      <TextInput
        secureTextEntry={secureTextEntry || false}
        maxLength={maxLength}
        value={value}
        style={StylesLocal.textInput}
        underlineColorAndroid="transparent"
        onChangeText={onChangeText}
        textContentType={textContentType}
        keyboardType={keyboardType}
        autoCorrect={autoCorrect || false}
        autoCapitalize="none"
        mask={mask}
      />
    </View>
  );
};

const StylesLocal = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    marginVertical: 4,
    borderBottomWidth: 1,
    borderColor: '#FFFFFF40',
  },
});

export default TitleTextInput;
