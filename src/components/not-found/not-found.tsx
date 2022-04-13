
import {Link} from 'react-router-dom';
import { AppRoute } from '../../const';

function NotFound(): JSX.Element {
  return (
    <section className="welcome">
      <Link to={AppRoute.Root} className="welcome__logo"><img src="/img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/></Link>
      <h2 className="result__title">Какая жалость!</h2>
      <p className="result__total result__total--fail">404</p>
    </section>
  );
}

export default NotFound;

