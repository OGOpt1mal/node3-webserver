const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express(); //express just returns a function, we can figure it after we call this

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

//Setup static directory for files to serve
app.use(express.static(publicDirectoryPath));

//get index from handlebars using render
app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather App',
        name : 'Shawn'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About',
        name : 'Shawn'
    });
})

app.get('/help', (req, res) => {
    res.render('help',{
        title : 'Help',
        message : 'This is the help page',
        name : 'Shawn'
    })
})

//first param is the route, such as test.com/about, empty would be the default such as test.com
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geoCode.geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error 
            })
        }
      
        forecast.forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })

        });
      });
})

//404 pages
app.get('/help/*', (req, res) => {
    res.render('404', {
        message : 'Help page not found'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        message : 'Page not found'
    });
});

//Start the server. First argument is the port to run on, second argument is a callback function when the server starts
app.listen(3000, () => {
    console.log('Server is listening on port 3000...')
})