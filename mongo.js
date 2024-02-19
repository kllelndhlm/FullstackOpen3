const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number 
  }, { collection: 'persons' });

const Person = mongoose.model('Person', personSchema)

if (process.argv.length!==5) {
    Person.find({}).then(result => {
        result.forEach(note => {
          console.log(note)
        })
        console.log(result.length)
        mongoose.connection.close()
  })
}

const password = process.argv[2]

const url =
  `mongodb+srv://lindholmkalle:${password}@fullstack3backend.dlkx2hw.mongodb.net/personApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)


if (process.argv.length===5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
        id: 10000
    })

    person.save().then(result => {
        console.log(`Added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
    })
}