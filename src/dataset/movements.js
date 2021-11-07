export const movementTitles = [
  "barbell squat",
  "bench press",
  "hip thrust",
  "dips",
  "crunches",
  "dumbbell curl",
  "leg raise",
  "lunges",
  "pullups",
  "chinups",
  "military press",
  "leg extension machine",
  "jump squats",
  "box jumps",
  "pushups",
  "triangle pushups",
  "dumbbell triceps extension",
  "cable triceps extension",
  "preacher curls",
  "burpees",
  "turkish getups",
  "leg curl machine",
  "cable rows",
];

export const generateMovements = () => {
  let i = 1;
  let j = 101;
  let url = 'https://picsum.photos/400?random=';
  return [
    {
      _id: j++,
      title: "Barbell Squat",
      description: "A classic compound barbell lift for the posterior chain, legs, and back.",
      image: `${url}${i++}`,
      instructions: [
        { 
          text: "Grasp the barbell.",
          image: `${url}${i++}`,
        },
        { 
          text: "Lift the barbell.",
          image: `${url}${i++}`,
        },
        { 
          text: "Lower the barbell to the ground.",
          image: `${url}${i++}`,
        },
      ],
      reps: {
        min: 1,
        max: 12,
        recommended: 5,
      },
      sets: {
        min: 1,
        max: 5,
        recommended: 5,
      },
      regions: ['legs', 'back'],
    },
    {
      _id: j++,
      title: "Bench Press",
      description: "A classic barbell lift for the chest.",
      image: `${url}${i++}`,
      instructions: [
        { 
          text: "Grasp the barbell.",
          image: `${url}${i++}`,
        },
        { 
          text: "Push the barbell.",
          image: `${url}${i++}`,
        },
        { 
          text: "Lower the barbell back to the bench.",
          image: `${url}${i++}`,
        },
      ],
      reps: {
        min: 1,
        max: 12,
        recommended: 5,
      },
      sets: {
        min: 1,
        max: 5,
        recommended: 5,
      },
      regions: ['chest', ],
    },
    {
      _id: j++,
      title: "Dumbell Curls",
      description: "A classic dumbbell lift for the biceps.",
      image: `${url}${i++}`,
      instructions: [
        { 
          text: "Grasp the dumbbells.",
          image: `${url}${i++}`,
        },
        { 
          text: "Lift the dumbbells.",
          image: `${url}${i++}`,
        },
        { 
          text: "Lower the dumbbells back to the starting position.",
          image: `${url}${i++}`,
        },
      ],
      reps: {
        min: 1,
        max: 12,
        recommended: 5,
      },
      sets: {
        min: 1,
        max: 5,
        recommended: 5,
      },
      regions: ['bicep', ],
    },
    {
      title: "Leg Curl Machine",
      _id: j++,
      description: "A hamstring machine exercise.",
      image: `${url}${i++}`,
      instructions: [
        { 
          text: "Sit in the leg curl machine.",
          image: `${url}${i++}`,
        },
        { 
          text: "Curl the leg.",
          image: `${url}${i++}`,
        },
        { 
          text: "Extend the leg back to the starting position.",
          image: `${url}${i++}`,
        },
      ],
      reps: {
        min: 1,
        max: 12,
        recommended: 5,
      },
      sets: {
        min: 1,
        max: 5,
        recommended: 5,
      },
      regions: ['legs', ],
    },
    {
      title: "Dips",
      _id: j++,
      description: "A bodyweight triceps exercise.",
      image: `${url}${i++}`,
      instructions: [
        { 
          text: "Grasp the dip bars and raise the body.",
          image: `${url}${i++}`,
        },
        { 
          text: "Lower the body.",
          image: `${url}${i++}`,
        },
        { 
          text: "Extend the arms to raise the body back to the starting position.",
          image: `${url}${i++}`,
        },
      ],
      reps: {
        min: 1,
        max: 12,
        recommended: 5,
      },
      sets: {
        min: 1,
        max: 5,
        recommended: 5,
      },
      regions: ['arms', ],
    },
    {
      title: "Cable Rows",
      _id: j++,
      description: "A machine chest exercise.",
      image: `${url}${i++}`,
      instructions: [
        { 
          text: "Extend the arms and grasp the cable handles.",
          image: `${url}${i++}`,
        },
        { 
          text: "Lower cable handles with the arms.",
          image: `${url}${i++}`,
        },
        { 
          text: "Extend the arms to return the cable handles to the starting position.",
          image: `${url}${i++}`,
        },
      ],
      reps: {
        min: 1,
        max: 12,
        recommended: 5,
      },
      sets: {
        min: 1,
        max: 5,
        recommended: 5,
      },
      regions: ['chest', 'biceps' ],
    },
  ];
}
