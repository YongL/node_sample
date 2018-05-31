
const express = require('express');

const handlebar = require('hbs');
const fs = require('fs');
// create app
let app = express();

// express has understand the default views folder (for template date render)
//to render the template of handlebar // inject dynamic data
app.set('view engine', 'hbs');



// use express middleware to do something like log error, verfiy credential and so on.. basice intercept the flow..
// it take function, req, res, and next.. needt to call next() in the function to let the request go

app.use((req, res, next) => {
    var now = new Date().toString();
    console.log(now);     
    next();
    fs.appendFile('log.txt', 'data to append', function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
});

// we can use as many middle as we want
// here we intercept
// app.use((req, res, next) => {
//     // it will stop everything from executed
//     res.render('maintanence.hbs');
    
// });

//to use middleware // express.static take the absolute path; // .use to reguester middleware
app.use(express.static(__dirname + '/public'));

// get default route
app.get('/', (req, res) => {
    // send respond back
    res.send('Welcome !!!');
});


// get about // '/' foward slash is needed
app.get('/about', (req, res) => {
    // res.send('<h1>About</h1>')
    // with tempate render
    res.render('about.hbs', {
        pageTitle: 'test',
        currentYear: new Date().getFullYear()
    })
});


// /bad - send back json with errorMessage

app.get('/bad', (req, res) => {
    // by sending object, express know how to handle that as json
    res.send({
        status: '404',
        errorMessage: 'Bad request'
    });
})
// make it listen (make it running)
app.listen(3000, () => {
    console.log('server on port: localhost:3000')
});

//use a third party call handlebar.js, it is render template 