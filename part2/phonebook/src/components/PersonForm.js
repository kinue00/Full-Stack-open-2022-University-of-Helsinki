import { useState } from 'react'
import phonebookService from '../services/phonebook'


const PersonForm = ({persons, setPersons, setPersonsFiltered, setMessage, setMsgColor}) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const addName = (event) => {
      console.log(persons)
        event.preventDefault()
        const nameObject = {
          name: newName,
          number: newNumber
        }
        const names = persons.map((person) => person.name)       
        if(names.includes(newName)){
          // alert(`${newName} is already added to phonebook`)
          const confirmUpdate = 
            window.confirm(`${newName} is already added to phonebook, replace the old number with a new one ?`)
          if(confirmUpdate){
            console.log('confirm update')
            const person = persons.find((p) => p.name === newName)
            phonebookService
              .update(person.id ,nameObject)  
              .then(returnedPerson => {
                setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
                setPersonsFiltered(persons.map(p => p.id !== person.id ? p : returnedPerson))
              })
              .catch(error => {
                setMessage(
                  `information of '${person.name}' has already been removed from server`
                )
                setMsgColor('red')
                setTimeout(() => {
                  setMessage(null)
                  setMsgColor('green')
                }, 5000)})
            setMessage(
                `'${person.name}''s number has been changed'`
              )
              setTimeout(() => {
                setMessage(null)
              }, 5000)
          }
        }else{
          const updatedPersons = persons.concat(nameObject)
          phonebookService
            .create(nameObject)
            .then(returnedPerson => {
              setPersons(updatedPersons) 
              setPersonsFiltered(updatedPersons)
            })
        }  
        setNewName('')
        setNewNumber('')   
        setMessage(
          `'${newName}'has been added'`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
    }

    return(
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm