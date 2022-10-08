import {Reward} from '../types/reward';
import {User} from '../types/user';

export const calculateMoney = (user: User, rewards: Reward[]) => {
  return rewards.reduce(
    (result, reward) => {
      if (reward.id === user.id) {
        return {...result, received: result.received + reward.received};
      }
      if (reward.rewardedBy.id === user.id) {
        return {...result, given: result.given + reward.received};
      }
      return result;
    },
    {given: 0, received: 0},
  );
};
