export interface Note {
  id: number;
  title: string;
  content: string;
  isScratch?: boolean;
}

export const notes: Note[] = [
  {
    id: 1,
    title: "Open when you miss me",
    content: "Even though we are apart right now, you are always in my thoughts. Just close your eyes and know I'm thinking of you too. I can't wait to see you again.",
  },
  {
    id: 2,
    title: "Open when you need motivation",
    content: "You are capable of doing amazing things! Look at everything you've already achieved. I believe in you so much. Take a deep breath, you've completely got this!",
    isScratch: true,
  },
  {
    id: 3,
    title: "Open when you want to smile",
    content: "Remember that time how you always manage to make me smile even on my worst days? Your smile lights up my whole world.",
  },
  {
    id: 4,
    title: "Open when you want to laugh",
    content: "Remember the times we spent together alone!!🥺 You are my absolute favorite reason to be silly.",
    isScratch: true,
  },
  {
    id: 5,
    title: "Open when you feel stressed",
    content: "Take a deep breath. Drop your shoulders. Drink a glass of water. Everything is going to be okay, and I am unconditionally always here for you to vent or just sit in silence.",
  }
];
