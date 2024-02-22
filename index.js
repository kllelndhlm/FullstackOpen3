const express = require('express');
const app = express()
require('dotenv').config()
//const morgan = require('morgan');
const Person = require('./models/person')

let persons = [
]

app.use(express.static('dist'))

const cors = require('cors')

app.use(cors())

app.use(express.json())
console.log("Here!")

/*
morgan.token('postData', (req) => {
  if (req.method === 'POST') return ' ' + JSON.stringify(req.body);
  else return ' ';
});

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :postData'
  )
);


const dateTimeObject = new Date();

let persons = [
    { 
    "name": "Arto Hellas", 
    "number": "040-123456",
    "id": 1
    },
    { 
    "name": "Ada Lovelace", 
    "number": "39-44-5323523",
    "id": 2
    },
    { 
    "name": "Dan Abramov", 
    "number": "12-43-234345",
    "id": 3
    },
    { 
    "name": "Mary Popperndieck", 
    "number": "39-23-6423122",
    "id": 4
    }
]
*/

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})
console.log("Here!2")

  
app.delete('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then(person => {
    console.log(req.params.id)
    res.json(person)
  })
})

app.get('/info', (req, res) => {
    res.send('<p>Phonebook has info on '+persons.length+' people</p><p>'+dateTimeObject.toDateString()+' '+dateTimeObject.toTimeString()+'</p>')
})

app.post('/api/persons', (req, res) => {

  const body = req.body
  const firstNames = persons.map(person => person.name)

  if (!body.name) {
    return res.status(400).json({ 
      error: 'name missing' 
    })
  }

  if (!body.number) {
    return res.status(400).json({ 
      error: 'number missing' 
    })
  }

  if (firstNames.includes(body.name)) {
    return res.status(409).json({ 
      error: 'name must be unique'
    })
  }

  const person = new Person ({
    name: body.name,
    number: body.number,
    id: Math.random(10000),
  })

  persons = persons.concat(person)

  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})