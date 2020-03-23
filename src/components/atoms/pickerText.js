import React from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Typography, Spacing, Colors, Mixins } from '_styles';

const PickerText = ({
  placeholder,
  backgroundColor,
  color,
  options,
  onValueChange,
  doneText,
}) => {
  const { container, textInput } = StylesLocal;
  return (
    <View style={[container, { backgroundColor }]}>
      <RNPickerSelect
        placeholder={placeholder}
        placeholderTextColor={color}
        doneText={doneText}
        items={options}
        style={{
          ...pickerStyle,
          inputIOS: {
            ...textInput,
            color,
          },
          inputAndroid: {
            color
          }
        }}
        onValueChange={onValueChange}
      />
    </View>
  );
};

const pickerStyle = {
  inputIOS: {
    color: 'white',
    fontSize: Typography.FONT_SIZE_22,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
  },
  inputAndroid: {
    color: 'white',
  },
  placeholderColor: 'white',
  underline: { borderTopWidth: 0 },
  icon: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderTopWidth: 5,
    borderTopColor: '#00000099',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    width: 0,
    height: 0,
    top: 20,
    right: 15,
  },
};

const StylesLocal = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    height: 55,
    borderRadius: 25,
  },
  textInput: {
    fontSize: Typography.FONT_SIZE_22,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default PickerText;
