import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
} from 'react-native';
import React, {FC, forwardRef, Ref} from 'react';

interface Props extends TouchableOpacityProps {
  forwardedRef?: Ref<TouchableOpacity>;
}

const AddButton: FC<Props> = ({style, forwardedRef, ...props}) => {
  return (
    <TouchableOpacity
      ref={forwardedRef}
      style={[styles.button, style]}
      {...props}>
      <Text style={styles.text}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    paddingHorizontal: 25,
    paddingVertical: 12,
    backgroundColor: '#000000',
  },
  text: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 20,
  },
});

export default forwardRef<TouchableOpacity, Omit<Props, 'forwardedRef'>>(
  (props, ref) => <AddButton forwardedRef={ref} {...props} />,
);
