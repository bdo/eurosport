export interface Player {
  id: number;
  firstname: string;
  lastname: string;
  shortname: string;
  sex: string;
  country: Country;
  picture: string;
  data: Data;
}
export interface Country {
  picture: string;
  code: string;
}
export interface Data {
  rank: number;
  points: number;
  weight: number;
  height: number;
  age: number;
  last: number[];
}
