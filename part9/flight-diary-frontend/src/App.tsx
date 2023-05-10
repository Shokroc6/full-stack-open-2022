import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from "./types"

import { useEffect, useState } from "react";
import { createDiary, getAllDiaries } from "./diariayServices";
import axios from 'axios';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [newData, setNewData] = useState<string>('');
  const [newVisibility, setNewVisibility] = useState<Visibility>(Visibility.Great);
  const [newWeather, setNewWeather] = useState<Weather>(Weather.Sunny);
  const [newComment, setNewComment] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data as DiaryEntry[])
    })
  }, [])
  
  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const newDiary: NewDiaryEntry = {
      date: newData,
      weather: newWeather,
      visibility: newVisibility,
      comment: newComment
    }
    try {
      const newDiaryObject: DiaryEntry = await createDiary(newDiary) as DiaryEntry;
      setDiaries(diaries.concat(newDiaryObject));
    } catch(error) {
      if (axios.isAxiosError(error)) {
        console.log(error.status)
        console.error(error.response);
        setMessage(error.toString());
      } else {
        console.error(error);
      }
    }
   
    setNewData('');
    setNewVisibility(Visibility.Great);
    setNewWeather(Weather.Sunny);
    setNewComment('');
  };

  return (
    <div>
      <h1>Creat Diary</h1>
      <div>{message}</div>
      <form onSubmit={diaryCreation}>
        <div>data: <input
          type="date"
          value={newData}
          onChange={(event) => setNewData(event.target.value)}
        /></div>
        <div>weather: 
          <input type="radio" name="weather"
            onChange={() => setNewWeather(Weather.Sunny)} />
          sunny   
          <input type="radio" name="weather"
            onChange={() => setNewWeather(Weather.Rainy)} />
          rainy 
          <input type="radio" name="weather"
            onChange={() => setNewWeather(Weather.Cloudy)} />
          cloudy
          <input type="radio" name="weather"
            onChange={() => setNewWeather(Weather.Stormy)} />
          stormy
          <input type="radio" name="weather"
            onChange={() => setNewWeather(Weather.Windy)} />
          windy
        </div>
        <div>visibility: 
        <input type="radio" name="visibilty"
            onChange={() => setNewVisibility(Visibility.Great)} />
          great   
          <input type="radio" name="visibilty"
            onChange={() => setNewVisibility(Visibility.Good)} />
          good 
          <input type="radio" name="visibilty"
            onChange={() => setNewVisibility(Visibility.Ok)} />
          ok
          <input type="radio" name="visibilty"
            onChange={() => setNewVisibility(Visibility.Poor)} />
          poor
        </div>
        <div>comment: <input
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
        /></div>
        <button type='submit'>add</button>
      </form>

      <h1>Diary entries</h1>
      <ul>
        {diaries.map(diaray =>
          <li key={diaray.id}>
            <h3>{diaray.date}</h3>
            <br/>
            <p>visibility: {diaray.visibility}</p>
            <p>weather: {diaray.weather}</p>
          </li>
        )}
      </ul>
    </div>
  )
}

export default App;