interface IAnimeShikiGraph {
  data: {
    animes: IAnimeShiki[];
  };
}

interface IAnimeShiki {
  id: string;
  malId: string;
  name: string;
  russian: string;
  licenseNameRu?: string;
  english: string;
  japanese: string;
  synonyms: string[];
  kind: string;
  rating: string;
  score: number;
  status: string;
  episodes: number;
  episodesAired: number;
  duration: number;
  airedOn: AiredOn;
  releasedOn: ReleasedOn;
  url: string;
  season?: string;
  poster: Poster;
  franchise: string | null;
  fansubbers: string[];
  fandubbers: string[];
  licensors: string[];
  createdAt: string;
  updatedAt: string;
  nextEpisodeAt?: string;
  isCensored: boolean;
  genres: Genre[];
  studios: Studio[];
  externalLinks: ExternalLink[];
  personRoles: PersonRole[];
  characterRoles: CharacterRole[];
  related: Related[];
  videos: Video[];
  screenshots: Screenshot[];
  scoresStats: ScoresStat[];
  statusesStats: StatusesStat[];
  description: string;
  descriptionHtml: string;
  descriptionSource: any;
}

interface AiredOn {
  year: number;
  month: number;
  day: number;
  date: string;
}

interface ReleasedOn {
  year?: number;
  month?: number;
  day?: number;
  date?: string;
}

interface Poster {
  id: string;
  originalUrl: string;
  mainUrl: string;
}

interface Genre {
  id: string;
  name: string;
  russian: string;
  kind: string;
}

interface Studio {
  id: string;
  name: string;
  imageUrl?: string;
}

interface ExternalLink {
  id?: string;
  kind: string;
  url: string;
  createdAt?: string;
  updatedAt?: string;
}

interface PersonRole {
  id: string;
  rolesRu: string[];
  rolesEn: string[];
  person: Person;
}

interface Person {
  id: string;
  name: string;
  poster?: Poster2;
}

interface Poster2 {
  id: string;
}

interface CharacterRole {
  id: string;
  rolesRu: string[];
  rolesEn: string[];
  character: Character;
}

interface Character {
  id: string;
  name: string;
  poster?: Poster3;
}

interface Poster3 {
  id: string;
}

interface Related {
  id: string;
  anime?: Anime2;
  manga?: Manga;
  relationRu: string;
  relationEn: string;
}

interface Anime2 {
  id: string;
  name: string;
}

interface Manga {
  id: string;
  name: string;
}

interface Video {
  id: string;
  url: string;
  name: string;
  kind: string;
  playerUrl: string;
  imageUrl: string;
}

interface Screenshot {
  id: string;
  originalUrl: string;
  x166Url: string;
  x332Url: string;
}

interface ScoresStat {
  score: number;
  count: number;
}

interface StatusesStat {
  status: string;
  count: number;
}

export type { IAnimeShiki, IAnimeShikiGraph };
