import {Reward} from '../types/reward';
import {User} from '../types/user';

export const users: User[] = [
  {
    id: 1,
    name: 'John Doe',
    avatar:
      'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
  },
  {
    id: 2,
    name: 'Alex Brown',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu_fpPmbK-bebEeX036y7frmW06amtCkG1ew&usqp=CAU',
  },
  {
    id: 3,
    name: 'Bruce Lee',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYtfZRhbGQtq2BapB2MXJfWIO2QriO5Wx3qQ&usqp=CAU',
  },
];

export const rewards: Reward[] = [
  {
    id: 1,
    userId: users[0].id,
    userName: users[0].name,
    date: new Date(2022, 9, 6),
    text: 'Big thanks for your help on the outage today!',
    rewardedBy: {...users[1]},
    received: 200,
  },
  {
    id: 2,
    userId: users[1].id,
    userName: users[1].name,
    date: new Date(2022, 9, 3),
    text: 'Thanks for you patience and help with the product! It looks just amazing!',
    rewardedBy: {...users[0]},
    received: 100,
  },
  {
    id: 3,
    userId: users[0].id,
    userName: users[0].name,
    date: new Date(),
    text: 'Big thanks for your help on the outage today! bla bla bla',
    rewardedBy: {
      ...users[1],
    },
    received: 200,
  },
];
