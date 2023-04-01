import { useState } from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <td>
      {text} {value}
    </td>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return <div>NO feedback given</div>;
  }
  return (
    <div>
      <table>
        <tr>
          <StatisticLine text="good" value={good} />
        </tr>
        <tr>
          <StatisticLine text="neutral" value={neutral} />
        </tr>
        <tr>
          <StatisticLine text="bad" value={bad} />
        </tr>
        <tr>
          <StatisticLine text="all" value={good + neutral + bad} />
        </tr>
        <tr>
          <Average good={good} neutral={neutral} bad={bad} />
        </tr>
        <tr>
          <Positive good={good} neutral={neutral} bad={bad} />
        </tr>
      </table>
    </div>
  );
};

const Average = ({ good, neutral, bad }) => {
  return <td>average {(good * 1 + bad * -1) / (good + neutral + bad)} </td>;
};

const Positive = ({ good, neutral, bad }) => {
  return <td>positive {(good / (good + neutral + bad)) * 100} % </td>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setToGood = (newValue) => () => {
    setGood(newValue);
  };

  const setToNeutral = (newValue) => () => {
    setNeutral(newValue);
  };

  const setToBad = (newValue) => () => {
    setBad(newValue);
  };

  const Button = ({ onClick, text }) => (
    <button onClick={onClick}>{text}</button>
  );

  return (
    <div>
      <h1>give feddback</h1>
      <Button onClick={setToGood(good + 1)} text="good" />
      <Button onClick={setToNeutral(neutral + 1)} text="neutral" />
      <Button onClick={setToBad(bad + 1)} text="bad" />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
