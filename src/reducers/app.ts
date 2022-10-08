import {Dispatch, Reducer, useReducer} from 'react';
import {rewards, users} from '../mock/data';
import {Reward} from '../types/reward';
import {User} from '../types/user';

interface State {
  user: User;
  users: User[];
  rewards: Reward[];
  modalShown: boolean;
}

enum APP_ACTIONS {
  ADD_REWARD = 'ADD_REWARD',
  SHOW_MODAL = 'SHOW_MODAL',
  HIDE_MODAL = 'HIDE_MODAL',
}

interface Action {
  type: APP_ACTIONS;
  payload?: Reward;
}

const initialState: State = {
  user: {...users[0]},
  users,
  rewards: [...rewards],
  modalShown: false,
};

const appReducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case APP_ACTIONS.ADD_REWARD:
      return {
        ...state,
        rewards: state.rewards.concat(action.payload as Reward),
      };
    case APP_ACTIONS.SHOW_MODAL:
      return {
        ...state,
        modalShown: true,
      };
    case APP_ACTIONS.HIDE_MODAL:
      return {
        ...state,
        modalShown: false,
      };
    default:
      return state;
  }
};

interface Actions {
  addReward: (reward: Reward) => void;
  showModal: () => void;
  hideModal: () => void;
}

const addRewardAction =
  (dispatch: Dispatch<Action>): Actions['addReward'] =>
  reward =>
    dispatch({type: APP_ACTIONS.ADD_REWARD, payload: reward});

const showModalAction =
  (dispatch: Dispatch<Action>): Actions['showModal'] =>
  () =>
    dispatch({type: APP_ACTIONS.SHOW_MODAL});

const hideModalAction =
  (dispatch: Dispatch<Action>): Actions['hideModal'] =>
  () =>
    dispatch({type: APP_ACTIONS.HIDE_MODAL});

export const useAppReducer = (): [State, Actions] => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return [
    state,
    {
      addReward: addRewardAction(dispatch),
      showModal: showModalAction(dispatch),
      hideModal: hideModalAction(dispatch),
    },
  ];
};
