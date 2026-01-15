const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}`;

const getImg = (fileName: string) => `${BASE_URL}/image/upload/${fileName}`;
const getAudio = (fileName: string) =>
  `${BASE_URL}/video/upload/${encodeURIComponent(fileName)}`;

export const ASSETS = {
  QUIZ: {
    IMAGES: {
      ZEBRA: getImg('zebra.jpg'),
      SNAKE: getImg('snake.jpg'),
      SHARK: getImg('shark.jpg'),
      POLARBEAR: getImg('polar_bear.jpg'),
      PIG: getImg('pig.jpg'),
      KANGAROO: getImg('kangaroo.jpg'),
      CAT: getImg('cat.jpg'),
      DOG: getImg('dog.jpg'),
      PENGUIN: getImg('penguin.jpg'),
      LION: getImg('lion.jpg'),
      OWL: getImg('owl.jpg'),
      ELEPHANT: getImg('elephant.jpg'),
      MONKEY: getImg('monkey.jpg'),
      FROG: getImg('frog.jpg'),
      DUCK: getImg('duck.jpg'),
      FISH: getImg('fish.jpg'),
      BIRD: getImg('bird.jpg'),
    },
    AUDIO: {
      SWIM_QUESTION: getAudio('What animal do we swim like.mp3'),
      JUMP_QUESTION: getAudio('What animal do we jump like.mp3'),
      STOMP_QUESTION: getAudio('What animal do we stomp like.mp3'),
      FLY_QUESTION: getAudio('What animal do we swing like.mp3'),
      WADDLE_QUESTION: getAudio('What animal do we waddle like.mp3'),
      SLITHER_QUESTION: getAudio('What animal do we slither like.mp3'),
    },
  },
};
