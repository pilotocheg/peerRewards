import React, {FC, useCallback, useEffect} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Drawer from '../components/Drawer';
import ProfileCard from '../components/ProfileCard';
import {calculateMoney} from '../helpers/calculateMoney';
import {useAppReducer} from '../reducers/app';
import api from '../services/api';
import {Reward} from '../types/reward';
import NewRewardForm from './NewRewardForm';
import RewardsList from './RewardsList';

const Dashboard: FC = () => {
  const [
    {user, rewards, users, modalShown, loading},
    {setReward, showModal, hideModal, setAllData},
  ] = useAppReducer();

  useEffect(() => {
    api.loadAllData().then(setAllData).catch(console.error);
  }, [setAllData]);

  const onAddReward = useCallback(
    (newReward: Reward) => {
      setReward(newReward);
      hideModal();
    },
    [setReward, hideModal],
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }
  if (!user) {
    // TODO: add beautiful error page
    return <Text>Something went wrong{'\n'}Please, try again later</Text>;
  }

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
          <NewRewardForm
            users={users}
            currentUser={user}
            onAddReward={onAddReward}
          />
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
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Dashboard;
