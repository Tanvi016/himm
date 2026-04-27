// Opaque IDs only — real filenames never leave the server
export interface Song {
  id: string;
  title: string;
  artist: string;
  caption: string;
  coverId: string;   // used with mediaUrl('c1') etc.
  audioId: string;
}

export const songs: Song[] = [
  {
    id: "1",
    title: "Tum Ho Toh",
    artist: "Saiyaara",
    caption: "",
    coverId: "c1",
    audioId: "s1",
  },
  {
    id: "2",
    title: "Chahun Main Ya Na",
    artist: "Aashiqui 2",
    caption: "",
    coverId: "c2",
    audioId: "s2",
  },
  {
    id: "3",
    title: "Ghera Hua",
    artist: "Dhurandhar",
    caption: "",
    coverId: "c3",
    audioId: "s3",
  },
];
