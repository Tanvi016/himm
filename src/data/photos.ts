// Opaque IDs only — real filenames never leave the server
export interface Photo {
  id: number;
  photoId: string; // resolved via mediaUrl()
  caption: string;
  date: string;
  objectFit?: 'cover' | 'contain';
}

export const photos: Photo[] = [
  {
    id: 1,
    photoId: "p11.1",
    caption: "Our first memory & remember apan bhandlo hoto..lol😂❤️",
    date: "Feb 7, 2024",
  },
  {
    id: 2,
    photoId: "p2", 
    caption: "We got late this day,but nevertheless,tujha sobat bhetun majja aali❤️",
    date: "Sep 22, 2024",
    objectFit: 'contain',
  },
  {
    id: 3,
    photoId: "p3",
    caption: "spending time w you was so fun❤️",
    date: "Nov 22, 2024",
  },
  {
    id: 4,
    photoId: "p4",
    caption: "😘❤️🫂",
    date: "Jan 12, 2025",
  },
];
