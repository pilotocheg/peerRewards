import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  LayoutChangeEvent,
  Platform,
} from 'react-native';
import React, {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

interface Props {
  onClose: () => void;
  visible: boolean;
}

const Drawer: FC<PropsWithChildren<Props>> = ({onClose, visible, children}) => {
  const fadeAnim = useRef(new Animated.Value(Number(visible))).current;
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (height) {
      Animated.timing(fadeAnim, {
        toValue: Number(visible),
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [fadeAnim, visible, height]);

  const onViewLayout = useCallback((e: LayoutChangeEvent) => {
    setHeight(e.nativeEvent.layout.height);
  }, []);

  return (
    <Animated.View
      onLayout={onViewLayout}
      style={{
        ...styles.container,
        transform: [
          {
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [height, 0],
            }),
          },
        ],
      }}>
      {children}
      <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
        <Text style={styles.btnText}>✕</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#000000',
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  closeBtn: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 50 : 10,
    right: 40,
  },
  btnText: {
    color: '#ffffff',
    fontSize: 30,
  },
});

export default Drawer;
