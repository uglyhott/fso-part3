require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

morgan.token('body', (req) => req.method === 'POST' ? JSON.stringify(req.body) : null)

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

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

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/info', (req, res) => {
    const time = new Date()
    const text = `<p>Phonebook has info for ${persons.length} people</p><p>${time.toString()}</p>`
    res.send(text)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const foundPerson = persons.find(person => person.id === id)
    foundPerson ? res.json(foundPerson) : res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    let status = 400
    let json = { error: 'unknown error occurred' }
    const body = req.body
    if (!body || !body.name || !body.number) {
        json.error = 'content missing'
    } else if (persons.find(person => person.name === body.name)) {
        json.error = 'name must be unique'
    } else {
        status = 200
        json = {
            id: Math.floor(Math.random() * 10000000),
            name: body.name,
            number: body.number,
        }

        persons = persons.concat(json)
    }

    res.status(status).send(json)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
})