import {View, Text, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import Avatar from './Avatar';

interface Props {
  name: string;
  given: number;
  received: number;
  avatar: string;
}

const ProfileCard: FC<Props> = ({name, given, received, avatar}) => {
  return (
    <View style={styles.container}>
      <Avatar size={70} url={avatar} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.info}>
          Given <Text style={styles.bold}>${given}</Text> / Received{' '}
          <Text style={styles.bold}>${received}</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContainer: {
    marginLeft: 20,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  info: {
    marginTop: 4,
    fontSize: 12,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default ProfileCard;
