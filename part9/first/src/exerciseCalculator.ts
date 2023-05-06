interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (days: number[], target: number): Result => {
  const periodLength: number = days.length;
  const trainingDays: number = days.filter((day) => day !== 0).length;
  const average: number = days.reduce((a, sum) => a + sum, 0) / periodLength;
  let rating: number;
  let ratingDescription: string;
  if (average > target * 1.2) {
    rating = 3;
    ratingDescription = "very good!";
  } else if (average < target * 0.8) {
    rating = 1;
    ratingDescription = "you could better";
  } else {
    rating = 2;
    ratingDescription = "good";
  }

  const result: Result = {
    periodLength,
    trainingDays,
    success: average > target,
    rating,
    ratingDescription,
    target,
    average,
  };

  return result;
};

interface MultiplyValues {
  array1: number[];
  value2: number;
}

const parseArguments = (args: string[]): MultiplyValues => {
  if (args.length < 3) throw new Error("Not enough arguments");

  const array1: number[] = [];
  let value2: number;
  if (!isNaN(Number(args[2]))) {
    value2 = Number(args[2]);
  } else {
    throw new Error("Provided values were not numbers!");
  }
  for (let i = 3; i < args.length; ++i) {
    if (!isNaN(Number(args[i]))) {
      array1.push(Number(args[i]));
    } else {
      throw new Error("Provided values were not numbers!");
    }
  }
  return { array1, value2 };
};

try {
  const { array1, value2 } = parseArguments(process.argv);
  console.log(calculateExercises(array1, value2));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
