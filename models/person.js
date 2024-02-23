const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(res => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
  }, 
  { collection: 'persons' }
)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    document.id = document._id.toString()
    delete document._id
    delete document.__v
  }
})

module.exports = mongoose.model('Person', personSchema)