import {
  View,
  Text,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
} from 'react-native';
import React, {FC} from 'react';

export interface Props extends RNTextInputProps {
  label?: string;
  error?: string | false;
}

const ACCENT_COLOR = '#a88332';

const TextInput: FC<Props> = ({label, error, ...props}) => {
  const isError = !!error;
  return (
    <View style={styles.container}>
      {!!label && (
        <Text style={[styles.label, isError && styles.errorLabel]}>
          {label}
        </Text>
      )}
      <RNTextInput
        style={[styles.input, isError && styles.errorInput]}
        selectionColor={ACCENT_COLOR}
        {...props}
      />
      {isError && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: ACCENT_COLOR,
    padding: 20,
    color: '#ffffff',
    fontSize: 16,
    marginTop: 10,
  },
  errorInput: {
    borderColor: 'red',
  },
  label: {
    color: ACCENT_COLOR,
    textTransform: 'capitalize',
    marginLeft: 5,
  },
  errorLabel: {
    color: 'red',
  },
  errorText: {
    marginTop: 2,
    color: 'red',
    textAlign: 'right',
    marginRight: 5,
  },
});

export default TextInput;
