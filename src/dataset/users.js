import { regions } from "./regions";
import { movementTitles } from "./movements";
import { selectRandom, selectRandomUnique } from "./helperMethods";

export const generateUsers = (quantity, imgIndex = 0) => {
  let users = [];
  const firstNames = [
    "Jessica",
    "David",
    "Eusebia",
    "Parthenon",
    "Xerxes",
    "Bob",
    "Jan",
    "Kimmy",
    "Dalton",
    "Sally",
    "Alexander",
    "Isabella",
    "Alan",
    "Joe",
  ];
  const lastNames = [
    "Woolf",
    "Huxley",
    "Franzen",
    "Foster-Wallace",
    "Rice",
    "Hatakayama",
    "McQueen",
    "Rogan",
    "Winfrey",
    "Turing",
    "Snyder",
  ];
  const getRecentDate = () => {
    const today = new Date();
    return new Date(
      today.getUTCFullYear(),
      today.getMonth(),
      today.getDay() + Math.floor(Math.random() * 6) - 3,
      Math.floor(Math.random() * 24),
      Math.floor(Math.random() * 60)
    );
  };
  const favoriteExercises = selectRandomUnique(
    movementTitles,
    Math.floor(Math.random() * 5)
  );
  const bannedExercises = selectRandomUnique(
    movementTitles,
    Math.floor(Math.random() * 5),
    favoriteExercises
  );
  for (let i = 0; i < quantity; i++) {
    const firstName = selectRandom(firstNames);
    const lastName = selectRandom(lastNames);
    let newUser = {
      _id: (100 + i).toString(),
      firstName,
      lastName,
      name: firstName + " " + lastName,
      email: firstName.toLowerCase() + lastName.toLowerCase() + "@gmail.com",
      password: "test1234",
      image: `https://picsum.photos/200?random=${i + 1 + imgIndex}`,
      soreness: () => {
        return regions.map((item) => {
          return {
            region: item,
            date: getRecentDate(),
            isAcute: Math.floor(Math.random() < 0.5),
          };
        });
      },
      favoriteExercises: favoriteExercises,
      bannedExercises: bannedExercises,
      microcurrency: Math.floor(Math.random() * 100000),
    };
    users.push(newUser);
  }
  return users;
};
