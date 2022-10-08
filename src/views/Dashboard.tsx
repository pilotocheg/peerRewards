import React, {FC, useCallback} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import Drawer from '../components/Drawer';
import ProfileCard from '../components/ProfileCard';
import {calculateMoney} from '../helpers/calculateMoney';
import {useAppReducer} from '../reducers/app';
import {Reward} from '../types/reward';
import NewRewardForm, {RewardInfo} from './NewRewardForm';
import RewardsList from './RewardsList';

const Dashboard: FC = () => {
  const [
    {user, users, rewards, modalShown},
    {addReward, showModal, hideModal},
  ] = useAppReducer();

  const onAddReward = useCallback(
    (rewardInfo: RewardInfo) => {
      const newReward: Reward = {
        ...rewardInfo,
        id: rewards.length + 1,
        date: new Date(),
        rewardedBy: {...user},
      };
      addReward(newReward);
      hideModal();
    },
    [user, rewards, addReward, hideModal],
  );

  const {given, received} = calculateMoney(user, rewards);

  return (
    <>
      <SafeAreaView style={styles.dashboardTop}>
        <StatusBar backgroundColor="#e3e3e3" barStyle="dark-content" />
        <ProfileCard
          name={user.name}
          given={given}
          received={received}
          avatar={user.avatar}
        />
      </SafeAreaView>
      <View style={styles.dashboardBottom}>
        <SafeAreaView style={styles.dashboardBottom}>
          <RewardsList
            onAddBtnPress={showModal}
            userId={user.id}
            rewards={rewards}
          />
        </SafeAreaView>
        <Drawer onClose={hideModal} visible={modalShown}>
          <NewRewardForm users={users} onAddReward={onAddReward} />
        </Drawer>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  dashboardTop: {
    backgroundColor: '#e3e3e3',
  },
  dashboardBottom: {
    backgroundColor: '#ffffff',
    flexGrow: 1,
  },
});

export default Dashboard;
