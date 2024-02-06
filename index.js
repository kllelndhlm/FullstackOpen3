const express = require('express')
const app = express()

app.use(express.json())

const dateTimeObject = new Date();
console.log("A date-time object is created")

console.log(`Date: ${dateTimeObject.toDateString()}`);
console.log(`Time: ${dateTimeObject.toTimeString()}`);

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
    "name": "Mary Poppendieck", 
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

app.get('/info', (req, res) => {
    res.send('<p>Phonebook has info on '+persons.length+' people</p><p>'+dateTimeObject.toDateString()+' '+dateTimeObject.toTimeString()+'</p>')
    })

const PORT = 3001   
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
