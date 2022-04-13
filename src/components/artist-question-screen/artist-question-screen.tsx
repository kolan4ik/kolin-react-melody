import { PropsWithChildren } from 'react';
import { QuestionArtist, UserAnswer } from '../../types/question';
import Logo from '../UI/logo/logo';

type ArtistScreenProps = PropsWithChildren<{
  artist: QuestionArtist,
  onAnswer: (artist: QuestionArtist, answers: UserAnswer) => void;
  renderPlayer: (src: string, playerIndex: number) => JSX.Element;
}>


function ArtistQuestionScreen(props: ArtistScreenProps): JSX.Element {
  const {artist, onAnswer, renderPlayer, children} = props;
  const {song, answers} = artist;
  return (
    <section className="game game--artist">
      <header className="game__header">
        <Logo/>

        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370" style={{filter: 'url(#blur)', transform: 'rotate(-90deg) scaleY(-1)', transformOrigin: 'center'}} />
        </svg>

        {children}
      </header>

      <section className="game__screen">
        <h2 className="game__title">Кто исполняет эту песню?</h2>
        <div className="game__track">
          <div className="track">
            {renderPlayer(song.src, 0)}
          </div>
        </div>

        <form className="game__artist">
          {answers.map((item, i) => {
            const ketVal =  `${i}-${item.picture}`;
            return (
              <div key={ketVal} onClick={() => {
                onAnswer(artist, item.artist);
              }} className="artist"
              >
                <input className="artist__input visually-hidden" type="radio" name="answer" value={`answer-${i}`} id={`answer-${i}`}/>
                <label className="artist__name" htmlFor={`answer-${i}`}>
                  <img className="artist__picture" src={item.picture} alt={item.artist}/>
                  {item.artist}
                </label>
              </div>
            );
          })}
        </form>
      </section>
    </section>
  );
}

export default ArtistQuestionScreen;

