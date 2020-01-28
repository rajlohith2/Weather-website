const express = require('express')
const path = require('path')
const exphbs = require( 'express-handlebars');

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//setup handlebars engine and views location
app.engine('.hbs', exphbs({defaultLayout: 'layout', extname: '.hbs'}))
app.set('view engine', '.hbs')

app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
    res.render('index', {
        text: 'Home Page',
    })
})

app.get('/weather', (req, res) => {
    let units = 'us'

    const { address, newUnits } = req.query

    if(!address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    if(newUnits) units = newUnits

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if(error) return res.send({error})

        forecast(latitude, longitude, units, (error, forecaseData) => {
            if(error) return res.send({error})

            res.send({
                forecast: forecaseData,
                location: location,
                address: address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    } 

    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        text: 'About Page',
        name: 'Lohith Raj'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        text: 'Help Page'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        text: '404 Page not found.',
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})