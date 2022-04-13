export type GenreAnswer = {
  src: string,
  genre: string
}

export type ArtistAnswer = {
  picture: string,
  artist: string,
}

export type QuestionGenre = {
  type: 'genre',
  genre: string,
  answers: GenreAnswer[]
}

export type Song = {
  artist: string,
  src: string,
}


export type QuestionArtist = {
  type: 'artist',
  song: Song
  answers: ArtistAnswer[]
}

export type Question = QuestionGenre  | QuestionArtist;

export type Questions = Question[];

export type UserGenreQuestionAnswer = readonly boolean[];

export type UserArtistQuestionAnswer = string;

export type UserAnswer = UserArtistQuestionAnswer | UserGenreQuestionAnswer;
