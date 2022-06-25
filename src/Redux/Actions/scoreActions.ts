import {Actions, IAction, IScore} from '../types';

export const setScore = (
  id: string,
  score: number,
  name: string,
): IAction<IScore> => {
  console.log(id, score, name);
  return {type: Actions.ADD_SCORE, payload: {id, score, name}};
};
