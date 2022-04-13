import {Questions} from '../types/question';

const AVATAR_URL = 'https://i.pravatar.cc/128';

export const questions: Questions = [
  {
    type: 'genre',
    genre: 'rock',
    answers: [{
      src: 'https://cdn1.deliciouspears.com/load/796042940/Joseph_Trapanese_Joey_Batey_-_Burn_Butcher_Burn_(musmore.com).mp3',
      genre: 'rock',
    }, {
      src: 'https://cdn7.sefon.pro/prev/s7H5-1cWmmn5NgKUeDhvHQ/1647028683/193/The%20Hardkiss%20feat.%20MONATIK%20-%20%D0%9A%D0%BE%D0%B1%D1%80%D0%B0%20%28192kbps%29.mp3',
      genre: 'blues',
    }, {
      src: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg',
      genre: 'jazz',
    }, {
      src: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg',
      genre: 'rock',
    }],
  }, {
    type: 'artist',
    song: {
      artist: 'Jim Beam',
      src: 'https://cdn7.sefon.pro/prev/s7H5-1cWmmn5NgKUeDhvHQ/1647028683/193/The%20Hardkiss%20feat.%20MONATIK%20-%20%D0%9A%D0%BE%D0%B1%D1%80%D0%B0%20%28192kbps%29.mp3',
    },
    answers: [{
      picture: `${AVATAR_URL}?rnd=${Math.random()}`,
      artist: 'John Snow',
    }, {
      picture: `${AVATAR_URL}?rnd=${Math.random()}`,
      artist: 'Jack Daniels',
    }, {
      picture: 'https://images.unian.net/photos/2020_03/1585127477-3627.jpg?0.6150418079188471',
      artist: 'The Hardkiss',
    }],
  },
];
