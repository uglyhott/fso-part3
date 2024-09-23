const mongoose = require('mongoose')

// process argv
// if argv less than 3, print error message
if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2];

const url =
    `mongodb+srv://fullstack:${password}@cluster0.qdnu5np.mongodb.net/phonebookApp?retryWrites=true&w=majority`

// connect to the database
mongoose.set('strictQuery', false)
mongoose.connect(url)

// define the schema
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

// define the model
const Person = mongoose.model('Person', personSchema)

// if argv length is 5, save the person to the database
if (process.argv.length === 5) {
    const person = new Person({
        name: process.argv[3].replace('"', ""),
        number: process.argv[4]
    })

    person.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    })
}

// if argv length is 3, print all the people in the database
if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}
