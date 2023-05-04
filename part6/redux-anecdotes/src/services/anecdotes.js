import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  console.log(object)
  const response = await axios.post(baseUrl, object)
  return response.data
}

const update = async (id, updateObject) => {
  console.log(updateObject)
  const response = await axios.put(`${baseUrl}/${id}`, updateObject)
  return response.data
}

const services = {
  getAll,
  createNew,
  update
}

export default services