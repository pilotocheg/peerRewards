import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {FC, forwardRef, Ref} from 'react';

interface Props extends TouchableOpacityProps {
  forwardedRef?: Ref<TouchableOpacity>;
  loading?: boolean;
  text: string;
}

const TextButton: FC<Props> = ({
  style,
  forwardedRef,
  text,
  loading,
  disabled,
  ...props
}) => {
  const isDisabled = loading || disabled;
  return (
    <TouchableOpacity
      ref={forwardedRef}
      style={[styles.button, isDisabled && styles.disabled, style]}
      disabled={isDisabled}
      {...props}>
      <Text style={styles.text}>{text}</Text>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator color={styles.text.color} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 50,
    overflow: 'hidden',
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    color: '#000000',
  },
  loader: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.7,
  },
});

export default forwardRef<TouchableOpacity, Omit<Props, 'forwardedRef'>>(
  (props, ref) => <TextButton forwardedRef={ref} {...props} />,
);
