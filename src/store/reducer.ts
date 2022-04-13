import {createReducer} from '@reduxjs/toolkit';
import { checkUserAnswer, incrementStep, loadQuestions, requireAuthorization, resetGame } from './action';
import { AuthorizationStatus, FIRST_GAME_STEP } from '../const';
import { isAnswerCorrect } from '../game';
import { Questions } from '../types/question';


const STEP_COUNT = 1;

type InitalState = {
  mistakes: number,
  step: number,
  isDataLoaded: boolean,
  questions: Questions,
  authorizationStatus: AuthorizationStatus,
}

const initialState: InitalState = {
  mistakes: 0,
  step: FIRST_GAME_STEP,
  isDataLoaded: false,
  questions: [],
  authorizationStatus: AuthorizationStatus.Unknown,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(incrementStep, (state) => {
      state.step  = state.step  + STEP_COUNT;
    })
    .addCase(resetGame, (state) => {
      state.mistakes = 0;
      state.step = FIRST_GAME_STEP;
    })
    .addCase(checkUserAnswer, (state, action) => {
      const {question, userAnswer} = action.payload;
      state.mistakes += Number(!isAnswerCorrect(question, userAnswer));
    })
    .addCase(loadQuestions, (state, action) => {
      state.questions = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export {reducer};
