import {Dispatch, Reducer, useReducer} from 'react';
import {Reward} from '../types/reward';
import {User} from '../types/user';

interface State {
  user: User | null;
  users: User[];
  rewards: Reward[];
  modalShown: boolean;
  loading: boolean;
}

enum APP_ACTIONS {
  SET_ALL_DATA = 'SET_ALL_DATA',
  ADD_REWARD = 'ADD_REWARD',
  SHOW_MODAL = 'SHOW_MODAL',
  HIDE_MODAL = 'HIDE_MODAL',
}

type AllData = [User, Reward[], User[]];

interface Action {
  type: APP_ACTIONS;
  payload?: Reward | AllData;
}

const initialState: State = {
  user: null,
  users: [],
  rewards: [],
  modalShown: false,
  loading: true,
};

const appReducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case APP_ACTIONS.SET_ALL_DATA: {
      const [user, rewards, users] = action.payload as AllData;
      return {
        ...state,
        user,
        rewards,
        users,
        loading: false,
      };
    }
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
  setAllData: (data: AllData) => void;
  setReward: (reward: Reward) => void;
  showModal: () => void;
  hideModal: () => void;
}

const setAllDataAction =
  (dispatch: Dispatch<Action>): Actions['setAllData'] =>
  payload =>
    dispatch({type: APP_ACTIONS.SET_ALL_DATA, payload});

const setRewardAction =
  (dispatch: Dispatch<Action>): Actions['setReward'] =>
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
      setAllData: setAllDataAction(dispatch),
      setReward: setRewardAction(dispatch),
      showModal: showModalAction(dispatch),
      hideModal: hideModalAction(dispatch),
    },
  ];
};
