import { generateUsers } from "./users.js";
// import { generateWorkouts } from "./workouts.js";

export const generateReviews = (workout, quantity = 10) => {
  let reviews = [];
  for (let i = 0; i < quantity; i++) {
    const overall = 5 - Math.floor(Math.pow(Math.random(), 2) * 5);
    let comment;
    switch (overall) {
      case 1:
        comment = `This workout was way too ${
          Math.random() < 0.5 ? "hard" : Math.random() < 0.5 ? "easy" : "long"
        } and I injured ${
          Math.random() < 0.5
            ? "a hamstring"
            : Math.random() < 0.5
            ? "my back"
            : "my neck"
        }. Worst workout ever`;
        break;
      case 2:
        comment =
          "I didn't like this workout very much. At least I didn't have to do it in person.";
        break;
      case 3:
        comment = `This workout was okay but I don't like ${
          Math.random() < 0.25
            ? "deadlifts"
            : Math.random() < 0.25
            ? "cardio"
            : Math.random() < 0.25
            ? "swimming"
            : "squats"
        }.`;
        break;
      case 4:
        comment = `Great workout. Maybe it could have been ${
          Math.random() < 0.25
            ? "longer"
            : Math.random() < 0.25
            ? "harder"
            : Math.random() < 0.25
            ? "shorter"
            : "more fast-paced"
        }.`;
        break;
      case 5:
        comment = `This was ${
          Math.random() < 0.25
            ? "the perfect"
            : Math.random() < 0.25
            ? "the ultimate"
            : Math.random() < 0.25
            ? "a superb"
            : "my favorite"
        } workout. My favorite exercise was ${
          Math.random() < 0.25
            ? "Turkish get-ups"
            : Math.random() < 0.25
            ? "dips"
            : Math.random() < 0.25
            ? "cable rows"
            : "pistol squats"
        }.`;
        break;
      default:
        comment = null;
    }
    const newReview = {
      author: generateUsers(1, i)[0],
      workout: workout?._id,
      overall,
      comment,
      reviews: workout?.exercises.map((exercise) => {
        const isLike = Math.random() < 0.8;
        return {
          exercise: exercise._id,
          isLike,
          comment: isLike
            ? "I liked this exercise"
            : "I didn't like this exercise",
        };
      }),
    };
    reviews.push(newReview);
  }
  return reviews;
};
