import express from "express";
import DiagnosisRoute from "./routes/diagnoses";
import PatientRoute from "./routes/patients";
import cors from "cors";
const app = express();
app.use(express.static("build"));
app.use(cors());
app.use(express.json());

app.use("/api/diagnoses", DiagnosisRoute);
app.use("/api/patients", PatientRoute);

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
