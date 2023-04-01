import { useState } from 'react'

const Anecdote = ({ title, text, votes }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{text}</p>
      <p>has {votes} votes</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const setToSelected = () => () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const setToVote = () => () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const Button = ({onClick, text}) => (
    <button onClick={onClick}> {text} </button>
  )

  const maxOfVotes = () => votes.indexOf(Math.max(...votes))

  return (
    <div>
      <Anecdote title="Anecdote of the day" text={anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={setToVote()} text="vote" />
      <Button onClick={setToSelected()} text="next anecdote" />
      <Anecdote title="Anecdote with most votes" text={anecdotes[maxOfVotes()]} votes={votes[maxOfVotes()]} />
    </div>
  )
}

export default App