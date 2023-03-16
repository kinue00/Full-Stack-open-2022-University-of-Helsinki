import { useState } from "react"

const Filter = ({persons, setPersonsFiltered}) => {
    const [newFilter, setNewFilter] = useState('')
    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }
    const filterPerson = (event) => {
        event.preventDefault()
        const tmp = persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()))
        setPersonsFiltered(tmp)
    }
    return(
        <form onSubmit={filterPerson}>
            <div>filter shown with <input value={newFilter} onChange={handleFilterChange}/></div>
            <div>
                <button type="submit">filter</button>
            </div>
        </form>
    )
}

export default Filter