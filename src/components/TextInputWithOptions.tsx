import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {FC, useMemo, useState} from 'react';
import TextInput, {Props as TextInputProps} from './TextInput';

interface Props extends TextInputProps {
  options?: string[];
}

const TextInputWithOptions: FC<Props> = ({
  onFocus,
  onBlur,
  options,
  onChangeText,
  value,
  ...props
}) => {
  const [optionsShown, setOptionsShown] = useState(false);

  const filteredOptions = useMemo(() => {
    if (options?.length && value) {
      return options.filter(
        option => option.toLowerCase().indexOf(value.toLowerCase()) > -1,
      );
    }
    return options;
  }, [options, value]);

  const handleFocus: TextInputProps['onFocus'] = e => {
    if (filteredOptions?.length) {
      setOptionsShown(true);
    }
    onFocus?.(e);
  };

  const handleBlur: TextInputProps['onBlur'] = e => {
    if (filteredOptions?.length) {
      setOptionsShown(false);
    }
    onBlur?.(e);
  };

  const handleOptionPress = (option: string) => () => {
    onChangeText?.(option);
    setOptionsShown(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        onBlur={handleBlur}
        onFocus={handleFocus}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
      {!!filteredOptions?.length && optionsShown && (
        <ScrollView style={styles.options}>
          {filteredOptions.map((option, idx, arr) => (
            <TouchableOpacity
              key={option}
              onPress={handleOptionPress(option)}
              style={idx !== arr.length - 1 && styles.optionBorder}>
              <Text style={styles.option}>{option}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
    maxHeight: 100,
  },
  options: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 5,
    elevation: 5,
  },
  option: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  optionBorder: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
});

export default TextInputWithOptions;
