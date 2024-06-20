const express = require('express')
const app = express()

const persons = [
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
    res.json(persons)
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

const PORT = 3001
app.listen(PORT)
console.log(`Server running at http://localhost:${PORT}`)