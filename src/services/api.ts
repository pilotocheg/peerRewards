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
  private deepCopy = <T>(data: T): T => {
    if (Array.isArray(data)) {
      return data.map(this.deepCopy) as T;
    }
    if (data && typeof data === 'object') {
      return {...data};
    }
    return data;
  };

  private fetch = <T>(key: DataKey | 'addReward', data?: unknown) => {
    // emulating api fetch
    return new Promise<T>(res =>
      setTimeout(() => {
        if (key === 'addReward') {
          const rewardsList = DATA_MAP.rewards as Reward[];
          const newReward = {
            ...(data as NewReward),
            id: rewardsList[rewardsList.length - 1].id + 1,
            date: new Date(),
          };
          rewardsList.push(newReward);
          res(newReward as T);
        } else {
          res(this.deepCopy(DATA_MAP[key]) as T);
        }
      }, 300),
    );
  };

  getUsers = () => this.fetch<User[]>('users');

  getRewards = () => this.fetch<Reward[]>('rewards');

  addReward = (rewardInfo: NewReward) =>
    this.fetch<Reward>('addReward', rewardInfo);

  getUser = () => this.fetch<User>('user');

  loadAllData = () =>
    Promise.all([this.getUser(), this.getRewards(), this.getUsers()]);
}

const api = new Api();

export default api;
