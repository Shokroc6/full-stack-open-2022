import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);
  
  if (!weight || !height) {
    return res.status(400).json({ error: 'Missing weight or height query parameter' });
  }

  const bmi = calculateBmi(weight, height);
  return res.json({weight, height, bmi});
});

app.post("/exercises", (req, res) => {
  console.log(req.body);
  
  console.log(req.body.daily_exercises, req.body.target);
  
  if (!Array.isArray(req.body.daily_exercises) || !req.body.target) {
    return res.status(400).json({ error: 'parameters missing' });
  }
  if (isNaN(Number(req.body.target))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
  const target = Number(req.body.target);

  const daily_exercises = req.body.daily_exercises.map(Number);

  if (!daily_exercises.every(Number.isFinite)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(daily_exercises, target);

  return res.json(result);
});


const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
