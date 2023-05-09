import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from "./types";

export const getAllDiaries = () => {
  return axios
    .get<DiaryEntry[]>('https://jo70id-3000.csb.app/api/diaries')
    .then(response => response.data)
}

export const createDiary = (object: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>('https://jo70id-3000.csb.app/api/diaries', object)
    .then((response: any) => response.data)
}