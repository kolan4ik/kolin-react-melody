import { GenreAnswer } from '../../types/question';

type GenreQuestionItemProps = {
  id: number,
  answers: GenreAnswer,
  userAnswers : boolean[],
  renderPlayer: (src: string, playerIndex: number) => JSX.Element,
  handleAnswerChange: (i: number, value: boolean) => void
}

function GenreQuestionItem (props: GenreQuestionItemProps) : JSX.Element {

  const {id, userAnswers, answers, renderPlayer, handleAnswerChange} = props;
  return (
    <div className="track">
      {renderPlayer(answers.src, id)}
      <div className="game__answer">
        <input
          checked={userAnswers[id]}
          onChange={({target}: React.ChangeEvent<HTMLInputElement>) => {
            const value = target.checked;
            handleAnswerChange(id, value);
          }}
          className="game__input visually-hidden" type="checkbox" name="answer" value={`answer-${id}`} id={`answer-${id}`}
        />
        <label className="game__check" htmlFor={`answer-${id}`}>Отметить</label>
      </div>
    </div>);
}

export default GenreQuestionItem;
