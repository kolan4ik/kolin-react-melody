import {makeFakeArtistQuestion, makeFakeGenreQuestion} from '../utils/mocks';
import { AuthorizationStatus, FIRST_GAME_STEP } from '../const';
import { checkUserAnswer, incrementStep, loadQuestions, requireAuthorization, resetGame } from './action';
import { reducer } from './reducer';

const mockArtistQuestion = makeFakeArtistQuestion();
const mockFakeGenreQuestion = makeFakeGenreQuestion();


const state = {
  mistakes: 0,
  step: FIRST_GAME_STEP,
  isDataLoaded: false,
  questions: [],
  authorizationStatus: AuthorizationStatus.Unknown,
};

const questions = [makeFakeArtistQuestion(), makeFakeGenreQuestion()];

describe('Reducer: gameProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({...state});
  });

  it('should increment current step by a given value', () => {
    expect(reducer(state, incrementStep()))
      .toEqual({...state, step: 1, mistakes: 0});
  });


  it('should have reset game', () => {
    expect(reducer(state, resetGame()))
      .toEqual({...state});

  });


  it('should not increase mistakes with the correct answer', () => {
    const {artist: correctlyArtistQuestionAnswer} = mockArtistQuestion.song;
    const correctlyGenreQuestionAnswer = mockFakeGenreQuestion
      .answers.map((answer, i) => {
        if(i === 1){
          return true;
        }
        return answer.genre === mockFakeGenreQuestion.genre;
      });

    expect(reducer(state, checkUserAnswer({question: mockArtistQuestion, userAnswer: correctlyArtistQuestionAnswer})))
      .toEqual({...state, mistakes: 0});

    expect(reducer(state, checkUserAnswer({question: mockFakeGenreQuestion, userAnswer: correctlyGenreQuestionAnswer})))
      .toEqual({...state , mistakes: 0});
  });

  it('should increase number of mistakes with the wrong answer', () => {
    const wrongArtistQuestionAnswer = 'unknown';
    const wrongGenreQuestionAnswer = mockFakeGenreQuestion
      .answers
      .map((answer) => false);

    expect(reducer(state, checkUserAnswer({question: mockArtistQuestion, userAnswer: wrongArtistQuestionAnswer})))
      .toEqual({...state, mistakes: 1});

    expect(reducer(state, checkUserAnswer({question: mockFakeGenreQuestion, userAnswer: wrongGenreQuestionAnswer})))
      .toEqual({...state, mistakes: 1});
  });


  it('should update questions by load questions', () => {
    expect(reducer(state, loadQuestions(questions)))
      .toEqual({...state, questions, isDataLoaded: true});
  });

  it('should update authorizationStatus to "AUTH"', () => {
    expect(reducer(state, requireAuthorization(AuthorizationStatus.Auth)))
      .toEqual({...state, authorizationStatus: AuthorizationStatus.Auth});
  });

  it('should update authorizationStatus to "NO_AUTH"', () => {
    expect(reducer(state, requireAuthorization(AuthorizationStatus.NoAuth)))
      .toEqual({...state ,authorizationStatus: AuthorizationStatus.NoAuth});
  });
});
