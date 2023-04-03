import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personsService from './services/persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filterWord, setFilterWord] = useState("")
  const [successMessage, setSuccessMessage] = useState(null)
  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const toggleImportanceOf = id => {
    const personToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
        personsService
            .deletePerson(id)
            .then(returnedPerson => {
                setPersons(persons.filter(person => person.id !== id))
            })            
    }
  }   

  return (
    <div>
      
      <h2>Phonebook</h2>

      <Notification message={successMessage} />

      <Filter filterWord={filterWord} setFilterWord={setFilterWord} />

      <h2>add a new</h2>

      <PersonForm persons={persons} setPersons={setPersons} setSuccessMessage={setSuccessMessage}/>

      <h2>Numbers</h2>

      <Persons persons={persons} filterWord={filterWord} toggleImportanceOf={toggleImportanceOf} />
    </div>
  )
}

export default App