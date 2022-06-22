import {Actions, IAction, IScore} from '../types';

export const setScore = (score: number, name: string): IAction<IScore> => {
  return {type: Actions.ADD_SCORE, payload: {score, name}};
};
