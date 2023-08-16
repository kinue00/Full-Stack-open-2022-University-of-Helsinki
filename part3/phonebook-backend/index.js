require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
// app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-request'))

morgan.token('post-request', (req) => {
  return JSON.stringify(req.body)
})

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
      response.json(persons)
  })
})

app.get('/info', (request, response) => {
    const d = new Date()
    const maxP = persons.length
    response.send(`
        <p>Phonebook has info for ${maxP} people</p> 
        <p>${d}</p>
        `)
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
      .then(person => {
          if (person) {
              response.json(person)
          } else {
              response.status(404).end()
          }
      })
      .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
      .then(result => {
          response.status(204).end()
      })
      .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    // console.log(body)
    if (!body.name||!body.number) {
      return response.status(400).json({ 
        error: 'name or number missing' 
      })
    }
    // console.log(body.name)
    // console.log(persons.find(person => person.name === body.name))
    if(persons.find(person => person.name === body.name)){
        return response.status(400).json({ 
            error: 'name must be unique' 
        })
    }
    // console.log(persons.find(person.name === 'Joe Joe'))
    // if(persons.find(person.name == body.name)){
    //     return response.status(400).json({ 
    //         error: 'name must be unique' 
    //     })
    // }
    // function getRandomInt(max) {
    //     return Math.floor(Math.random() * max);
    // }
    const person = new Person({
      name: body.name,
      number: body.number
  })
  
    // persons = persons.concat(person)
  
    // response.json(person)
    person.save().then(savedPerson => {
      response.json(savedPerson)
  })
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(
      request.params.id,
      {name, number},
      { new: true, runValidators: true, context: 'query' }
  )
      .then(updatedPerson => {
          response.json(updatedPerson)
      })
      .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

