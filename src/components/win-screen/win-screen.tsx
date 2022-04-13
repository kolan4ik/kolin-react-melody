import {useAppDispatch, useAppSelector} from '../../hooks';
import {Link, useNavigate} from 'react-router-dom';
import {AppRoute} from '../../const';
import {resetGame} from '../../store/action';
import { logoutAction } from '../../store/api-action';

function WinScreen(): JSX.Element {
  const {mistakes, step} = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <section className="result">
      <div className="result-logout__wrapper">
        <Link onClick={(e) => {
          e.preventDefault();
          dispatch(logoutAction());
        }}  className="result-logout__link" to={AppRoute.Login}
        >Выход
        </Link>
      </div>
      <div className="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/></div>
      <h2 className="result__title">Вы настоящий меломан!</h2>
      <p className="result__total">Вы ответили правильно на {step - mistakes} вопросов и совершили {mistakes} ошибки</p>
      <button className="replay" onClick={ () => {
        dispatch(resetGame());
        navigate(AppRoute.Game);
      }} type="button"
      >Сыграть ещё раз
      </button>
    </section>
  );
}

export default WinScreen;

