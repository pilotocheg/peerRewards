import {ScrollView, StyleSheet, View} from 'react-native';
import React, {FC, useMemo, useState} from 'react';
import TabBar from '../components/TabBar';
import {Reward} from '../types/reward';
import RewardCard from '../components/RewardCard';
import AddButton from '../components/AddButton';

interface Props {
  rewards: Reward[];
  userId: number;
  onAddBtnPress: () => void;
}

const TABS = ['Feed', 'My Rewards'];

const RewardsList: FC<Props> = ({rewards, userId, onAddBtnPress}) => {
  const [tab, setTab] = useState(TABS[0]);

  const visibleRewards = useMemo(() => {
    if (tab === TABS[1]) {
      return rewards.filter(reward => reward.userId === userId);
    }
    return rewards;
  }, [rewards, tab, userId]);

  return (
    <View style={styles.container}>
      <TabBar tabs={TABS} selected={tab} onTabChange={setTab} />
      <ScrollView style={styles.list}>
        {visibleRewards.map(reward => (
          <RewardCard key={reward.id} {...reward} />
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <AddButton onPress={onAddBtnPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#e3e3e3',
  },
  list: {
    backgroundColor: '#ffffff',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1,
  },
});

export default RewardsList;
