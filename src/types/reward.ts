import {User} from './user';

export interface NewReward {
  text: string;
  received: number;
  userName: string;
  userId: number;
  rewardedBy: User;
}

export interface Reward extends NewReward {
  id: number;
  date: Date;
}
