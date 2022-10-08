import {User} from './user';

export interface Reward {
  id: number;
  text: string;
  date: Date;
  rewardedBy: User;
  received: number;
  userName: string;
  userId: number;
}
