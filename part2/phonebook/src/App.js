import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import phonebookService from './services/phonebook'
import { useState, useEffect } from 'react'
import Notification from './components/Notification'
// import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [personsFiltered, setPersonsFiltered] = useState([])
  const [message, setMessage] = useState(null)
  const [msgColor, setMsgColor] = useState('green')

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialInfo => {
        setPersons(initialInfo)
        setPersonsFiltered(initialInfo)
      })
  }, [])

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id)
    const confirmDelete = window.confirm(`Delete ${person.name}?`)
    if(confirmDelete){
      phonebookService
      .deleteResource(person.id)
      .then(() => {
        const tmp = persons.filter((person) => person.id !== id)
        setPersons(tmp)
        setPersonsFiltered(tmp)
      })
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} msgColor={msgColor}/>
      <Filter persons={persons} setPersonsFiltered={setPersonsFiltered}/>
      <h3>add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} setPersonsFiltered={setPersonsFiltered} setMessage={setMessage} setMsgColor={setMsgColor}/>
      <h3>Numbers</h3>
      <Persons persons={personsFiltered} deletePerson={deletePerson}/>
    </div>
  )
}

export default App