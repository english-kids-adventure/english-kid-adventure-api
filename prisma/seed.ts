import { prisma } from '../src/common/config/prisma';
import bcrypt from 'bcrypt';
import { ASSETS } from '../src/common/constants/cloudinary-assets';
async function main() {
  const password = await bcrypt.hash('password123', 10);
  const today = new Date();
  const weekStart = new Date('2025-12-22');

  // ====================== 1. INSERT USERS ======================
  const user1 = await prisma.user.create({
    data: {
      name: 'Mai Tram',
      email: 'tramhuynh@gmail.com',
      password,
      totalXp: 1200,
      totalStars: 45,
      currentStreak: 5,
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Liam',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Kim Han',
      email: 'kimhan@gmail.com',
      password,
      totalXp: 850,
      totalStars: 30,
      currentStreak: 3,
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: 'Gia Toan',
      email: 'giatoan@gmail.com',
      password,
      totalXp: 2100,
      totalStars: 80,
      currentStreak: 12,
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Noah',
    },
  });

  const user4 = await prisma.user.create({
    data: {
      name: 'Hanh',
      email: 'hanh@gmail.com',
      password,
      totalXp: 450,
      totalStars: 10,
      currentStreak: 1,
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia',
    },
  });

  const user5 = await prisma.user.create({
    data: {
      name: 'Cong Van',
      email: 'congvan@gmail.com',
      password,
      totalXp: 1600,
      totalStars: 55,
      currentStreak: 7,
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=William',
    },
  });

  const user6 = await prisma.user.create({
    data: {
      name: 'Huyen Trang',
      email: 'huyentrang@gmail.com',
      password,
      totalXp: 920,
      totalStars: 25,
      currentStreak: 4,
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia',
    },
  });

  const user7 = await prisma.user.create({
    data: {
      name: 'Thanh Tam',
      email: 'thanhtam@gmail.com',
      password,
      totalXp: 110,
      totalStars: 5,
      currentStreak: 0,
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    },
  });

  const user8 = await prisma.user.create({
    data: {
      name: 'Thi Dieu',
      email: 'thidieu@gmail.com',
      password,
      totalXp: 3000,
      totalStars: 150,
      currentStreak: 20,
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella',
    },
  });

  const user9 = await prisma.user.create({
    data: {
      name: 'Van Luan',
      email: 'vanluan@gmail.com',
      password,
      totalXp: 540,
      totalStars: 12,
      currentStreak: 2,
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Benjamin',
    },
  });

  const user10 = await prisma.user.create({
    data: {
      name: 'Thi On',
      email: 'thion@gmail.com',
      password,
      totalXp: 780,
      totalStars: 22,
      currentStreak: 3,
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlotte',
    },
  });

  // ====================== 2. INSERT TOPICS ======================
  const topic1 = await prisma.topic.create({
    data: {
      name: 'Animals',
      description: 'Explore wildlife and pets',
      thumbnailUrl:
        'https://i.pinimg.com/736x/bd/f3/84/bdf384f541d681ed2ffc27550475fcb2.jpg',
    },
  });

  const topic2 = await prisma.topic.create({
    data: {
      name: 'Colors',
      description: 'Primary and secondary colors',
      thumbnailUrl:
        'https://i.pinimg.com/736x/d0/b2/8b/d0b28b8d287b8b66b2557753aa3e6892.jpg',
    },
  });

  const topic3 = await prisma.topic.create({
    data: {
      name: 'Numbers',
      description: 'Count from 1 to 100',
      thumbnailUrl:
        'https://i.pinimg.com/736x/6d/8d/42/6d8d42501d7022bf67602715fa9185b5.jpg',
    },
  });

  const topic4 = await prisma.topic.create({
    data: {
      name: 'Fruits',
      description: 'Healthy and delicious treats',
      thumbnailUrl:
        'https://i.pinimg.com/1200x/ac/50/f4/ac50f465e49be63a2fccde755aec3be8.jpg',
    },
  });

  const topic5 = await prisma.topic.create({
    data: {
      name: 'Family',
      description: 'Members of a household',
      thumbnailUrl:
        'https://i.pinimg.com/736x/91/6d/81/916d810dbaf18fb361341c000ecfd5bf.jpg',
    },
  });

  const topic6 = await prisma.topic.create({
    data: {
      name: 'Vehicles',
      description: 'Cars, bikes, and transportation',
      thumbnailUrl:
        'https://i.pinimg.com/1200x/cf/3c/ee/cf3cee240906c43ff0d7e9a4dc6435b8.jpg',
    },
  });

  const topic7 = await prisma.topic.create({
    data: {
      name: 'Jobs',
      description: 'Different kinds of professions',
      thumbnailUrl:
        'https://i.pinimg.com/736x/4c/34/fd/4c34fde216dd881853eac0f0cc820d60.jpg',
    },
  });

  const topic8 = await prisma.topic.create({
    data: {
      name: 'Body Parts',
      description: 'Learn about the human body',
      thumbnailUrl:
        'https://i.pinimg.com/736x/06/04/73/0604736be6733a6b9bb4ebf5d9570030.jpg',
    },
  });

  const topic9 = await prisma.topic.create({
    data: {
      name: 'Food',
      description: 'Meals, snacks, and ingredients',
      thumbnailUrl:
        'https://i.pinimg.com/1200x/f6/32/03/f63203086b30e7bebdbe2313ec0af662.jpg',
    },
  });

  const topic10 = await prisma.topic.create({
    data: {
      name: 'Sports',
      description: 'Popular sports and activities',
      thumbnailUrl:
        'https://i.pinimg.com/736x/f7/05/66/f705667ef2678bdb1bd8d55d3da6c88d.jpg',
    },
  });

  const topic11 = await prisma.topic.create({
    data: {
      name: 'Weather',
      description: 'Sunny, rainy, and snowy days',
      thumbnailUrl:
        'https://i.pinimg.com/1200x/39/96/ee/3996eed86cde0584228b5cd75722d436.jpg',
    },
  });

  const topic12 = await prisma.topic.create({
    data: {
      name: 'Clothes',
      description: 'What people wear every day',
      thumbnailUrl:
        'https://i.pinimg.com/1200x/5e/54/38/5e5438d49903c68170dd379427473e0f.jpg',
    },
  });

  const topic13 = await prisma.topic.create({
    data: {
      name: 'Places',
      description: 'Famous places around the world',
      thumbnailUrl:
        'https://i.pinimg.com/736x/07/24/d8/0724d8467b653aba71722288faadd1d8.jpg',
    },
  });

  const topic14 = await prisma.topic.create({
    data: {
      name: 'Transportation',
      description: 'Ways people travel',
      thumbnailUrl:
        'https://i.pinimg.com/1200x/e2/ab/2e/e2ab2e11e71214c0f178b355721b2da0.jpg',
    },
  });

  const topic15 = await prisma.topic.create({
    data: {
      name: 'Music',
      description: 'Sounds, songs, and instruments',
      thumbnailUrl:
        'https://i.pinimg.com/1200x/a5/c5/00/a5c50039349f459a9d3e85b8a9e16d29.jpg',
    },
  });

  // ====================== 3. INSERT VIDEOS ======================
  // Topic 1: Animals
  const video1_1 = await prisma.video.create({
    data: {
      topicId: topic1.id,
      title: 'Animals Lesson 1',
      url: 'https://www.youtube-nocookie.com/embed/efiWeJbdbxk?controls=1&rel=0&modestbranding=1',
      level: 'EASY',
      unlockCost: 0,
      xpReward: 50,
      orderIndex: 1,
      duration: 50,
      questions: {
        create: [
          {
            content: 'What sound does a dog make?',
            answers: {
              create: [
                { content: 'Meow', isCorrect: false },
                { content: 'Moo', isCorrect: false },
                { content: 'Ruft', isCorrect: true },
                { content: 'Quack', isCorrect: false },
              ],
            },
          },
          {
            content: 'What sound does a cat make?',
            answers: {
              create: [
                { content: 'Meow', isCorrect: true },
                { content: 'Woof', isCorrect: false },
                { content: 'Moo', isCorrect: false },
                { content: 'Quack', isCorrect: false },
              ],
            },
          },
          {
            content: 'What sound does a cow make?',
            answers: {
              create: [
                { content: 'Moo', isCorrect: true },
                { content: 'Quack', isCorrect: false },
                { content: 'Ruft', isCorrect: false },
                { content: 'Meow', isCorrect: false },
              ],
            },
          },
          {
            content: 'Which animal says “Oink oink”?',
            answers: {
              create: [
                { content: 'Cow', isCorrect: false },
                { content: 'Sheep', isCorrect: false },
                { content: 'Giraffe', isCorrect: false },
                { content: 'Pig', isCorrect: true },
              ],
            },
          },
          {
            content: 'What sound does a horse make?',
            answers: {
              create: [
                { content: 'Moo', isCorrect: false },
                { content: 'Neigh', isCorrect: true },
                { content: 'Meow', isCorrect: false },
                { content: 'Tiger', isCorrect: false },
              ],
            },
          },
          {
            content: 'What sound does a wolf make?',
            answers: {
              create: [
                { content: 'Moo', isCorrect: false },
                { content: 'Neigh', isCorrect: false },
                { content: 'Meow', isCorrect: false },
                { content: 'Howl', isCorrect: true },
              ],
            },
          },
          {
            content: 'What sound does a snake make?',
            answers: {
              create: [
                { content: 'Hiss', isCorrect: true },
                { content: 'Neigh', isCorrect: false },
                { content: 'Meow', isCorrect: false },
                { content: 'Howl', isCorrect: false },
              ],
            },
          },
          {
            content: 'What sound does a frog make?',
            answers: {
              create: [
                { content: 'Hiss', isCorrect: false },
                { content: 'Neigh', isCorrect: false },
                { content: 'Ribbit', isCorrect: true },
                { content: 'Howl', isCorrect: false },
              ],
            },
          },
          {
            content: 'What sound does a whale make?',
            answers: {
              create: [
                { content: 'Hiss', isCorrect: false },
                { content: 'Pff', isCorrect: true },
                { content: 'Ribbit', isCorrect: false },
                { content: 'Howl', isCorrect: false },
              ],
            },
          },
          {
            content: 'What sound does a owl make?',
            answers: {
              create: [
                { content: 'Hoo', isCorrect: true },
                { content: 'Pff', isCorrect: false },
                { content: 'Ribbit', isCorrect: false },
                { content: 'Howl', isCorrect: false },
              ],
            },
          },
          {
            content: 'What sound does a sheep make?',
            answers: {
              create: [
                { content: 'Pff', isCorrect: false },
                { content: 'Ribbit', isCorrect: false },
                { content: 'Howl', isCorrect: false },
                { content: 'Baa', isCorrect: true },
              ],
            },
          },
          {
            content: 'What sound does a chicken make?',
            answers: {
              create: [
                { content: 'Pff', isCorrect: false },
                { content: 'Bak', isCorrect: true },
                { content: 'Howl', isCorrect: false },
                { content: 'Baa', isCorrect: false },
              ],
            },
          },
        ],
      },
    },
  });

  const video1_2 = await prisma.video.create({
    data: {
      topicId: topic1.id,
      title: 'Animals Lesson 2',
      url: 'https://www.youtube-nocookie.com/embed/OwRmivbNgQk?controls=1&rel=0&modestbranding=1',
      level: 'EASY',
      unlockCost: 0,
      xpReward: 50,
      duration: 60,
      orderIndex: 2,
      questions: {
        create: [
          {
            mediaUrl: ASSETS.QUIZ.AUDIO.STOMP_QUESTION,
            answers: {
              create: [
                { mediaUrl: ASSETS.QUIZ.IMAGES.MONKEY, isCorrect: false },
                { mediaUrl: ASSETS.QUIZ.IMAGES.LION, isCorrect: false },
                { mediaUrl: ASSETS.QUIZ.IMAGES.ELEPHANT, isCorrect: true },
                { mediaUrl: ASSETS.QUIZ.IMAGES.ZEBRA, isCorrect: false },
              ],
            },
          },
          {
            mediaUrl: ASSETS.QUIZ.AUDIO.JUMP_QUESTION,
            answers: {
              create: [
                { mediaUrl: ASSETS.QUIZ.IMAGES.PIG, isCorrect: false },
                { mediaUrl: ASSETS.QUIZ.IMAGES.KANGAROO, isCorrect: true },
                { mediaUrl: ASSETS.QUIZ.IMAGES.CAT, isCorrect: false },
                { mediaUrl: ASSETS.QUIZ.IMAGES.DOG, isCorrect: false },
              ],
            },
          },
          {
            mediaUrl: ASSETS.QUIZ.AUDIO.SWIM_QUESTION,
            answers: {
              create: [
                { mediaUrl: ASSETS.QUIZ.IMAGES.BIRD, isCorrect: false },
                { mediaUrl: ASSETS.QUIZ.IMAGES.FISH, isCorrect: false },
                { mediaUrl: ASSETS.QUIZ.IMAGES.MONKEY, isCorrect: true },
                { mediaUrl: ASSETS.QUIZ.IMAGES.CAT, isCorrect: false },
              ],
            },
          },
          {
            mediaUrl: ASSETS.QUIZ.AUDIO.WADDLE_QUESTION,
            answers: {
              create: [
                { mediaUrl: ASSETS.QUIZ.IMAGES.PENGUIN, isCorrect: true },
                { mediaUrl: ASSETS.QUIZ.IMAGES.BIRD, isCorrect: false },
                { mediaUrl: ASSETS.QUIZ.IMAGES.PIG, isCorrect: false },
                { mediaUrl: ASSETS.QUIZ.IMAGES.CAT, isCorrect: false },
              ],
            },
          },
          {
            mediaUrl: ASSETS.QUIZ.AUDIO.SLITHER_QUESTION,
            answers: {
              create: [
                { mediaUrl: ASSETS.QUIZ.IMAGES.BIRD, isCorrect: false },
                { mediaUrl: ASSETS.QUIZ.IMAGES.FISH, isCorrect: false },
                { mediaUrl: ASSETS.QUIZ.IMAGES.SNAKE, isCorrect: true },
                { mediaUrl: ASSETS.QUIZ.IMAGES.CAT, isCorrect: false },
              ],
            },
          },
          {
            mediaUrl: ASSETS.QUIZ.AUDIO.SWIM_QUESTION,
            answers: {
              create: [
                { mediaUrl: ASSETS.QUIZ.IMAGES.PIG, isCorrect: false },
                { mediaUrl: ASSETS.QUIZ.IMAGES.POLARBEAR, isCorrect: true },
                { mediaUrl: ASSETS.QUIZ.IMAGES.SHARK, isCorrect: false },
                { mediaUrl: ASSETS.QUIZ.IMAGES.OWL, isCorrect: false },
              ],
            },
          },
          {
            content: 'Where do the animals go?',
            answers: {
              create: [
                { content: 'To school', isCorrect: false },
                { content: 'To the park', isCorrect: false },
                { content: 'To the farm', isCorrect: false },
                { content: 'To the zoo', isCorrect: true },
              ],
            },
          },
        ],
      },
    },
  });

  const video1_3 = await prisma.video.create({
    data: {
      topicId: topic1.id,
      title: 'Animals Lesson 3',
      url: 'https://www.youtube-nocookie.com/embed/UpQ6Izgy6kI?controls=1&rel=0&modestbranding=1',
      level: 'MEDIUM',
      unlockCost: 5,
      xpReward: 100,
      orderIndex: 3,
      questions: {
        create: [
          {
            content: 'Who is in the yellow barn?',
            answers: {
              create: [
                { content: 'Pig', isCorrect: false },
                { content: 'Cat', isCorrect: false },
                { content: 'Duck', isCorrect: true },
                { content: 'Frog', isCorrect: false },
              ],
            },
          },
          {
            content: 'What color is the duck?',
            answers: {
              create: [
                { content: 'Pink', isCorrect: false },
                { content: 'Yellow', isCorrect: true },
                { content: 'Green', isCorrect: false },
                { content: 'Brown', isCorrect: false },
              ],
            },
          },
          {
            content: 'Who is in the pink barn?',
            answers: {
              create: [
                { content: 'Sheep', isCorrect: false },
                { content: 'Pig', isCorrect: true },
                { content: 'Horse', isCorrect: false },
                { content: 'Cat', isCorrect: false },
              ],
            },
          },
          {
            content: 'Who is in the orange barn?',
            answers: {
              create: [
                { content: 'Duck', isCorrect: false },
                { content: 'Frog', isCorrect: false },
                { content: 'Cat', isCorrect: true },
                { content: 'Sheep', isCorrect: false },
              ],
            },
          },
          {
            content: 'What animal is green?',
            answers: {
              create: [
                { content: 'Pig', isCorrect: false },
                { content: 'Frog', isCorrect: true },
                { content: 'Cat', isCorrect: false },
                { content: 'Horse', isCorrect: false },
              ],
            },
          },
          {
            content: 'Who is in the white barn?',
            answers: {
              create: [
                { content: 'Duck', isCorrect: false },
                { content: 'Pig', isCorrect: false },
                { content: 'Sheep', isCorrect: true },
                { content: 'Frog', isCorrect: false },
              ],
            },
          },
          {
            content: 'Who is in the brown barn?',
            answers: {
              create: [
                { content: 'Cow', isCorrect: false },
                { content: 'Horse', isCorrect: true },
                { content: 'Sheep', isCorrect: false },
                { content: 'Cat', isCorrect: false },
              ],
            },
          },
          {
            content: 'What do we say after knock, knock, knock?',
            answers: {
              create: [
                { content: 'Goodbye', isCorrect: false },
                { content: 'Thank you', isCorrect: false },
                { content: 'Peek-a-boo', isCorrect: true },
                { content: 'Sorry', isCorrect: false },
              ],
            },
          },
        ],
      },
    },
  });

  const video1_4 = await prisma.video.create({
    data: {
      topicId: topic1.id,
      title: 'Animals Lesson 4 – Farm Animal Fingers',
      url: 'https://www.youtube-nocookie.com/embed/o5kduClgF5Y?controls=1&rel=0&modestbranding=1',
      level: 'EASY',
      unlockCost: 5,
      xpReward: 100,
      orderIndex: 4,
      questions: {
        create: [
          {
            content: 'Which animal says "Oink oink"?',
            answers: {
              create: [
                { content: 'Duck', isCorrect: false },
                { content: 'Pig', isCorrect: true },
                { content: 'Cow', isCorrect: false },
                { content: 'Sheep', isCorrect: false },
              ],
            },
          },
          {
            content: 'Which animal says "Quack quack"?',
            answers: {
              create: [
                { content: 'Pig', isCorrect: false },
                { content: 'Duck', isCorrect: true },
                { content: 'Chicken', isCorrect: false },
                { content: 'Cow', isCorrect: false },
              ],
            },
          },
          {
            content: 'Which animal says "Moo moo"?',
            answers: {
              create: [
                { content: 'Sheep', isCorrect: false },
                { content: 'Cow', isCorrect: true },
                { content: 'Duck', isCorrect: false },
                { content: 'Pig', isCorrect: false },
              ],
            },
          },
          {
            content: 'Which animal says "Baa baa"?',
            answers: {
              create: [
                { content: 'Cow', isCorrect: false },
                { content: 'Sheep', isCorrect: true },
                { content: 'Chicken', isCorrect: false },
                { content: 'Duck', isCorrect: false },
              ],
            },
          },
          {
            content: 'Which animal says "Cock-a-doodle-doo"?',
            answers: {
              create: [
                { content: 'Duck', isCorrect: false },
                { content: 'Pig', isCorrect: false },
                { content: 'Chicken', isCorrect: true },
                { content: 'Cow', isCorrect: false },
              ],
            },
          },
        ],
      },
    },
  });

  const video1_5 = await prisma.video.create({
    data: {
      topicId: topic1.id,
      title: 'Animals Lesson 5',
      url: 'https://www.youtube-nocookie.com/embed/fjmTfEIbUhc?controls=1&rel=0&modestbranding=1',
      level: 'HARD',
      unlockCost: 10,
      xpReward: 200,
      orderIndex: 5,
      questions: {
        create: [
          {
            content: 'Which animal lays eggs?',
            answers: {
              create: [
                { content: 'Cow', isCorrect: false },
                { content: 'Hen', isCorrect: true },
                { content: 'Pig', isCorrect: false },
                { content: 'Horse', isCorrect: false },
              ],
            },
          },
          {
            content: 'Which animal says "moo"?',
            answers: {
              create: [
                { content: 'Pig', isCorrect: false },
                { content: 'Cow', isCorrect: true },
                { content: 'Sheep', isCorrect: false },
                { content: 'Dog', isCorrect: false },
              ],
            },
          },
          {
            content: 'Which animal says "neigh"?',
            answers: {
              create: [
                { content: 'Cow', isCorrect: false },
                { content: 'Horse', isCorrect: true },
                { content: 'Pig', isCorrect: false },
                { content: 'Duck', isCorrect: false },
              ],
            },
          },
          {
            content: 'Which animal says "oink"?',
            answers: {
              create: [
                { content: 'Pig', isCorrect: true },
                { content: 'Sheep', isCorrect: false },
                { content: 'Cow', isCorrect: false },
                { content: 'Cat', isCorrect: false },
              ],
            },
          },
          {
            content: 'Which animal says "meow"?',
            answers: {
              create: [
                { content: 'Dog', isCorrect: false },
                { content: 'Cat', isCorrect: true },
                { content: 'Pig', isCorrect: false },
                { content: 'Duck', isCorrect: false },
              ],
            },
          },
          {
            content: 'Which animal lives in a hen house?',
            answers: {
              create: [
                { content: 'Hen', isCorrect: true },
                { content: 'Cow', isCorrect: false },
                { content: 'Horse', isCorrect: false },
                { content: 'Pig', isCorrect: false },
              ],
            },
          },
          {
            content: 'Which animal says "baa" on the bus?',
            answers: {
              create: [
                { content: 'Goat', isCorrect: false },
                { content: 'Sheep', isCorrect: true },
                { content: 'Cow', isCorrect: false },
                { content: 'Pig', isCorrect: false },
              ],
            },
          },
          {
            content: 'Which animal says "quack"?',
            answers: {
              create: [
                { content: 'Duck', isCorrect: true },
                { content: 'Hen', isCorrect: false },
                { content: 'Cat', isCorrect: false },
                { content: 'Dog', isCorrect: false },
              ],
            },
          },
        ],
      },
    },
  });

  // Topic 2: Colors

  const video2_1 = await prisma.video.create({
    data: {
      topicId: topic2.id,
      title: 'Colors Lesson 1',
      url: 'https://www.youtube-nocookie.com/embed/qhOTU8_1Af4?controls=1&rel=0&modestbranding=1',
      level: 'EASY',
      unlockCost: 0,
      xpReward: 50,
      orderIndex: 6,
    },
  });

  const video2_2 = await prisma.video.create({
    data: {
      topicId: topic2.id,
      title: 'Colors Lesson 2',
      url: 'https://www.youtube-nocookie.com/embed/zxIpA5nF_LY?controls=1&rel=0&modestbranding=1',
      level: 'EASY',
      unlockCost: 0,
      xpReward: 50,
      orderIndex: 7,
    },
  });

  const video2_3 = await prisma.video.create({
    data: {
      topicId: topic2.id,
      title: 'Colors Lesson 3',
      url: 'https://www.youtube-nocookie.com/embed/HrDl_1Ov8gc?controls=1&rel=0&modestbranding=1',
      level: 'MEDIUM',
      unlockCost: 5,
      xpReward: 100,
      orderIndex: 8,
    },
  });

  const video2_4 = await prisma.video.create({
    data: {
      topicId: topic2.id,
      title: 'Colors Lesson 4',
      url: 'https://www.youtube-nocookie.com/embed/4dM1voiBWE4?controls=1&rel=0&modestbranding=1',
      level: 'MEDIUM',
      unlockCost: 5,
      xpReward: 100,
      orderIndex: 9,
    },
  });

  const video2_5 = await prisma.video.create({
    data: {
      topicId: topic2.id,
      title: 'Colors Lesson 5',
      url: 'https://www.youtube-nocookie.com/embed/h_RjSbo67-8?controls=1&rel=0&modestbranding=1',
      level: 'HARD',
      unlockCost: 10,
      xpReward: 200,
      orderIndex: 10,
    },
  });
  // Topic 3: Numbers

  await prisma.video.create({
    data: {
      topicId: topic3.id,
      title: 'Numbers Lesson 1',
      url: 'https://www.youtube-nocookie.com/embed/D0Ajq682yrA?controls=1&rel=0&modestbranding=1',
      level: 'EASY',
      unlockCost: 0,
      xpReward: 50,
      orderIndex: 11,
    },
  });

  await prisma.video.create({
    data: {
      topicId: topic3.id,
      title: 'Numbers Lesson 2',
      url: 'https://www.youtube-nocookie.com/embed/zYtVeYJGRHI?controls=1&rel=0&modestbranding=1',
      level: 'EASY',
      unlockCost: 0,
      xpReward: 50,
      orderIndex: 12,
    },
  });

  await prisma.video.create({
    data: {
      topicId: topic3.id,
      title: 'Numbers Lesson 3',
      url: 'https://www.youtube-nocookie.com/embed/xNw1SSz18Gg?controls=1&rel=0&modestbranding=1',
      level: 'MEDIUM',
      unlockCost: 5,
      xpReward: 100,
      orderIndex: 13,
    },
  });

  await prisma.video.create({
    data: {
      topicId: topic3.id,
      title: 'Numbers Lesson 4',
      url: 'https://www.youtube-nocookie.com/embed/V_lgJgBbqWE?controls=1&rel=0&modestbranding=1',
      level: 'MEDIUM',
      unlockCost: 5,
      xpReward: 100,
      orderIndex: 14,
    },
  });

  await prisma.video.create({
    data: {
      topicId: topic3.id,
      title: 'Numbers Lesson 5',
      url: 'https://www.youtube-nocookie.com/embed/S84fcGdEULk?controls=1&rel=0&modestbranding=1',
      level: 'HARD',
      unlockCost: 10,
      xpReward: 200,
      orderIndex: 15,
    },
  });

  // Topic 4: Fruits

  await prisma.video.create({
    data: {
      topicId: topic4.id,
      title: 'Fruits Lesson 1',
      url: 'https://www.youtube-nocookie.com/embed/mbPNkDEN3Ps?controls=1&rel=0&modestbranding=1',
      level: 'EASY',
      unlockCost: 0,
      xpReward: 50,
      orderIndex: 16,
    },
  });

  await prisma.video.create({
    data: {
      topicId: topic4.id,
      title: 'Fruits Lesson 2',
      url: 'https://www.youtube-nocookie.com/embed/5lotajCFNcc?controls=1&rel=0&modestbranding=1',
      level: 'EASY',
      unlockCost: 0,
      xpReward: 50,
      orderIndex: 17,
    },
  });

  await prisma.video.create({
    data: {
      topicId: topic4.id,
      title: 'Fruits Lesson 3',
      url: 'https://www.youtube-nocookie.com/embed/mfReSbQ7jzE?controls=1&rel=0&modestbranding=1',
      level: 'MEDIUM',
      unlockCost: 5,
      xpReward: 100,
      orderIndex: 18,
    },
  });

  await prisma.video.create({
    data: {
      topicId: topic4.id,
      title: 'Fruits Lesson 4',
      url: 'https://www.youtube-nocookie.com/embed/Kpa-VBq9DB8?controls=1&rel=0&modestbranding=1',
      level: 'MEDIUM',
      unlockCost: 5,
      xpReward: 100,
      orderIndex: 19,
    },
  });

  await prisma.video.create({
    data: {
      topicId: topic4.id,
      title: 'Fruits Lesson 5',
      url: 'https://www.youtube-nocookie.com/embed/EoKIrQ3UDO8?controls=1&rel=0&modestbranding=1',
      level: 'HARD',
      unlockCost: 10,
      xpReward: 200,
      orderIndex: 20,
    },
  });

  // Topic 5: Family (NO QUESTIONS)

  await prisma.video.create({
    data: {
      topicId: topic5.id,
      title: 'Family Lesson 1',
      url: 'https://www.youtube-nocookie.com/embed/n5u3MTxUqlE?controls=1&rel=0&modestbranding=1',
      level: 'EASY',
      unlockCost: 0,
      xpReward: 50,
      orderIndex: 21,
    },
  });

  await prisma.video.create({
    data: {
      topicId: topic5.id,
      title: 'Family Lesson 2',
      url: 'https://www.youtube-nocookie.com/embed/24GWC1dDyUM?controls=1&rel=0&modestbranding=1',
      level: 'EASY',
      unlockCost: 0,
      xpReward: 50,
      orderIndex: 22,
    },
  });

  await prisma.video.create({
    data: {
      topicId: topic5.id,
      title: 'Family Lesson 3',
      url: 'https://www.youtube-nocookie.com/embed/FHaObkHEkHQ?controls=1&rel=0&modestbranding=1',
      level: 'MEDIUM',
      unlockCost: 5,
      xpReward: 100,
      orderIndex: 23,
    },
  });

  await prisma.video.create({
    data: {
      topicId: topic5.id,
      title: 'Family Lesson 4',
      url: 'https://www.youtube-nocookie.com/embed/foptl0BeXnY?controls=1&rel=0&modestbranding=1',
      level: 'MEDIUM',
      unlockCost: 5,
      xpReward: 100,
      orderIndex: 24,
    },
  });

  await prisma.video.create({
    data: {
      topicId: topic5.id,
      title: 'Family Lesson 5',
      url: 'https://www.youtube-nocookie.com/embed/jottQ-B94E0?controls=1&rel=0&modestbranding=1',
      level: 'HARD',
      unlockCost: 10,
      xpReward: 200,
      orderIndex: 25,
    },
  });
  // ====================== 4. INSERT USER ACTIVITY LOGS ======================
  await prisma.userActivityLog.create({
    data: { userId: user1.id, activityDate: today },
  });
  await prisma.userActivityLog.create({
    data: { userId: user2.id, activityDate: today },
  });
  await prisma.userActivityLog.create({
    data: { userId: user3.id, activityDate: today },
  });
  await prisma.userActivityLog.create({
    data: { userId: user4.id, activityDate: today },
  });
  await prisma.userActivityLog.create({
    data: { userId: user5.id, activityDate: today },
  });
  await prisma.userActivityLog.create({
    data: { userId: user6.id, activityDate: today },
  });
  await prisma.userActivityLog.create({
    data: { userId: user7.id, activityDate: today },
  });
  await prisma.userActivityLog.create({
    data: { userId: user8.id, activityDate: today },
  });
  await prisma.userActivityLog.create({
    data: { userId: user9.id, activityDate: today },
  });
  await prisma.userActivityLog.create({
    data: { userId: user10.id, activityDate: today },
  });

  // ====================== 5. INSERT USER WEEKLY STATS ======================
  await prisma.userWeeklyStat.create({
    data: {
      userId: user1.id,
      weekStartDate: weekStart,
      weeklyXp: Math.floor(1200 / 4),
      completedVideosCount: 3,
    },
  });
  await prisma.userWeeklyStat.create({
    data: {
      userId: user2.id,
      weekStartDate: weekStart,
      weeklyXp: Math.floor(850 / 4),
      completedVideosCount: 3,
    },
  });
  await prisma.userWeeklyStat.create({
    data: {
      userId: user3.id,
      weekStartDate: weekStart,
      weeklyXp: Math.floor(2100 / 4),
      completedVideosCount: 3,
    },
  });
  await prisma.userWeeklyStat.create({
    data: {
      userId: user4.id,
      weekStartDate: weekStart,
      weeklyXp: Math.floor(450 / 4),
      completedVideosCount: 3,
    },
  });
  await prisma.userWeeklyStat.create({
    data: {
      userId: user5.id,
      weekStartDate: weekStart,
      weeklyXp: Math.floor(1600 / 4),
      completedVideosCount: 3,
    },
  });
  await prisma.userWeeklyStat.create({
    data: {
      userId: user6.id,
      weekStartDate: weekStart,
      weeklyXp: Math.floor(920 / 4),
      completedVideosCount: 3,
    },
  });
  await prisma.userWeeklyStat.create({
    data: {
      userId: user7.id,
      weekStartDate: weekStart,
      weeklyXp: Math.floor(110 / 4),
      completedVideosCount: 3,
    },
  });
  await prisma.userWeeklyStat.create({
    data: {
      userId: user8.id,
      weekStartDate: weekStart,
      weeklyXp: Math.floor(3000 / 4),
      completedVideosCount: 3,
    },
  });
  await prisma.userWeeklyStat.create({
    data: {
      userId: user9.id,
      weekStartDate: weekStart,
      weeklyXp: Math.floor(540 / 4),
      completedVideosCount: 3,
    },
  });
  await prisma.userWeeklyStat.create({
    data: {
      userId: user10.id,
      weekStartDate: weekStart,
      weeklyXp: Math.floor(780 / 4),
      completedVideosCount: 3,
    },
  });

  // ====================== 6. INSERT USER VIDEO PROGRESS ======================
  await prisma.userVideoProgress.create({
    data: {
      userId: user1.id,
      videoId: video1_1.id,
      isUnlocked: true,
      isCompleted: true,
      completedAt: today,
    },
  });
  await prisma.userVideoProgress.create({
    data: {
      userId: user2.id,
      videoId: video1_2.id,
      isUnlocked: true,
      isCompleted: true,
      completedAt: today,
    },
  });
  await prisma.userVideoProgress.create({
    data: {
      userId: user3.id,
      videoId: video1_3.id,
      isUnlocked: true,
      isCompleted: true,
      completedAt: today,
    },
  });
  await prisma.userVideoProgress.create({
    data: {
      userId: user4.id,
      videoId: video1_4.id,
      isUnlocked: true,
      isCompleted: true,
      completedAt: today,
    },
  });
  await prisma.userVideoProgress.create({
    data: {
      userId: user5.id,
      videoId: video1_5.id,
      isUnlocked: true,
      isCompleted: true,
      completedAt: today,
    },
  });
  await prisma.userVideoProgress.create({
    data: {
      userId: user6.id,
      videoId: video2_1.id,
      isUnlocked: true,
      isCompleted: true,
      completedAt: today,
    },
  });
  await prisma.userVideoProgress.create({
    data: {
      userId: user7.id,
      videoId: video2_2.id,
      isUnlocked: true,
      isCompleted: true,
      completedAt: today,
    },
  });
  await prisma.userVideoProgress.create({
    data: {
      userId: user8.id,
      videoId: video2_3.id,
      isUnlocked: true,
      isCompleted: true,
      completedAt: today,
    },
  });
  await prisma.userVideoProgress.create({
    data: {
      userId: user9.id,
      videoId: video2_4.id,
      isUnlocked: true,
      isCompleted: true,
      completedAt: today,
    },
  });
  await prisma.userVideoProgress.create({
    data: {
      userId: user10.id,
      videoId: video2_5.id,
      isUnlocked: true,
      isCompleted: true,
      completedAt: today,
    },
  });

  // ====================== 7. INSERT USER QUIZ ATTEMPTS ======================
  await prisma.userQuizAttempt.create({
    data: {
      userId: user1.id,
      videoId: video1_1.id,
      attemptDate: today,
      timesPlayed: 1,
      dailyStarsEarned: 5,
    },
  });
  await prisma.userQuizAttempt.create({
    data: {
      userId: user2.id,
      videoId: video1_2.id,
      attemptDate: today,
      timesPlayed: 1,
      dailyStarsEarned: 5,
    },
  });
  await prisma.userQuizAttempt.create({
    data: {
      userId: user3.id,
      videoId: video1_3.id,
      attemptDate: today,
      timesPlayed: 1,
      dailyStarsEarned: 5,
    },
  });
  await prisma.userQuizAttempt.create({
    data: {
      userId: user4.id,
      videoId: video1_4.id,
      attemptDate: today,
      timesPlayed: 1,
      dailyStarsEarned: 5,
    },
  });
  await prisma.userQuizAttempt.create({
    data: {
      userId: user5.id,
      videoId: video1_5.id,
      attemptDate: today,
      timesPlayed: 1,
      dailyStarsEarned: 5,
    },
  });
  await prisma.userQuizAttempt.create({
    data: {
      userId: user6.id,
      videoId: video2_1.id,
      attemptDate: today,
      timesPlayed: 1,
      dailyStarsEarned: 5,
    },
  });
  await prisma.userQuizAttempt.create({
    data: {
      userId: user7.id,
      videoId: video2_2.id,
      attemptDate: today,
      timesPlayed: 1,
      dailyStarsEarned: 5,
    },
  });
  await prisma.userQuizAttempt.create({
    data: {
      userId: user8.id,
      videoId: video2_3.id,
      attemptDate: today,
      timesPlayed: 1,
      dailyStarsEarned: 5,
    },
  });
  await prisma.userQuizAttempt.create({
    data: {
      userId: user9.id,
      videoId: video2_4.id,
      attemptDate: today,
      timesPlayed: 1,
      dailyStarsEarned: 5,
    },
  });
  await prisma.userQuizAttempt.create({
    data: {
      userId: user10.id,
      videoId: video2_5.id,
      attemptDate: today,
      timesPlayed: 1,
      dailyStarsEarned: 5,
    },
  });

  // ====================== 8. INSERT MISSIONS ======================
  const mission1 = await prisma.mission.create({
    data: {
      code: 'D1',
      name: 'Daily Login',
      description: 'Log in today',
      type: 'DAILY',
      rewardXp: 10,
    },
  });
  const mission2 = await prisma.mission.create({
    data: {
      code: 'D2',
      name: 'Watch 1',
      description: 'Watch one video',
      type: 'DAILY',
      rewardXp: 20,
    },
  });
  const mission3 = await prisma.mission.create({
    data: {
      code: 'D3',
      name: 'New Video',
      description: 'Complete a new lesson',
      type: 'DAILY',
      rewardXp: 50,
    },
  });
  const mission4 = await prisma.mission.create({
    data: {
      code: 'D4',
      name: 'Star Earner',
      description: 'Get 10 stars',
      type: 'DAILY',
      rewardXp: 100,
    },
  });
  const mission5 = await prisma.mission.create({
    data: {
      code: 'D5',
      name: 'Quiz King',
      description: 'Perfect Quiz score',
      type: 'DAILY',
      rewardXp: 150,
    },
  });
  const mission6 = await prisma.mission.create({
    data: {
      code: 'D6',
      name: 'Fast Learner',
      description: 'Finish video in 5 min',
      type: 'DAILY',
      rewardXp: 30,
    },
  });
  const mission7 = await prisma.mission.create({
    data: {
      code: 'D7',
      name: 'Avatar',
      description: 'Change your avatar',
      type: 'DAILY',
      rewardXp: 20,
    },
  });
  const mission8 = await prisma.mission.create({
    data: {
      code: 'D8',
      name: 'Explorer',
      description: 'Open a medium video',
      type: 'DAILY',
      rewardXp: 40,
    },
  });
  const mission9 = await prisma.mission.create({
    data: {
      code: 'W1',
      name: 'Top 10',
      description: 'Be in Top 10',
      type: 'WEEKLY',
      rewardXp: 300,
      rewardStars: 10,
    },
  });
  const mission10 = await prisma.mission.create({
    data: {
      code: 'W2',
      name: 'Top 3',
      description: 'Be in Top 3',
      type: 'WEEKLY',
      rewardXp: 500,
      rewardStars: 30,
    },
  });

  // ====================== 9. INSERT USER MISSION PROGRESS ======================
  await prisma.userMissionProgress.create({
    data: {
      userId: user1.id,
      missionId: mission1.id,
      currentCount: 1,
      isClaimed: false,
      resetDate: today,
    },
  });
  await prisma.userMissionProgress.create({
    data: {
      userId: user2.id,
      missionId: mission2.id,
      currentCount: 1,
      isClaimed: false,
      resetDate: today,
    },
  });
  await prisma.userMissionProgress.create({
    data: {
      userId: user3.id,
      missionId: mission3.id,
      currentCount: 1,
      isClaimed: false,
      resetDate: today,
    },
  });
  await prisma.userMissionProgress.create({
    data: {
      userId: user4.id,
      missionId: mission4.id,
      currentCount: 1,
      isClaimed: false,
      resetDate: today,
    },
  });
  await prisma.userMissionProgress.create({
    data: {
      userId: user5.id,
      missionId: mission5.id,
      currentCount: 1,
      isClaimed: false,
      resetDate: today,
    },
  });
  await prisma.userMissionProgress.create({
    data: {
      userId: user6.id,
      missionId: mission6.id,
      currentCount: 1,
      isClaimed: false,
      resetDate: today,
    },
  });
  await prisma.userMissionProgress.create({
    data: {
      userId: user7.id,
      missionId: mission7.id,
      currentCount: 1,
      isClaimed: false,
      resetDate: today,
    },
  });
  await prisma.userMissionProgress.create({
    data: {
      userId: user8.id,
      missionId: mission8.id,
      currentCount: 1,
      isClaimed: false,
      resetDate: today,
    },
  });
  await prisma.userMissionProgress.create({
    data: {
      userId: user9.id,
      missionId: mission9.id,
      currentCount: 1,
      isClaimed: false,
      resetDate: today,
    },
  });
  await prisma.userMissionProgress.create({
    data: {
      userId: user10.id,
      missionId: mission10.id,
      currentCount: 1,
      isClaimed: false,
      resetDate: today,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
