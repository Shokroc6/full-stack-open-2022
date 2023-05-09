import { DiaryEntry } from "./types"

import { useEffect, useState } from "react";
import { getAllDiaries } from "./diariayServices";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, [])
  
  return (
    <div>
      <h1>Diary entries</h1>
      <ul>
        {diaries.map(diaray =>
          <li key={diaray.id}>
            <h3>{diaray.date}</h3>
            <br/>

          </li>
        )}
      </ul>
    </div>
  )
}

export default App;