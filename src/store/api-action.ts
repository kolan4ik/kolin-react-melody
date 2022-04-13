import {createAsyncThunk} from '@reduxjs/toolkit';
import { store, api } from '../store';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { dropToken, saveToken } from '../services/token';
import { loadQuestions, redirectToRoute, requireAuthorization } from './action';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { Questions } from '../types/question';
import { errorHandle } from '../services/error-handle';


export const fetchQuestionAction = createAsyncThunk(
  'data/fetchQuestions',
  async () => {
    const {data} = await api.get<Questions>(APIRoute.Questions);
    store.dispatch(loadQuestions(data));
  },
);

export const checkAuthAction = createAsyncThunk(
  'user/checkAuth',
  async () => {
    await api.get(APIRoute.Login);
    store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
  },
);

export const logoutAction = createAsyncThunk(
  'user/logout',
  async () => {
    await api.delete(APIRoute.Logout);
    dropToken();
    store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    store.dispatch(redirectToRoute(AppRoute.Root));
  },
);


export const loginAction = createAsyncThunk(
  'user/login',
  async ({login: email, password}: AuthData) => {
    try {
      const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
      store.dispatch(redirectToRoute(AppRoute.Game));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);
