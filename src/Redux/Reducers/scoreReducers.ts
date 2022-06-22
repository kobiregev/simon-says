import {Actions, IAction, IAppState, IScore} from '../types';

const initalState: IAppState = {
  scoreboard: [],
};

export const scoreReducer = (state = initalState, action: IAction<IScore>) => {
  switch (action.type) {
    case Actions.ADD_SCORE:
      const {scoreboard} = state;
      const sortedScoreboard = [...scoreboard, action.payload]
        .sort(({score: scoreA}, {score: scoreB}) => scoreB - scoreA)
        .slice(0, 10);
      return {scoreboard: sortedScoreboard};
    default:
      return state;
  }
};
