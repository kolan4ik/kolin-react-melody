import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { resetGame } from '../../store/action';
import { loginAction } from '../../store/api-action';

function AuthScreen(): JSX.Element {

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loginRef.current !== null && passRef.current !== null) {
      dispatch(loginAction({
        login: loginRef.current.value,
        password: passRef.current.value,
      }));
    }
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <section className="login">
      <div className="login__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/></div>
      <h2 className="login__title">Вы настоящий меломан!</h2>
      <p className="login__text">Хотите узнать свой результат? Представтесь!</p>
      <form onSubmit={handleSubmit} className="login__form" action="">
        <p className="login__field">
          <label className="login__label" htmlFor="name">Логин</label>
          <input ref={loginRef} className="login__input" type="text" name="name" id="name"/>
        </p>
        <p className="login__field">
          <label className="login__label" htmlFor="password">Пароль</label>
          <input ref={passRef} className="login__input" type="text" name="password" id="password"/>
          <span className="login__error">Неверный пароль</span>
        </p>
        <button className="login__button button" type="submit">Войти</button>
      </form>
      <button onClick={() => {
        dispatch(resetGame());
        navigate(AppRoute.Game);
      }} className="replay" type="button"
      >Сыграть ещё раз
      </button>
    </section>
  );
}

export default AuthScreen;

