import {ThunkAction, ThunkDispatch} from 'redux-thunk';

import { AnyAction } from 'redux';
import { IRootState } from '../redux/states/rootState';

export type AppThunkAction<R> = ThunkAction<R, IRootState, undefined, AnyAction>;

export type AppThunkDispatch = ThunkDispatch<IRootState, undefined, AnyAction>;