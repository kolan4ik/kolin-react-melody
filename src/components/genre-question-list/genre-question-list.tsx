import { useUserAnswers } from '../../hooks/use-user-answers';
import { QuestionGenre, UserAnswer } from '../../types/question';
import GenreQuestionItem from '../genre-question-item/genre-question-item';

type GenreQuestionListProps = {
  question: QuestionGenre,
  onAnswer: (question: QuestionGenre, answers: UserAnswer) => void,
  renderPlayer: (src: string, playerIndex: number) => JSX.Element,

}

function GenreQuestionList (props:GenreQuestionListProps):JSX.Element {
  const {question, onAnswer, renderPlayer} = props;
  const [userAnswers, handleAnswerChange] = useUserAnswers(question);

  return (
    <form onSubmit={(e : React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onAnswer(question, userAnswers);
    }} className="game__tracks"
    >
      {question.answers.map((item, i) => {
        const keyVal = `${i}-${item.src}`;
        return (
          <GenreQuestionItem
            key={keyVal}
            id={i}
            renderPlayer={renderPlayer}
            handleAnswerChange={handleAnswerChange}
            userAnswers={userAnswers}
            answers={item}
          />
        );
      })}


      <button className="game__submit button" type="submit">Ответить</button>
    </form>
  );
}

export default GenreQuestionList;
