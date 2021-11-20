import moment from "moment";

export const getSets = (goals) => {
  let sets;
  if (Array.isArray(goals)) {
    sets = [].concat.apply(
      [],
      goals.map((goals) => goals.sets)
    );
  } else {
    sets = goals?.sets;
  }
  if (sets) {
    return (
      sets.slice().sort((firstAttempt, secondAttempt) => {
        return moment(firstAttempt?.attempted).isBefore(
          moment(secondAttempt?.attempted)
        )
          ? -1
          : 1;
      }) || []
    );
  } else {
    return [];
  }
};

export const getDates = (sets) => {
  return sets?.map((set) => {
    return set?.attempted;
  });
};

export const separateSets = (sets) => {
  const firstSetsIndices = [];
  sets.forEach((set, i) => {
    if (set.set === 1 && i !== 0) {
      firstSetsIndices.push(i);
    }
  });
  const separatedSets = [...sets];
  firstSetsIndices.forEach((index, j) => {
    separatedSets.splice(index + j, 0, {
      attempted: moment(sets[index + j - 1].attempted).add(1, "minute"),
      resistance: undefined,
      message: "this is from the splice",
    });
  });
  return separatedSets;
}

export const getLabels = (goals, isSmDown = false) => {
  let sets = getSets(goals);
  if (!Array.isArray(goals)) {
    sets = separateSets(sets);
  }
  const dates = getDates(sets);

  const labels = [...dates].map((attempted, i) => {
    let formatString = "MM/DD/YY h a";
    if (i >= 1 && moment(attempted).isSame(moment(dates[i - 1]), "hour")) {
      formatString = " ";
    } else if (
      i >= 1 &&
      moment(attempted).isSame(moment(dates[i - 1]), "day")
    ) {
      formatString = "h:mm a";
    } else if (
      moment(attempted).isSame(moment(dates[i - 1]), "year")
    ) {
      formatString = "MM/DD h a";
    } else {
      formatString = "MM/DD/YY h a";
    }
    if (isSmDown && formatString !== " ") {
      formatString = formatString.split(" ")[0];
    }
    return moment(attempted).format(formatString)
  });

  return labels;
};

export const sortGoals = (goals) => {
  if (Array.isArray(goals)) {
    return goals
      .sort((a, b) => {
        return moment(a.createdAt).isBefore(moment(b.createdAt));
      })
      .filter((goal) => {
        return goal?.sets?.length > 0;
      });
  } else {
    return goals;
  }
};

export const getDataset = (goal, color, goals) => {

  // THIS METHOD TAKES ARGUMENTS GOAL, GOALS, AND COLOR AND RETURNS A DATASET
  
  // console.log(`getDataset called for goal ${goal.title}`);

  // GET DATES FOR X AXIS FROM GOALS (ALL GOALS DISPLAYED - MAY BE JUST ONE OR MULTIPLE)
  let dates;
  if (goals) {
    const sets = getSets(goals);
    // console.log(`goal ${goal.title} sets.length: ${sets.length}`);
    dates = getDates(sets);
  } else {
    dates = getDates(getSets(goal));
  }
  // console.log('dates.length: ', dates.length);

  // GET RESISTANCES FOR Y AXIS FROM GOAL (JUST THE ONE PARTICULAR GOAL BEING MAPPED RIGHT NOW)
  const data = dates
    // FOR EACH DATE...
    .map((date) => {
      // IF THE GOAL'S MOVEMENT IS ATTEMPTED AT THIS MOMENT...
      const setsAtThisMoment = goal.sets.filter((set) => {
        if (set.attempted === date) {
          return true;
        } else {
          return false;
        }
      })
      .sort((firstAttempt, secondAttempt) => {
        return moment(firstAttempt.attempted).isBefore(moment(secondAttempt.attempted)) ? -1 : 1;
      });
      // console.log(`${goal.title} attempts:`);
      // console.dir(setsAtThisMoment);
      if (setsAtThisMoment.length > 0) {
        return setsAtThisMoment;
      } else {
        return date;
      }
    })
    .flat();

  // console.log(`data for goal ${goal.title}:`);
  // console.dir(data);

  let sortedData;

  const labels = getLabels(goals);

  if (goals) {
    sortedData = data.slice().sort((firstAttempt, secondAttempt) => {
      return firstAttempt.set - secondAttempt.set;
    });
  } else {
    // console.log("data: ", data);
    // const set1Indices = [];
    // data.forEach((attempt, i) => {
    //   if (attempt.set === 1 && i !== 0) {
    //     set1Indices.push(i);
    //   }
    //   console.log("set1Indices: ", set1Indices);
    // });
    // set1Indices.forEach((index, i) => {
    //   data.splice(index + i, 0, {
    //     resistance: undefined,
    //     message: "this is from the splice",
    //   });
    //   labels.splice(index + i, 0, undefined);
    // });
    // console.log("set-separated data: ", data);
    sortedData = separateSets(data);
  }

  // console.log('data: ');
  // console.dir(data);
  // console.log('mapped data: ');
  // console.dir(data.map((datum) => {
  //   return {...datum, EDBmovement: datum?.EDBmovement?.name}
  // }));

  return {
      data: data.map((set) => {
        return set?.resistance;
      }),
      label: goal.title,
      borderColor: color,
      fill: true,
    };
  
};
