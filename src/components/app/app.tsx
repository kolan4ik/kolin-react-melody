import {Route, Routes} from 'react-router-dom';

import { AppRoute, MAX_MISTAKE_COUNT } from '../../const';

import WelcomeScreen from '../welcome-screen/welcome-screen';
import AuthScreen from '../auth-screen/auth-screen';
import GameOverScreen from '../game-over-screen/game-over-screen';
import WinScreen from '../win-screen/win-screen';
import NotFound from '../not-found/not-found';
import PrivatRoute from '../private-route/private-route';
import GameScreen from '../game-screen/game-screen';
import LoadingScreen from '../loading-screen/loading-screen';
import { useAppSelector } from '../../hooks';
import { isCheckedAuth } from '../../game';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

function App(): JSX.Element {

  const {authorizationStatus, isDataLoaded} = useAppSelector((state) => state);

  if (isCheckedAuth(authorizationStatus) && !isDataLoaded) { // log && to ||
    return (
      <LoadingScreen />
    );
  }


  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Root} element={<WelcomeScreen errorsCount={MAX_MISTAKE_COUNT} />}/>
        <Route path={AppRoute.Login} element={<AuthScreen />}/>
        <Route path={AppRoute.Lose} element={<GameOverScreen />}/>


        <Route
          path={AppRoute.Result}
          element={
            <PrivatRoute
              authorizationStatus={authorizationStatus}
            >
              <WinScreen />
            </PrivatRoute>
          }
        />
        <Route path={AppRoute.Result} element={<WinScreen />}/>
        <Route path="*" element={<NotFound />}/>

        <Route path={AppRoute.Game}
          element={
            <GameScreen/>
          }
        />
      </Routes>
    </HistoryRouter>

  );
}

export default App;
