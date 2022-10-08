import {View, Text, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import Avatar from './Avatar';
import {Reward} from '../types/reward';
import {getDateString} from '../helpers/dateFormatter';

interface Props extends Omit<Reward, 'id'> {}

const RewardCard: FC<Props> = ({userName, text, date, rewardedBy}) => {
  return (
    <View style={styles.container}>
      <Avatar size={45} url={rewardedBy.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
        <Text style={styles.info}>
          {userName} rewarded by {rewardedBy.name}
          {'\n'}
          {getDateString(date)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 40,
    flexDirection: 'row',
  },
  textContainer: {
    marginLeft: 20,
    flex: 1,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
  info: {
    marginTop: 10,
    color: 'gray',
    fontSize: 10,
    lineHeight: 14,
  },
});

export default RewardCard;
