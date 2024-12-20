const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')


let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-53523"
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122"
  }
]

morgan.token('body', (req, res) => { 
    return JSON.stringify(req.body)})


app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('dist'))
app.use(cors())
app.use(express.static('dist'))

app.get('/info', (request, response) => {
    response.send(`<p>Phone book has info for ${persons.length} people</p>
        <p>${Date()}</p>`)
})


app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if (person){
        response.json(person)
    }
    else {
        response.status(404).end()
    }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id) 
    response.status(204).end()
  })


  app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.number || !body.name) {
        return response.status(400).json({
            error: 'Missing name or number' 
        })
    }

    if ((persons.findIndex(person => person.name.toLowerCase() === body.name.toLowerCase())) > -1)
        return response.status(400).json({
            error: 'Name already in phonebook' 
        })

    const person = {
        id: getRandomInt(10000),
        name:  body.name,
        number: body.number
    }
    persons = persons.concat(person)
    response.json(persons)
  })

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
