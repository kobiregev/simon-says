export enum Actions {
  ADD_SCORE,
}
export interface IScore {
  name: string;
  score: number;
}
export interface IAppState {
  scoreboard: IScore[];
}
export interface IAction<T> {
  type: Actions;
  payload: T;
}
