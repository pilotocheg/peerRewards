import {StyleSheet, ImageBackground} from 'react-native';
import React, {FC} from 'react';

interface Props {
  size?: number; // default: 30
  url: string;
}

const Avatar: FC<Props> = ({size = 50, url}) => {
  return (
    <ImageBackground
      style={[styles.container, {width: size, height: size}]}
      source={{uri: url}}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: 'lightgray',
  },
});

export default Avatar;
