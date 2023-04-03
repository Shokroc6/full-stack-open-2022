import { useState } from 'react'
import personsService from '../services/persons'

const PersonForm = ({persons, setPersons, setSuccessMessage}) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    
    const addPerson = (event) => {
      event.preventDefault()
      if(persons.map((value)=>value.name).includes(newName)) {
        alert(`${newName} is already added to phonebook`)
      }
      else {
        const newPerson = {name: newName, number: newNumber}
        personsService
          .create(newPerson)
          .then(returnPerson => {
            setPersons(persons.concat(returnPerson))
            setSuccessMessage(`Added ${newName}`) 
            setNewName("") 
            setNewNumber("") 
          })
      }
    }
    const handleNameChange = (event) => {
      console.log(event.target.value)
      setNewName(event.target.value)
      console.log(newName)
    }

    const handleNumberChange = (event) => {
      console.log(event.target.value)
      setNewNumber(event.target.value)
    }

    return (
        <form onSubmit={addPerson}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>number:          
           <input 
              value={newNumber}
              onChange={handleNumberChange}
            />
        </div>
        <div>
          <button type="submit">add</button>
        </div>

      </form>
    )
}

export default PersonForm