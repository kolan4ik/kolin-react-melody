import { Navigate } from 'react-router-dom';
import {AppRoute, MAX_MISTAKE_COUNT} from '../../const';
import withAudioPlayer from '../../hocs/with-audio-player/with-audio-player';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { checkUserAnswer, incrementStep } from '../../store/action';
import { Question, QuestionArtist, QuestionGenre, UserAnswer } from '../../types/question';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';
import Mistakes from '../mistakes/mistakes';

const GenreQuestionScreenWrapper = withAudioPlayer(GenreQuestionScreen);
const ArtistQuestionScreenWrapper = withAudioPlayer(ArtistQuestionScreen);

function GameScreen(): JSX.Element {
  const {step, mistakes, questions} = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  const onUserAnswer = (questionItem: Question, userAnswer: UserAnswer) =>  {
    dispatch(incrementStep());
    dispatch(checkUserAnswer({question: questionItem, userAnswer}));
  };

  if(MAX_MISTAKE_COUNT <= mistakes){
    return <Navigate to={AppRoute.Lose} />;
  }
  if(questions.length <= step){
    return <Navigate to={AppRoute.Result} />;
  }

  const {type} = questions[step];

  switch (type) {
    case 'genre':
      return (
        <GenreQuestionScreenWrapper
          question={questions[step] as QuestionGenre}
          onAnswer={onUserAnswer}
        >
          <Mistakes count={mistakes} />
        </GenreQuestionScreenWrapper>
      );
      break;
    case 'artist':
      return (
        <ArtistQuestionScreenWrapper
          artist={questions[step] as QuestionArtist}
          onAnswer={onUserAnswer}
        >
          <Mistakes count={mistakes} />
        </ArtistQuestionScreenWrapper>
      );
      break;
    default:
      return <Navigate to={AppRoute.Root} />;
  }
}

export default GameScreen;

