import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Typography, Spacing, Colors, Mixins } from '_styles';

const TitleTextInput = ({
  placeholder,
  value,
  onChangeText,
  keyboardType,
  secureTextEntry,
  textContentType,
  autoCorrect,
  backgroundColor,
  color,
}) => {
  const { buttonStyle, textStyle } = StylesLocal;

  return (
    <View style={[StylesLocal.container, { backgroundColor }]}>
      <TextInput
        placeholder={placeholder || ''}
        placeholderTextColor={color}
        secureTextEntry={secureTextEntry || false}
        value={value}
        style={[StylesLocal.textInput, Typography.FONT_REGULAR, { color }]}
        underlineColorAndroid="transparent"
        onChangeText={onChangeText}
        textContentType={textContentType}
        keyboardType={keyboardType}
        autoCorrect={autoCorrect || false}
        autoCapitalize="none"
      />
    </View>
  );
};

const StylesLocal = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    height: 55,
    //marginVertical: 50,
    borderRadius: 25,
  },
  textInput: {
    fontSize: Typography.FONT_SIZE_22,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default TitleTextInput;
