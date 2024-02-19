require('dotenv').config()
const express = require('express');
const app = express()
const morgan = require('morgan');
const cors = require('cors')
const Number = require('./models/person')

app.use(cors())

app.use(express.json())

app.use(express.static('dist'))

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

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  

app.get('/api/persons', (req, res) => {
    res.json(persons)
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
  
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
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

  const person = {
    name: body.name,
    number: body.number,
    id: Math.random(10000),
  }

  persons = persons.concat(person)

  morgan.token('type', function (req, res) { return req.headers['content-type'] })


  res.json(persons)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})