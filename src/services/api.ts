import {rewards, users} from '../mock/data';
import {NewReward, Reward} from '../types/reward';
import {User} from '../types/user';

type DataKey = 'users' | 'rewards' | 'user';

const DATA_MAP: {[key in DataKey]: unknown} = {
  rewards,
  users,
  user: users[0],
};

class Api {
  private fetch = <T>(key: DataKey | 'addReward', data?: unknown) => {
    // emulating api fetch
    return new Promise<T>(res =>
      setTimeout(() => {
        if (key === 'addReward') {
          (DATA_MAP.rewards as Reward[]).push(data as Reward);
          res(data as T);
        } else {
          res(DATA_MAP[key] as T);
        }
      }, 300),
    );
  };

  getUsers = () => this.fetch<User[]>('users');

  getRewards = () => this.fetch<Reward[]>('rewards');

  addReward = (rewardInfo: NewReward) => {
    const newReward: Reward = {
      ...rewardInfo,
      id: rewards.length + 1,
      date: new Date(),
    };
    return this.fetch<Reward>('addReward', newReward);
  };

  getUser = () => this.fetch<User>('user');

  loadAllData = () =>
    Promise.all([this.getUser(), this.getRewards(), this.getUsers()]);
}

const api = new Api();

export default api;
