export type RotationId =
  | "border-josh"
  | "azaadi-classics"
  | "90s-desh-bhakti"
  | "parade-morning"
  | "filmy-josh"
  | "all-songs";

export interface Song {
  id: string;
  title: string;
  titleHindi: string;
  film: string;
  year: string;
  artist: string;
  youtubeId: string;
}

export interface Rotation {
  id: RotationId;
  label: string;
  labelHindi: string;
  vibe: string;
  vibeHindi: string;
}

export type Lang = "en" | "hi";
