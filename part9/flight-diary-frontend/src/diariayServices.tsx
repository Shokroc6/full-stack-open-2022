import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from "./types";

export const getAllDiaries = async () => {
  try {
    const response = await axios
      .get<DiaryEntry[]>('http://localhost:3000/api/diaries');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.status)
      console.error(error.response);
      // Do something with this error...
    } else {
      console.error(error);
    }
  }
};

export const createDiary = async (object: NewDiaryEntry) => {
  try {
    const response = await axios
      .post<DiaryEntry>('http://localhost:3000/api/diaries', object)
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.status)
      console.error(error.response);
      throw error;
      // Do something with this error...
    } else {
      console.error(error);
    }
  }
};