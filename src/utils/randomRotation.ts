export const randomRotation = (range: number = 3) => {
  return (Math.random() * range * 2 - range).toFixed(1);
};
